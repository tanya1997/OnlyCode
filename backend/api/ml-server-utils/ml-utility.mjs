import pythonBridge from "python-bridge";

// Export password into environment variable SELCLOUD_PASSWORD to run script correctly

process.env.OS_AUTH_URL = "https://cloud.api.selcloud.ru/identity/v3";
process.env.OS_IDENTITY_API_VERSION = "3";
process.env.OS_VOLUME_API_VERSION = "3";
process.env.CLIFF_FIT_WIDTH = 1;
process.env.OS_PROJECT_DOMAIN_NAME = "323699";
process.env.OS_PROJECT_ID = "a952f3494fe94ed2b1c13f74ae7d2ed2";
process.env.OS_TENANT_ID = "a952f3494fe94ed2b1c13f74ae7d2ed2";
process.env.OS_REGION_NAME = "ru-7";
process.env.OS_USER_DOMAIN_NAME = "323699";
process.env.OS_USERNAME = "Danielle";
if (process.env.OS_PASSWORD == null) {
  process.env.OS_PASSWORD = process.env.SELCLOUD_PASSWORD;
}

const doInPython = async (func) => {
  let python = null;
  try {
    python = await pythonBridge({ python: "python3" });
    const result = await func(python);
    await python.end();
    python = null;
    return result;
  } catch (error) {
    console.error(error.stack);
  } finally {
    try {
      if (python != null) {
        await python.end();
      }
    } catch (error) {
      console.error(error.stack);
    }
  }
};

export default doInPython;
