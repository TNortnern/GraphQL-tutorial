const mongoose = require("mongodb").MongoClient;
const config = require("config");
const uri = config.get("mongoURI");
let mongoDB;

const setupDB = (callback) => {

  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      mongoDB = client.db("ECommerce");

      if (err) {
        return callback(err);
      } else {
        return callback("DB OK");
      }
    }
  );
};

const getDB = () => {
  return mongoDB;
};

module.exports = {setupDB, getDB}