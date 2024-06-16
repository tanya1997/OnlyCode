const { NodeSSH } = require("node-ssh");
const { sshUsername, sshPassword, sshHost } = require("./env");

let ssh = null;
const openSSHConnection = async () => {
  if (ssh != null) {
    return ssh;
  }

  ssh = new NodeSSH();

  await ssh.connect({
    tryKeyboard: true,
    port: 22,
    host: sshHost,
    username: sshUsername,
    password: sshPassword,
  });

  console.log("SSH Connected");

  return ssh;
};

module.exports = { openSSHConnection };
