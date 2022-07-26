import { extendInputType } from 'nexus';

export const PostCreateInput = extendInputType({
  type: 'PostCreateInput',
  definition(t) {
    t.nonNull.string('title');
    t.string('content');
  },
});

export const PostOrderByUpdatedAtInput = extendInputType({
  type: 'PostOrderByUpdatedAtInput',
  definition(t) {
    t.nonNull.field('updatedAt', { type: 'SortOrder' });
  },
});
