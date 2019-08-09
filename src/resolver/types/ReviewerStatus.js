const { prisma } = require('../../generated/prisma-client');

const post = parent => {
  return prisma.reviewStatus({ id: parent.id }).post();
};

module.exports = {
  post
};
