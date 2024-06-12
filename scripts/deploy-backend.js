const { deployServer: deployBackend } = require("./helpers/deploy-server");

module.exports = (async () => {
  await deployBackend();

  process.exit(0);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
