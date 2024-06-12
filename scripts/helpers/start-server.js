const { openSSHConnection } = require("./open-ssh-connection");
const { sshUsername, sshHost } = require("./env");

const startServer = async () => {
  const ssh = await openSSHConnection();

  console.log("Launch PM2 Backend App [STARTED]");

  const cmd = [
    `HOST='${sshHost}'`,
    `PORT='3000'`,
    `ML_SERVER_PORT='${process.env.ML_SERVER_PORT}'`,
    `ML_SERVER_HOST='${process.env.ML_SERVER_HOST}'`,
    `ML_SERVER_PROTOCOL='${process.env.ML_SERVER_PROTOCOL}'`,
    `ML_SERVER_PASSWORD='${process.env.ML_SERVER_PASSWORD}'`,
    `pm2 start api/index.mjs --name "OnlyCode:backend"`,
  ].join(" ");

  const { stderr, stdout } = await ssh.execCommand(cmd, {
    cwd: `/${sshUsername}/OnlyCode/backend`,
    // execOptions: {
    //   env: {
    //     HOST: "0.0.0.0",
    //     PORT: "3000",
    //     ML_SERVER_PORT: process.env.ML_SERVER_PORT,
    //     ML_SERVER_HOST: process.env.ML_SERVER_HOST,
    //     ML_SERVER_PROTOCOL: process.env.ML_SERVER_PROTOCOL,
    //     ML_SERVER_PASSWORD: process.env.ML_SERVER_PASSWORD,
    //   },
    // },
  });

  console.log(cmd);
  console.log(stdout);
  if (stderr) {
    console.error(stderr);
    process.exit(1);
  }

  console.log("Launch PM2 Backend App [FINISHED]");
};

module.exports = { startServer };
