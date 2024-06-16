const { openSSHConnection } = require("./open-ssh-connection.js");
const { sshUsername } = require("./env.js");

const stopServer = async () => {
  const ssh = await openSSHConnection();

  console.log("Stop PM2 Backend App [STARTED]");

  const { stderr, stdout } = await ssh.execCommand(
    `pm2 delete "OnlyCode:backend" || echo ''`,
    {
      cwd: `/${sshUsername}/OnlyCode/backend`,
    },
  );

  console.log(stdout);
  if (stderr) {
    console.error(stderr);
  }

  console.log("Stop PM2 Backend App [FINISHED]");
};

module.exports = { stopPM2App: stopServer };
