const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');
const { prisma } = require('./generated/prisma-client');

const typeDefs = importSchema('./graphQL/schema.graphql');
const Query = require('./resolver/query/index');
const Mutation = require('./resolver/mutation/index');
const User = require('./resolver/types/User');

// A map of functions which return data for the schema.
const resolvers = {
  Query,
  Mutation,
  User
};

const user = {
  posts: [],
  email: 'test@abc.com',
  profilePictureUrl: null,
  lastName: 'lastname-1',
  firstName: 'User-1',
  id: 'cjz0hg5gb003v0763l9pluq56',
  password: 'secret'
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { prisma, user }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
