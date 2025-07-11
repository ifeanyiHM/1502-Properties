import supabase from "./supabase";

export async function getProperties() {
  const { data, error } = await supabase.from("properties").select("*");

  if (error) {
    console.error(error);
    throw new Error("Properties could not be loaded");
  }

  return data;
}
