const isDevMode = import.meta.env.VITE_DEV_MODE === "true";

const API_URL = isDevMode
  ? import.meta.env.VITE_APP_BASE_API_DEV
  : import.meta.env.VITE_APP_BASE_API_PROD;

const environment = { isDevMode, API_URL };
export default environment;
