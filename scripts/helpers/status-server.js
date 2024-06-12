const { openSSHConnection } = require("./open-ssh-connection");
const { sshUsername } = require("./env");

const statusServer = async () => {
  const ssh = await openSSHConnection();

  console.log("Status PM2 Backend App");

  const { stderr, stdout } = await ssh.execCommand(`pm2 ls`, {
    cwd: `/${sshUsername}/OnlyCode/backend`,
  });

  console.log(stdout);
  if (stderr) {
    console.error(stderr);
    process.exit(1);
  }
};

module.exports = { statusServer };
