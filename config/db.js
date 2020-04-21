const mongoose = require("mongoose");
const config = require("config");
const uri = config.get("mongoURI");
let mongoDB;

const setupDB = async () => {
  let message;
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((res) => {
      mongoDB = res;
      message = "MongoDB Connected..."
    })
    .catch((err) => {
      message = `Error: ${err}`
    });
    console.log(message)
    return message;
};
const getDB = () => {
  return mongoDB;
};

module.exports = { setupDB, getDB };
