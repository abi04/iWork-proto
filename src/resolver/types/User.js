const { prisma } = require('../../generated/prisma-client');

const posts = parent => {
  return prisma.posts({
    where: {
      createdBy: parent.userID
    }
  });
};

const postNotification = parent => {
  return prisma.reviewStatuses({
    where: {
      reviewer: parent.userID
    }
  });
};

module.exports = {
  posts,
  postNotification
};
