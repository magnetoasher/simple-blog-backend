import { objectType } from 'nexus';
import { Context } from '@/context';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id');
    t.string('firstName');
    t.string('lastName');
    t.nonNull.string('email');
    t.string('avatar');
    t.list.field('posts', {
      type: 'Post',
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .posts();
      },
    });
  },
});

export * from './input';
export * from './payload';
export * from './query';
export * from './mutation';
