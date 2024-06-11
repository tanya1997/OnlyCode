const path = require('path');
const { openSSHConnection } = require('./open-ssh-connection');
const { clientDir, sshUsername } = require('./env');

const copyClient = async () => {
  const ssh = await openSSHConnection();

  const copyFilesFailed = [];

  console.log(
    `Copy "frontend/build" to "/${sshUsername}/OnlyCode/frontend" [STARTED]`,
  );

  await ssh.putDirectory(
    path.join(clientDir, 'build'),
    `/${sshUsername}/OnlyCode/frontend`,
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

  if (copyFilesFailed.length > 0) {
    throw new Error(`Failed transfers: ${copyFilesFailed.join(', ')}`);
  }

  console.log(
    `Copy "frontend/build" to "/${sshUsername}/OnlyCode/frontend" [FINISHED]`,
  );
};

module.exports = { copyClient };
