const { prisma } = require('../../generated/prisma-client');

const reviewer = parent => {
  return prisma.reviewStatus({ id: parent.id }).reviewer();
};

const post = parent => {
  return prisma.reviewStatus({ id: parent.id }).post();
};

module.exports = {
  reviewer,
  post
};
