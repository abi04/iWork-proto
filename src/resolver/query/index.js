const { prisma } = require('../../generated/prisma-client');

function hello() {
  return prisma.users;
}
module.exports = { hello };
