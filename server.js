const express = require("express");
// const mongoose = require("mongoose");
// const items = require("./routes/api/items");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const schema = require('./config/schema');

const app = express();
const { setupDB } = require("./config/db");

setupDB((v) => console.log(v));
app.use(express.json());
app.use(cors());


app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    pretty: true,
  })
);

// use routes
// app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
