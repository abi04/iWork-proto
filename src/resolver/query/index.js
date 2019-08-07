const { prisma } = require('../../generated/prisma-client');

async function getAllUsers() {
  return prisma.users();
}

async function getAllPosts() {
  return prisma.posts();
}

async function getUserByID(_parent, args) {
  return prisma.user({
    id: `${args.userID}`
  });
}

async function getUserByEmail(_parent, args) {
  return prisma.user({
    id: `${args.email}`
  });
}

module.exports = {
  getAllUsers,
  getAllPosts,
  getUserByID,
  getUserByEmail
};
