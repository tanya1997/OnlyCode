const { copyClient } = require('./copy-client');
const { stopClient } = require('./stop-client');
const { startClient } = require('./start-client');

const deployClient = async () => {
  await copyClient();
  await stopClient();
  await startClient();
};

module.exports = { deployClient };
