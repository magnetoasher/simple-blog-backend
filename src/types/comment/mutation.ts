import { Context } from '@/context';
import { getUserId } from '@/utils';
import { intArg, nonNull, extendType, arg } from 'nexus';

export const CommentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createComment', {
      type: 'Comment',
      args: {
        data: nonNull(
          arg({
            type: 'CommentCreateInput',
          }),
        ),
      },
      resolve: async (_, args, context: Context) => {
        const userId = getUserId(context);
        const postId = Number(args.data.postId);

        await context.prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            commentCount: {
              increment: 1,
            },
          },
        });

        return await context.prisma.comment.create({
          data: {
            content: args.data.content,
            postId: postId,
            authorId: userId!,
          },
        });
      },
    });

    t.field('updateComment', {
      type: 'Comment',
      args: {
        id: nonNull(intArg()),
        data: nonNull(
          arg({
            type: 'CommentUpdateInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.comment.update({
          where: {
            id: args.id,
          },
          data: {
            content: args.data.content,
          },
        });
      },
    });

    t.field('deleteComment', {
      type: 'Comment',
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.comment.delete({
          where: { id: args.id },
        });
      },
    });
  },
});

export default CommentMutation;
