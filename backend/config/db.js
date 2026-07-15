const mongoose = require("mongoose");

async function connectDB() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing from the .env file.");
  }

  await mongoose.connect(process.env.MONGO_URI);

  console.log(
    `MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`
  );
}

module.exports = connectDB;