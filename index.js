const mongoose = require("mongoose");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const jwt = require("jsonwebtoken");

const User = require("./models/user");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect("mongodb://127.0.0.1:27017/kanban").then(() => {
  console.log("Connected to MongoDB");

  startStandaloneServer(server, {
    listen: { port: 4000 },
    async context({ req, res }) {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.startsWith("Bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), "SECRET");
        const currentUser = await User.findById(decodedToken.userId);
        return {
          currentUser,
        };
      }
    },
  }).then(({ url }) => {
    console.log(`Server @ ${url}`);
  });
});
