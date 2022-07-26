import { extendInputType } from 'nexus';

export const UserUniqueInput = extendInputType({
  type: 'UserUniqueInput',
  definition(t) {
    t.int('id');
    t.string('email');
  },
});

export const UserCreateInput = extendInputType({
  type: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('email');
    t.string('firstName');
    t.string('lastName');
    t.list.nonNull.field('posts', { type: 'PostCreateInput' });
  },
});
