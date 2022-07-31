import { or, rule, shield } from 'graphql-shield';

import { getUserId } from '@/utils';
import { Context } from '@/context';

const rules = {
  isGuest: rule()((_parent, _args, context: Context) => {
    const userId = getUserId(context);
    return Boolean(!userId);
  }),
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

export const permissions = shield(
  {
    Query: {
      draftsByUser: rules.isAuthenticatedUser,
      postById: or(rules.isAuthenticatedUser, rules.isGuest),
    },
    Mutation: {
      signup: rules.isGuest,
      changePassword: rules.isAuthenticatedUser,
      createDraft: rules.isAuthenticatedUser,
      deletePost: rules.isPostOwner,
      incrementPostViewCount: rules.isAuthenticatedUser,
      togglePublishPost: rules.isPostOwner,
    },
  },
  {
    allowExternalErrors: true,
  },
);
