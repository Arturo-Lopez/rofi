import { objectType } from 'nexus';

export const Response = objectType({
  name: 'Response',
  definition(t) {
    t.nonNull.int('status');
    t.nonNull.string('message');
  },
});
