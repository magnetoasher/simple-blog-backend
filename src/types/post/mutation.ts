import { Context } from '@/context';
import { getUserId } from '@/utils';
import { intArg, nonNull, extendType, arg } from 'nexus';

export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createDraft', {
      type: 'Post',
      args: {
        data: nonNull(
          arg({
            type: 'PostCreateInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        const userId = getUserId(context);
        return context.prisma.post.create({
          data: {
            title: args.data.title,
            content: args.data.content,
            authorId: userId!,
          },
        });
      },
    });

    t.field('updatePost', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
        data: nonNull(
          arg({
            type: 'PostUpdateInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.post.update({
          where: {
            id: args.id,
          },
          data: {
            title: args.data.title,
            content: args.data.content,
          },
        });
      },
    });

    t.field('togglePublishPost', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_, args, context: Context) => {
        try {
          const post = await context.prisma.post.findUnique({
            where: { id: args.id || undefined },
            select: {
              published: true,
            },
          });
          return context.prisma.post.update({
            where: { id: args.id || undefined },
            data: { published: !post?.published },
          });
        } catch (e) {
          throw new Error(
            `Post with ID ${args.id} does not exist in the database.`,
          );
        }
      },
    });

    t.field('incrementPostViewCount', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.post.update({
          where: { id: args.id || undefined },
          data: {
            viewCount: {
              increment: 1,
            },
          },
        });
      },
    });

    t.field('deletePost', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.post.delete({
          where: { id: args.id },
        });
      },
    });
  },
});

export default PostMutation;
