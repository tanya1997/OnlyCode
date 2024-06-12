const path = require("path");
const dotenv = require("dotenv");

const rootDir = path.join(__dirname, "..", "..");
const serverDir = path.join(rootDir, "backend");
const clientDir = path.join(rootDir, "frontend");

dotenv.config({
  path: path.join(rootDir, ".prod.env"),
});

const sshHost = process.env.SSH_HOST;
if (!sshHost) {
  throw new Error('Env "SSH_HOST" is required');
}

const sshUsername = process.env.SSH_USERNAME;
if (!sshUsername) {
  throw new Error('Env "SSH_USERNAME" is required');
}

const sshPassword = process.env.SSH_PASSWORD;
if (!sshPassword) {
  throw new Error('Env "SSH_PASSWORD" is required');
}

module.exports = {
  sshUsername,
  sshPassword,
  sshHost,
  rootDir,
  serverDir,
  clientDir,
};
