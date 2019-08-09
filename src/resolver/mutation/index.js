const { prisma } = require('../../generated/prisma-client');

async function createUser(_parent, args) {
  const { email, firstName, lastName, password } = args.input;
  return prisma.createUser({
    email,
    firstName,
    lastName,
    password
  });
}

async function createPost(_parent, args, context) {
  const { question, reviewers } = args.input;
  const createReviewerStatus = reviewers.map(function getReviewerID(reviewer) {
    return {
      reviewer: {
        connect: { id: reviewer.reviewerID }
      }
    };
  });

  return prisma.createPost({
    question,
    createdBy: {
      connect: { id: context.user.id }
    },
    reviewers: {
      create: createReviewerStatus
    }
  });
}

async function createLike(_parent, args, context) {
  const { like, postID } = args.input;
  return prisma.createLike({
    like,
    createdBy: {
      connect: {
        id: context.user.id
      }
    },
    post: {
      connect: {
        id: postID
      }
    }
  });
}

async function createComment(_parent, args, context) {
  const { comment, postID } = args.input;
  return prisma.createComment({
    comment,
    createdBy: {
      connect: {
        id: context.user.id
      }
    },
    post: {
      connect: {
        id: postID
      }
    }
  });
}

module.exports = {
  createUser,
  createPost,
  createLike,
  createComment
};
