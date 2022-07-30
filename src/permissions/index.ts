import { rule, shield } from 'graphql-shield';
import { getUserId } from '@/utils';
import { Context } from '@/context';

const rules = {
  isAuthenticatedUser: rule()((_parent, _args, context: Context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
  isPostOwner: rule()(async (_parent, args, context) => {
    const userId = getUserId(context);
    const { authorId } = await context.prisma.post.findUnique({
      where: {
        id: Number(args.id),
      },
    });
    return userId === authorId;
  }),
};

export const permissions = shield({
  Query: {
    draftsByUser: rules.isAuthenticatedUser,
    postById: rules.isAuthenticatedUser,
  },
  Mutation: {
    changePassword: rules.isAuthenticatedUser,
    createDraft: rules.isAuthenticatedUser,
    deletePost: rules.isPostOwner,
    incrementPostViewCount: rules.isAuthenticatedUser,
    togglePublishPost: rules.isPostOwner,
  },
});
