const { deployClient } = require('./helpers/deploy-client');

module.exports = (async () => {
  await deployClient();

  process.exit(0);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
