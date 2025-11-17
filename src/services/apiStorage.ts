import { supabase } from "@/utils/supabaseClient";
import type { SupabaseUploadResponse } from "@/types/api";

export default async function uploadImageToSupabase(
  imageFile: File,
  fileName: string
): Promise<string | null> {
  const { data, error }: SupabaseUploadResponse = await supabase.storage
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
  return data?.fullPath || null;
}
