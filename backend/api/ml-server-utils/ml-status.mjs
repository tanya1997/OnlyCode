import fetch from "node-fetch";
import pkgcloud from "pkgcloud";
import { promisify } from "util";

import doInPython from "./ml-utility.mjs";

const getServer = async (serverNameOrId) => {
  return await doInPython(async (python) => {
    await python.ex`import openstack`;

    await python.ex`
        def find_server(serv_id):
            ost_conn = openstack.connect()
            ost_server = ost_conn.compute.find_server(serv_id)
            js_server = None
            if ost_server != None:
                js_server = []
                js_server.append(["id", ost_server["id"]])
                js_server.append(["name", ost_server["name"]])
                js_server.append(["status", ost_server["status"]])
                js_server.append(["OS-SRV-USG:launched_at", ost_server["OS-SRV-USG:launched_at"]])
                js_server.append(["OS-SRV-USG:terminated_at", ost_server["OS-SRV-USG:terminated_at"]])
                js_server.append(["OS-EXT-STS:task_state", ost_server["OS-EXT-STS:task_state"]])
                js_server.append(["OS-EXT-STS:vm_state", ost_server["OS-EXT-STS:vm_state"]])
                js_server.append(["OS-EXT-STS:power_state", ost_server["OS-EXT-STS:power_state"]])
                js_server.append(["OS-EXT-SRV-ATTR:hostname", ost_server["OS-EXT-SRV-ATTR:hostname"]])
            return js_server
        `;

    const propslist = await python`find_server(${String("Tina")})`;
    const server =
      propslist != null
        ? propslist.reduce((props, [key, value]) => {
            props[key] = value;
            return props;
          }, {})
        : null;

    return server;
  });
};

const main = async () => {
  // const {token:{audit_ids:[auditId]}} = await (
  //   await fetch("https://cloud.api.selcloud.ru/identity/v3/auth/tokens", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       auth: {
  //         identity: {
  //           methods: ["password"],
  //           password: {
  //             user: {
  //               name: "Danielle",
  //               password: process.env.SELCLOUD_PASSWORD,
  //               domain: {
  //                 id: "f6b431d35c3c43b79e3a8362e6928a32",
  //                 name: "323699",
  //               },
  //             },
  //           },
  //         },
  //       },
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  // ).json();
  //
  // console.log(auditId);

  console.log(
      await (await fetch('https://cloud.api.selcloud.ru/v3/domains', {
        method: 'GET',
        headers: {
            'X-Auth-Token': process.env.SELCLOUD_PASSWORD
        }
    })).text()
  )

  //
  // process.env.OS_AUTH_URL = "https://cloud.api.selcloud.ru/identity/v3";
  // process.env.OS_IDENTITY_API_VERSION = "3";
  // process.env.OS_VOLUME_API_VERSION = "3";
  // process.env.CLIFF_FIT_WIDTH = 1;
  // process.env.OS_PROJECT_DOMAIN_NAME = "323699";
  // process.env.OS_PROJECT_ID = "a952f3494fe94ed2b1c13f74ae7d2ed2";
  // process.env.OS_TENANT_ID = "a952f3494fe94ed2b1c13f74ae7d2ed2";
  // process.env.OS_REGION_NAME = "ru-7";
  // process.env.OS_USER_DOMAIN_NAME = "323699";
  // process.env.OS_USERNAME = "Danielle";

  // console.log(JSON.stringify(await getServer()));
};

void main();
