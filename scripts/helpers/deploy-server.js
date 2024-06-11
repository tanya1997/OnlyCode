const { copyServer } = require('./copy-server');
const { serverNPMInstall } = require('./server-npm-install');
const { stopPM2App } = require('./stop-server');
const { clearLogsServer } = require('./clear-logs-server');
const { startServer } = require('./start-server');
const { statusServer } = require('./status-server');
const { showLogs } = require('./show-logs-server');

const deployServer = async () => {
  await copyServer();

  await serverNPMInstall();

  await stopPM2App();

  await clearLogsServer();

  await startServer();

  await statusServer();

  await showLogs();
};

module.exports = { deployServer };
