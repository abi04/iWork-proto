const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');
const { prisma } = require('./generated/prisma-client');

const typeDefs = importSchema('./graphQL/schema.graphql');
const Query = require('./resolver/query/index');
const Mutation = require('./resolver/mutation/index');
const Post = require('./resolver/types/Post');
const Comment = require('./resolver/types/Comment');
const Like = require('./resolver/types/Like');
const ReviewerStatus = require('./resolver/types/ReviewerStatus');

// A map of functions which return data for the schema.
const resolvers = {
  Query,
  Mutation,
  Post,
  ReviewerStatus,
  Comment,
  Like
};

const user = {
  profilePictureUrl: null,
  id: 'cjz3hghu600b60763l85b3mv4',
  email: 'test-2@abc.com',
  firstName: 'User-2',
  lastName: 'lastname-2',
  password: 'secret-1'
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { prisma, user }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
