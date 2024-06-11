const { deployServer } = require('./helpers/deploy-server');

module.exports = (async () => {
  await deployServer();

  process.exit(0);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
