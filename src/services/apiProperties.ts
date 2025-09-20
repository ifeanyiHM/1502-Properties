import { propertySummaryProps } from "../Data/propertyData";
import supabase from "./supabase";

export async function getProperties() {
  const { data, error } = await supabase.from("properties").select("*");

  if (error) {
    console.error(error);
    throw new Error("Properties could not be loaded");
  }

  return data;
}

// export async function addProperties(
//   newProperty: propertySummaryProps,
//   id?: string
// ) {
//   const {
//     data: { user },
//     error: authError,
//   } = await supabase.auth.getUser();

//   if (authError || !user) {
//     throw new Error("User not authenticated");
//   }

//   const agentid = user.id;
//   const agentEmail = user.email;
//   const agentName = user.user_metadata?.fullName || "Unknown";

//   let query = supabase.from("pending_properties");

//   if (!id)
//     query = query.insert([{ ...newProperty, agentid, agentEmail, agentName }]);

//   if (id)
//     query = query
//       .update({ ...newProperty, agentid, agentEmail, agentName })
//       .eq("id", id);

//   const { data, error } = await query.select().single();

//   if (error) {
//     console.error(error);
//     throw new Error("Properties could not be created");
//   }

//   return data;
// }
export async function addProperties(
  newProperty: propertySummaryProps,
  id?: string
) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User not authenticated");
  }

  const agentid = user.id;
  const agentEmail = user.email;
  const agentName = user.user_metadata?.fullName || "Unknown";

  if (!id) {
    // CREATE
    const { data, error } = await supabase
      .from("pending_properties")
      .insert([{ ...newProperty, agentid, agentEmail, agentName }])
      .select()
      .single();

    if (error) throw new Error("Properties could not be created");
    return data;
  } else {
    // UPDATE
    const { data, error } = await supabase
      .from("pending_properties")
      .update({ ...newProperty, agentid, agentEmail, agentName })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`Properties could not be edited ${id}`);
    if (!data) throw new Error(`No property found with id ${id}`);
    return data;
  }
}

export const uploadFilesToStorage = async (
  files: FileList,
  baseFolder = "uploads"
): Promise<string[]> => {
  if (!files || files.length === 0) return [];

  const useSubfolder = files.length > 1;
  const folder = useSubfolder ? `${baseFolder}/${Date.now()}` : baseFolder;

  const uploads = await Promise.all(
    Array.from(files).map(async (file) => {
      const filePath = `${folder}/${Math.random()}-${file.name}`;

      const { error } = await supabase.storage
        .from("properties")
        .upload(filePath, file);

      if (error)
        throw new Error(
          `Property Images could not be uploaded: ${error.message}`
        );

      const { data } = supabase.storage
        .from("properties")
        .getPublicUrl(filePath);

      return data.publicUrl;
    })
  );

  return uploads;
};

// export async function deleteProperties(id: number) {
//   const { error } = await supabase.from("properties").delete().eq("id", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Properties could not be deleted");
//   }
// }

export async function deleteProperties(id: number) {
  // 1. Fetch property to get image URLs
  const { data, error: fetchError } = await supabase
    .from("properties")
    .select("src")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Error fetching property:", fetchError);
    throw new Error("Failed to fetch property data");
  }

  // 2. Extract image paths from URLs
  const imagePaths =
    data?.src?.map((url: string) =>
      decodeURIComponent(url.split("/storage/v1/object/public/properties/")[1])
    ) || [];

  // 3. Delete images from storage if any exist
  if (imagePaths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("properties")
      .remove(imagePaths);

    if (storageError) {
      console.error("Failed to delete images from storage:", storageError);
      throw new Error("Property images could not be deleted");
    }
  }

  // 4. Delete property from the table
  const { error } = await supabase.from("properties").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete property:", error);
    throw new Error("Property could not be deleted");
  }
}
