const { openSSHConnection } = require('./open-ssh-connection.js');
const { sshUsername } = require('./env.js');

const stopServer = async () => {
  const ssh = await openSSHConnection();

  console.log('Stop PM2 App [STARTED]');

  const { stderr, stdout } = await ssh.execCommand(
    `pm2 delete "TicTacToePlus:server" || echo ''`,
    {
      cwd: `/${sshUsername}/TicTacToePlus/server`,
    },
  );

  console.log(stdout);
  if (stderr) {
    console.error(stderr);
    process.exit(1);
  }

  console.log('Stop PM2 App [FINISHED]');
};

module.exports = { stopPM2App: stopServer };
