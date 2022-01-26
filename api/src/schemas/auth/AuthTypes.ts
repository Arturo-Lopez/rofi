import { inputObjectType } from 'nexus';

export const SignUpInput = inputObjectType({
  name: 'SignUpInput',
  definition(t) {
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});

export const SignInInput = inputObjectType({
  name: 'SignInInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});
