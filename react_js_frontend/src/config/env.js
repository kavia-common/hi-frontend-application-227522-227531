/**
 * Centralized environment/config reader for the UI.
 * CRA exposes env vars prefixed with REACT_APP_ at build/runtime.
 */

// PUBLIC_INTERFACE
export function getRuntimeEnv() {
  const read = (key) => {
    const value = process.env[key];
    if (typeof value !== "string") return "";
    return value.trim();
  };

  return {
    REACT_APP_API_BASE: read("REACT_APP_API_BASE"),
    REACT_APP_BACKEND_URL: read("REACT_APP_BACKEND_URL"),
    REACT_APP_FRONTEND_URL: read("REACT_APP_FRONTEND_URL"),
    REACT_APP_WS_URL: read("REACT_APP_WS_URL"),
    REACT_APP_NODE_ENV: read("REACT_APP_NODE_ENV"),
  };
}
