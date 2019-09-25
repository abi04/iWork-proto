const { prisma } = require('../../generated/prisma-client');

async function createdBy(parent) {
  return prisma
    .comment({
      id: parent.id
    })
    .createdBy();
}

module.exports = {
  createdBy
};
