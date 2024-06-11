const path = require('path');
const { openSSHConnection } = require('./open-ssh-connection');
const { sshUsername, serverDir } = require('./env');

const copyServer = async () => {
  const ssh = await openSSHConnection();

  const copyFilesFailed = [];

  console.log(
    `Copy "server/dist" to "/${sshUsername}/OnlyCode/server" [STARTED]`,
  );

  await ssh.putDirectory(
    path.join(serverDir, 'dist'),
    `/${sshUsername}/TicTacToePlus/server`,
    {
      recursive: true,
      concurrency: 1,
      tick: function (localPath, remotePath, error) {
        if (error) {
          copyFilesFailed.push(localPath);
        }
      },
    },
  );

  await ssh.putFile(
    path.join(serverDir, 'package.json'),
    `/${sshUsername}/TicTacToePlus/server/package.json`,
  );

  if (copyFilesFailed.length > 0) {
    throw new Error(`Failed transfers: ${copyFilesFailed.join(', ')}`);
  }

  console.log(
    `Copy "server/dist" to "/${sshUsername}/TicTacToePlus/server" [FINISHED]`,
  );
};

module.exports = { copyServer };
