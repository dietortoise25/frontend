/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_KEY: string;
  readonly VITE_DEV_MODE?: string;
  readonly VITE_APP_BASE_API_DEV?: string;
  readonly VITE_APP_BASE_API_PROD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}