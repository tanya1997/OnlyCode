const { openSSHConnection } = require('./open-ssh-connection');
const {
  sshUsername,
  tgToken,
  tgAppDirectLink,
  sslKey,
  sslCert,
  sslCa,
  host,
  port,
} = require('./env');

const startServer = async () => {
  const ssh = await openSSHConnection();

  console.log('Launch PM2 App [STARTED]');

  const cmd = [
    `HOST='${host}'`,
    `PORT='${port}'`,
    `TG_KEY='${tgToken}'`,
    `TG_APP_DIRECT_LINK='${tgAppDirectLink}'`,
    `SSL_KEY_BASE64='${sslKey}'`,
    `SSL_CERT_BASE64='${sslCert}'`,
    `SSL_CA_BASE64='${sslCa}'`,
    `PUBLIC_DIR='/${sshUsername}/TicTacToePlus/client'`,
    `pm2 start index.js --name "TicTacToePlus:server"`,
  ].join(' ');

  const { stderr, stdout } = await ssh.execCommand(cmd, {
    cwd: `/${sshUsername}/TicTacToePlus/server`,
  });

  console.log(cmd);
  console.log(stdout);
  if (stderr) {
    console.error(stderr);
    process.exit(1);
  }

  console.log('Launch PM2 App [FINISHED]');
};

module.exports = { startServer };
