import { extendType, intArg, nonNull } from 'nexus';
import { Context } from '@/context';

export const CommentQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.list.field('commentsByPost', {
      type: 'Comment',
      args: {
        postId: nonNull(intArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        const comments = await context.prisma.post
          .findUnique({
            where: { id: Number(args.postId) },
          })
          .comments();

        return comments!;
      },
    });
  },
});

export default CommentQuery;
