const { prisma } = require('../../generated/prisma-client');

async function createUser(_parent, args) {
  console.log(args.user);
  const { email, firstName, lastName, password } = args.user;
  return prisma.createUser({
    email,
    firstName,
    lastName,
    password
  });
}

module.exports = {
  createUser
};
