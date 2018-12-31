const express = require("express");
const graphqlHTTP = require("express-graphql");

const mongoose = require("mongoose");

// Import Models from MongoDB
const Event = require("./models/event");
const User = require("./models/user");

const graphQLSchema = require("./graphql/schema/index");
const graphQLResolvers = require("./graphql/resolvers/index");

const app = express();
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-gjrnn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(3000, () => console.log("Server Listening on PORT 3000..."));
  })
  .catch(err => {
    console.log(err);
  });

app.get("/", (req, res, next) => {
  res.send("Hello there!!");
  next();
});
