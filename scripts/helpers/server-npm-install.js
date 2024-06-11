const { openSSHConnection } = require('./open-ssh-connection');
const { sshUsername } = require('./env');

const serverNPMInstall = async () => {
  const ssh = await openSSHConnection();

  console.log('npm install [STARTED]');

  const { stderr, stdout } = await ssh.execCommand(`npm install`, {
    cwd: `/${sshUsername}/TicTacToePlus/server`,
  });

  console.log(stdout);
  if (stderr) {
    console.error(stderr);
  }

  console.log('npm install [FINISHED]');
};

module.exports = { serverNPMInstall };
