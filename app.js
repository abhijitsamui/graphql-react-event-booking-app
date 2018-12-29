const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
    type RootQuery {
        events: [String!]!
    }
    type RootMutation {
        createEvent(name: String): String
    }
    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
    rootValue: {
      events: () => {
        return ["Movie booking", "Event Booking", "Marriage Event"];
      },
      createEvent: args => {
        const eventName = args.name;
        return eventName;
      }
    },
    graphiql: true
  })
);

app.listen(3000, () => console.log("Server Listening on PORT 3000..."));

app.get("/", (req, res, next) => {
  res.send("Hello there!!");
  next();
});
