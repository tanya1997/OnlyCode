const { openSSHConnection } = require('./open-ssh-connection');
const { sshUsername } = require('./env');

const showLogsServer = async () => {
  const ssh = await openSSHConnection();

  console.log('Logs PM2 App');

  const { stderr, stdout } = await ssh.execCommand(
    `pm2 logs TicTacToePlus:server --nostream --log-date-format "YYYY-MM-DD HH:mm Z"`,
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

module.exports = { showLogs: showLogsServer };
