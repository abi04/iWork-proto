const { prisma } = require('../../generated/prisma-client');

async function createdBy(parent) {
  return prisma
    .post({
      id: parent.id
    })
    .createdBy();
}

async function reviewers(parent) {
  return prisma
    .post({
      id: parent.id
    })
    .reviewers();
}
async function comments(parent) {
  return prisma
    .post({
      id: parent.id
    })
    .comments();
}
async function likes(parent) {
  return prisma
    .post({
      id: parent.id
    })
    .likes();
}

module.exports = {
  createdBy,
  reviewers,
  comments,
  likes
};
