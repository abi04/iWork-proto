const { prisma } = require('../../generated/prisma-client');

const posts = parent => {
  return prisma.posts({
    where: {
      createdBy: parent.userID
    }
  });
};

module.exports = {
  posts
};
