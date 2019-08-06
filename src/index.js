const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');
const { prisma } = require('./generated/prisma-client');

const typeDefs = importSchema('./graphQL/schema.graphql');
const Query = require('./resolver/query/index');
const Mutation = require('./resolver/mutation/index');

// A map of functions which return data for the schema.
const resolvers = {
  Query,
  Mutation
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { prisma }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
