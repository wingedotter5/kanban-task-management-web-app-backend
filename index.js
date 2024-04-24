const mongoose = require("mongoose");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const jwt = require("jsonwebtoken");

const config = require("./config");
const User = require("./models/user");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect(config.MONGODB_URI).then(() => {
  console.log(`Connected to MongoDB`);
  startStandaloneServer(server, {
    async context({ req }) {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.startsWith("Bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);
        const currentUser = await User.findById(decodedToken.userId);
        return {
          currentUser,
        };
      }
    },
  }).then(({ url }) => {
    console.log(`Server: ${url}`);
  });
});
