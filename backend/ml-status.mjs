import doInPython from "./ml-utility.mjs";

const getServers = async () => {
  return await doInPython(async (python) => {
    await python.ex`import openstack`;

    await python.ex`
        def list_servers():
            ost_conn = openstack.connect()
            js_servers = []
            for ost_server in ost_conn.compute.servers():
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
                js_servers.append(js_server)
            return js_servers
        `;

    const servers = (await python`list_servers()`).reduce((serv, propslist) => {
      const propsobj = propslist.reduce((props, [key, value]) => {
        props[key] = value;
        return props;
      }, {});
      serv[propsobj.name] = propsobj;
      return serv;
    }, {});

    return servers;
  });
};

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

    const propslist = await python`find_server(${String(serverNameOrId)})`;
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
  // const servers = await getServers()
  // console.log(JSON.stringify(servers))

  const server = await getServer("Tina");
  console.log(JSON.stringify(server));
};

void main();
