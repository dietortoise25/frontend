const isDevMode: boolean = import.meta.env.VITE_DEV_MODE === "true";

const API_URL: string | undefined = isDevMode
  ? import.meta.env.VITE_APP_BASE_API_DEV
  : import.meta.env.VITE_APP_BASE_API_PROD;

const environment = { isDevMode, API_URL: API_URL || "" };
export default environment;
