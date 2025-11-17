export function getPublicImageUrl(path: string): string {
  return `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/${path}`;
}
