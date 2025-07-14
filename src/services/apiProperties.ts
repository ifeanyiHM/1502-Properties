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

export async function addProperties(newProperty: propertySummaryProps) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("pending_properties")
    .insert([{ ...newProperty, agentid: user?.id }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Properties could not be created");
  }

  return data;
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
      const filePath = `${folder}/${file.name}-${Math.random()}`;

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

export async function deleteProperties(id: number) {
  const { error } = await supabase.from("properties").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Properties could not be deleted");
  }
}
