import doInPython from "./ml-utility.mjs";

const stopServer = async (serverNameOrId) => {
  return await doInPython(async (python) => {
    await python.ex`import openstack`;

    await python.ex`
        def stop_server(serv_id):
            ost_conn = openstack.connect()
            ost_server = ost_conn.compute.find_server(serv_id)
            if ost_server != None:
                ost_conn.compute.shelve_server(ost_server)
                return True
            else:
                return False
        `;

    let result = false;
    try {
      result = await python`stop_server(${String(serverNameOrId)})`;
    } catch (error) {
      if (
        error.message != null &&
        error.message.constructor === String &&
        error.message.indexOf("openstack.exceptions.ConflictException") > -1
      ) {
        // Server already stopped
        result = true;
      } else {
        throw error;
      }
    }

    return result;
  });
};

const main = async () => {
  console.log(await stopServer("Tina"));
};

void main();
