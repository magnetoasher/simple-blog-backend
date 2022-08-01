import { extendInputType } from 'nexus';

export const PostCreateInput = extendInputType({
  type: 'PostCreateInput',
  definition(t) {
    t.nonNull.string('title');
    t.nonNull.string('content');
    t.list.nonNull.field('comments', { type: 'CommentCreateInput' });
  },
});

export const PostUpdateInput = extendInputType({
  type: 'PostUpdateInput',
  definition(t) {
    t.nonNull.string('title');
    t.nonNull.string('content');
  },
});

export const PostOrderByUpdatedAtInput = extendInputType({
  type: 'PostOrderByUpdatedAtInput',
  definition(t) {
    t.nonNull.field('updatedAt', { type: 'SortOrder' });
  },
});
