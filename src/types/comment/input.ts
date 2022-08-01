import { extendInputType } from 'nexus';

export const CommentCreateInput = extendInputType({
  type: 'CommentCreateInput',
  definition(t) {
    t.nonNull.id('postId');
    t.nonNull.string('content');
  },
});

export const CommentUpdateInput = extendInputType({
  type: 'CommentUpdateInput',
  definition(t) {
    t.nonNull.string('content');
  },
});
