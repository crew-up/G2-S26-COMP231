require("dotenv").config();

const connectDB = require("./config/db");
const createApp = require("./app");

async function start() {
  await connectDB();

  const app = createApp();
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`CrewUp API listening on port ${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});