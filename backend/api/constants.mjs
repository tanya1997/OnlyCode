import path from "path";
import url from "url";

const getEnv = (name) => {
  const value = process.env[name];
  if (value === "" || value == null) {
    console.error(process.env);
    console.error(`Please create .env (see .env.example) or set env "${name}"`);
    process.exit(1);
  }
  return value;
};

export const ML_SERVER_PORT = getEnv("ML_SERVER_PORT");
export const ML_SERVER_HOST = getEnv("ML_SERVER_HOST");
export const ML_SERVER_PROTOCOL = getEnv("ML_SERVER_PROTOCOL");

export const ML_BASE_URL = `${ML_SERVER_PROTOCOL}://${ML_SERVER_HOST}:${ML_SERVER_PORT}`;

export const PORT = getEnv("PORT");
export const HOST = getEnv("HOST");

export const rootDir = path.join(
  path.dirname(url.fileURLToPath(import.meta.url)),
  "..",
);
export const reactScriptsBuildDir = path.join(rootDir, "build");
