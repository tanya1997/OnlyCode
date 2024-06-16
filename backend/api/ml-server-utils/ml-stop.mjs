import fetch from "node-fetch";

import { getMLStatus } from "./ml-status.mjs";

export const stopMLServer = async () => {
  const { serverId, token } = await getMLStatus();

  await fetch(
    `https://ru-7.cloud.api.selcloud.ru/compute/v2.1/servers/${serverId}/action`,
    {
      method: "POST",
      body: JSON.stringify({ shelve: null }),
      headers: {
        "X-Auth-Token": token,
        "Content-Type": "application/json",
      },
    },
  );
};
