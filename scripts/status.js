const { showLogs } = require("./helpers/show-logs-server");
const { statusServer } = require("./helpers/status-server");

void (async () => {
  await statusServer();

  await showLogs();

  process.exit(0);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
