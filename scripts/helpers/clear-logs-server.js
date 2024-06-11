const { openSSHConnection } = require('./open-ssh-connection');
const { sshUsername } = require('./env');

const clearLogsServer = async () => {
  const ssh = await openSSHConnection();

  console.log('Clear logs PM2 App');

  const { stderr, stdout } = await ssh.execCommand(
    `pm2 flush "TicTacToePlus:server"`,
    {
      cwd: `/${sshUsername}/TicTacToePlus/server`,
    },
  );

  console.log(stdout);
  if (stderr) {
    console.error(stderr);
    process.exit(1);
  }
};

module.exports = { clearLogsServer: clearLogsServer };
