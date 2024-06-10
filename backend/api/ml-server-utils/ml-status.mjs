import fetch from "node-fetch";

export const getMLStatus = async () => {
  const response = await fetch(
    "https://cloud.api.selcloud.ru/identity/v3/auth/tokens",
    {
      method: "POST",
      body: JSON.stringify({
        auth: {
          identity: {
            methods: ["password"],
            password: {
              user: {
                password: process.env.ML_SERVER_PASSWORD,
                name: "Danielle",
                domain: { name: "323699" },
              },
            },
          },
          scope: { project: { id: "a952f3494fe94ed2b1c13f74ae7d2ed2" } },
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const token = response.headers.get("x-subject-token");

  const {
    servers: [{ id: serverId, status }],
  } = await (
    await fetch(
      "https://ru-7.cloud.api.selcloud.ru/compute/v2.1/servers/detail?name=Tina",
      {
        method: "GET",
        headers: {
          "X-Auth-Token": token,
        },
      },
    )
  ).json();

  return { serverId, status, token };
};
