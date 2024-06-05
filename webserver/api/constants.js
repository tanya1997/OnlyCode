const getEnv = (name) => {
    const value = process.env[name];
    if (value === "" || value == null) {
        throw new Error(
            `Please create .env (see .env.example) or set env "${name}"`,
        );
    }
    return value;
};

export const ML_SERVER_PORT = getEnv("ML_SERVER_PORT");
export const ML_SERVER_HOST = getEnv("ML_SERVER_HOST");
export const ML_SERVER_PROTOCOL = getEnv("ML_SERVER_PROTOCOL");

export const ML_BASE_URL = `${ML_SERVER_PROTOCOL}://${ML_SERVER_HOST}:${ML_SERVER_PORT}`;

export const PORT = getEnv("PORT");
export const HOST = getEnv("HOST");
