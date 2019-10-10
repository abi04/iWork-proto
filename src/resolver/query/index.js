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

async function getUsersBySearchString(_parent, args) {
  return prisma.users({
    where: {
      OR: [{ firstName_contains: args.search }, { lastName_contains: args.search }]
    },
    orderBy: 'firstName_ASC'
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

async function getCompletePostsForUser(_parent, args) {
  return prisma
    .user({
      id: args.userID
    })
    .posts({
      where: {
        isComplete: true
      }
    });
}

async function getPostsHistory(_parent, args) {
  const { questionSearchString, userID } = args;
  const postCreatedByUser = await prisma
    .user({
      id: userID
    })
    .posts({
      where: {
        AND: [{ isComplete: true }, { question_contains: questionSearchString }]
      }
    });

  const postWhereUserAsReviewer = await prisma.posts({
    where: {
      AND: [
        { reviewers_some: { reviewer: { id: userID } } },
        { isComplete: true },
        { question_contains: questionSearchString }
      ]
    }
  });

  return [...postCreatedByUser, ...postWhereUserAsReviewer];
}

async function getNotificationPostForUser(_parent, args) {
  return prisma
    .user({
      id: args.userID
    })
    .postNotification({
      where: {
        isReviewComplete: false
      }
    });
}

module.exports = {
  getAllUsers,
  getAllPosts,
  getUserByID,
  getUserByEmail,
  getUsersBySearchString,
  getPostByID,
  getIncompletePostsForUser,
  getCompletePostsForUser,
  getPostsHistory,
  getNotificationPostForUser
};
