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
    email: `${args.email}`
  });
}

async function getPostByID(_parent, args) {
  return prisma.post({
    id: args.postID
  });
}

async function getIncompletePostsForUser(_parent, args) {
  return prisma
    .user({
      id: args.userID
    })
    .posts({
      where: {
        isComplete: false
      }
    });
}

async function getNotificationPostForUser(_parent, args) {
  return prisma
    .user({
      id: args.userID
    })
    .postNotification();
}

module.exports = {
  getAllUsers,
  getAllPosts,
  getUserByID,
  getUserByEmail,
  getPostByID,
  getIncompletePostsForUser,
  getNotificationPostForUser
};
