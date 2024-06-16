const { openSSHConnection } = require("./open-ssh-connection.js");
const { sshUsername } = require("./env.js");

const stopClient = async () => {
  const ssh = await openSSHConnection();

  console.log("Stop PM2 Frontend App [STARTED]");

  const { stderr, stdout } = await ssh.execCommand(
    `pm2 delete "OnlyCode:frontend" || echo ''`,
    {
      cwd: `/${sshUsername}/OnlyCode/frontend`,
    },
  );

  console.log(stdout);
  if (stderr) {
    console.error(stderr);
  }

  console.log("Stop PM2 Frontend App [FINISHED]");
};

module.exports = { stopClient };
