import { supabase } from "@/utils/supabaseClient";

export default async function uploadImageToSupabase(imageFile, fileName) {
  const { data, error } = await supabase.storage
    .from("product-pic")
    .upload(fileName, imageFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image:", error.message);
    return null;
  }
  console.log("Image uploaded successfully:", data);
  return data.fullPath;
}
