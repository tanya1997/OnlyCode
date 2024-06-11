const { openSSHConnection } = require('./open-ssh-connection');
const {
  sshUsername,
  host,
  port,
} = require('./env');

const startClient = async () => {
  const ssh = await openSSHConnection();

  console.log('Launch PM2 Frontend App [STARTED]');

  const cmd = [
    `pm2 start "http-server -p 80 -o \"/${sshUsername}/OnlyCode/frontend\"" --name "OnlyCode:frontend"`,
  ].join(' ');

  const { stderr, stdout } = await ssh.execCommand(cmd, {
    cwd: `/${sshUsername}/OnlyCode/frontend`,
  });

  console.log(cmd);
  console.log(stdout);
  if (stderr) {
    console.error(stderr);
    process.exit(1);
  }

  console.log('Launch PM2 Frontend App [FINISHED]');
};

module.exports = { startClient };
