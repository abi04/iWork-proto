const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
const { prisma } = require('./generated/prisma-client');

const typeDefs = importSchema('./graphQL/schema.graphql');
const Query = require('./resolver/query/index');
const Mutation = require('./resolver/mutation/index');
const Post = require('./resolver/types/Post');
const Comment = require('./resolver/types/Comment');
const Like = require('./resolver/types/Like');
const ReviewerStatus = require('./resolver/types/ReviewerStatus');
const RelativeTimeDirective = require('./directives/RelativeTimeDirective');

// A map of functions which return data for the schema.
const resolvers = {
  Query,
  Mutation,
  Post,
  ReviewerStatus,
  Comment,
  Like
};

// const user = {
//   profilePictureUrl: null,
//   email: 'test@abc.com',
//   lastName: 'lastname-1',
//   firstName: 'User-1',
//   id: 'cjz3hftve00b10763htofmlob',
//   password: 'secret'
// };

const user = {
  profilePictureUrl: null,
  id: 'cjz3hghu600b60763l85b3mv4',
  email: 'test-2@abc.com',
  firstName: 'User-2',
  lastName: 'lastname-2',
  password: 'secret-1'
};

// const user = {
//   profilePictureUrl: null,
//   id: 'cjz3hjqlh00bf076394am4t4h',
//   email: 'test-3@abc.com',
//   firstName: 'User-3',
//   lastName: 'lastname-3',
//   password: 'secret-3'
// };

// const user = {
//   profilePictureUrl: null,
//   id: 'cjz3hkr5c00bk0763ex8082ao',
//   email: 'test-4@abc.com',
//   firstName: 'User-4',
//   lastName: 'lastname-4',
//   password: 'secret-4'
// };

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  context: { prisma, user },
  schemaDirectives: {
    relativeTimeFromNow: RelativeTimeDirective
  }
});

const server = new ApolloServer(schema);

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
