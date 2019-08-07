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

  console.log(createReviewerStatus);

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

module.exports = {
  createUser,
  createPost
};
