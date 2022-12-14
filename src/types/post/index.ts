import { objectType } from 'nexus';
import type { Context } from '@/context';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.field('createdAt', { type: 'DateTime' });
    t.nonNull.field('updatedAt', { type: 'DateTime' });
    t.nonNull.string('title');
    t.nonNull.string('content');
    t.nonNull.boolean('published');
    t.nonNull.int('viewCount');
    t.nonNull.int('commentCount');
    t.nonNull.field('author', {
      type: 'User',
      resolve: async (parent, _, context: Context) => {
        const author = await context.prisma.post
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author();

        return author!;
      },
    });
    t.nonNull.list.field('comments', {
      type: 'Comment',
      resolve: async (parent, _, context: Context) => {
        const comments = await context.prisma.post
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .comments();

        return comments!;
      },
    });
  },
});

export * from './input';
export * from './query';
export * from './mutation';
