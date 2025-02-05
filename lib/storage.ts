import { supabase } from './supabaseClient';

/**
 * Uploads a file to the 'uploads' bucket in Supabase Storage.
 * @param file - The file or Blob to upload.
 * @param filePath - The desired storage path (including filename) within the 'uploads' bucket.
 * @returns The public URL of the uploaded file.
 */
export async function uploadAttachment(file: File | Blob, filePath: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(filePath, file, { upsert: true });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data: urlData } = supabase.storage
    .from('uploads')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

/**
 * Downloads a file from the 'uploads' bucket in Supabase Storage.
 * @param filePath - The storage path (including filename) of the file.
 * @returns A Blob of the downloaded file.
 */
export async function downloadAttachment(filePath: string): Promise<Blob> {
  const { data, error } = await supabase.storage
    .from('uploads')
    .download(filePath);

  if (error || !data) {
    throw new Error(`Download failed: ${error?.message || 'No data received'}`);
  }

  return data;
}

/**
 * Retrieves the public URL for an already uploaded attachment.
 * @param filePath - The storage path (including filename) of the file.
 * @returns The public URL as a string.
 */
export function getAttachmentUrl(filePath: string): string {
  const { data } = supabase.storage
    .from('uploads')
    .getPublicUrl(filePath);

  return data.publicUrl;
} 