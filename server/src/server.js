const http = require("http");
const app = require("./app");

require("dotenv").config();

const { connectMongo } = require("./services/mongo");
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await connectMongo();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();

module.exports = server;
