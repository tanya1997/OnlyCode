const path = require("path");
const { openSSHConnection } = require("./open-ssh-connection");
const { sshUsername, serverDir } = require("./env");

const copyServer = async () => {
  const ssh = await openSSHConnection();

  const copyFilesFailed = [];

  console.log(`Copy "backend" to "/${sshUsername}/OnlyCode/backend" [STARTED]`);

  await ssh.putDirectory(
    path.join(serverDir),
    `/${sshUsername}/OnlyCode/backend`,
    {
      recursive: true,
      concurrency: 1,
      validate: function (itemPath) {
        const baseName = path.basename(itemPath);
        return baseName.substr(0, 1) !== "." && baseName !== "node_modules";
      },
      tick: function (localPath, remotePath, error) {
        if (error) {
          copyFilesFailed.push(localPath);
        }
      },
    },
  );

  if (copyFilesFailed.length > 0) {
    throw new Error(`Failed transfers: ${copyFilesFailed.join(", ")}`);
  }

  console.log(
    `Copy "backend" to "/${sshUsername}/OnlyCode/backend" [FINISHED]`,
  );
};

module.exports = { copyServer };
