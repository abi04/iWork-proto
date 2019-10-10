'use strict';

var _require = require('apollo-server'),
  ApolloServer = _require.ApolloServer,
  gql = _require.gql;

var _require2 = require('graphql-import'),
  importSchema = _require2.importSchema;

var typeDefs = importSchema('./graphQL/schema.graphql'); // A map of functions which return data for the schema.

var resolvers = {
  Query: {
    hello: function hello() {
      return 'world1';
    }
  }
};
var server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});
server.listen().then(function(_ref) {
  var url = _ref.url;
  console.log('\uD83D\uDE80 Server ready at '.concat(url));
});
