import { objectType } from 'nexus';
import type { Context } from '@/context';

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.field('createdAt', { type: 'DateTime' });
    t.nonNull.field('updatedAt', { type: 'DateTime' });
    t.nonNull.string('content');
    t.nonNull.field('author', {
      type: 'User',
      resolve: async (parent, _, context: Context) => {
        const user = await context.prisma.comment
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author();

        return user!;
      },
    });
    t.nonNull.field('post', {
      type: 'Post',
      resolve: async (parent, _, context: Context) => {
        const post = await context.prisma.comment
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .post();

        return post!;
      },
    });
  },
});

export * from './input';
export * from './mutation';
export * from './query';
