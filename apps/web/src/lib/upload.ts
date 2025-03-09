import { createClient } from "@supabase/supabase-js";

export const uploadThumbnail = async (file: File) => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_API_KEY!
  );

  // Sanitize filename: remove spaces and special characters, add timestamp for uniqueness
  const fileExtension = file.name.split(".").pop();
  const sanitizedFileName = `${Date.now()}_${file.name
    .replace(/[^a-zA-Z0-9]/g, "_")
    .substring(0, 50)}.${fileExtension}`;
  const { data, error } = await supabase.storage
    .from("thumbnail")
    .upload(sanitizedFileName, file);

  if (error) {
    console.error("Upload error:", error);
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("thumbnail").getPublicUrl(data.path);

  return publicUrl;
};
