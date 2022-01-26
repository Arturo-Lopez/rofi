import { extendType, nonNull } from 'nexus';

import { handleResponseError } from '../../util/handleResponseError';
import { AuthService } from '../../services/AuthService';

export const AuthMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('signUp', {
      type: 'Response',
      args: {
        data: nonNull('SignUpInput'),
      },
      async resolve(_, args, ctx) {
        try {
          const { firstName, lastName, email, password } = args.data;

          const service = new AuthService(ctx);

          await service.signUp({
            firstName,
            lastName,
            email,
            password,
          });

          return {
            status: 200,
            message: 'user signed up',
          };
        } catch (err) {
          return handleResponseError(err);
        }
      },
    });

    t.nonNull.field('signIn', {
      type: 'Response',
      args: {
        data: nonNull('SignInInput'),
      },
      async resolve(_, args, ctx) {
        try {
          const { email, password } = args.data;

          const service = new AuthService(ctx);

          await service.signIn({
            email,
            password,
          });

          return {
            status: 200,
            message: 'user signed in',
          };
        } catch (err) {
          return handleResponseError(err);
        }
      },
    });

    t.nonNull.field('signOut', {
      type: 'Response',
      async resolve(_, __, ctx) {
        try {
          const service = new AuthService(ctx);

          await service.destroySession();

          return {
            status: 200,
            message: 'user signed out',
          };
        } catch (err) {
          return handleResponseError(err);
        }
      },
    });
  },
});
