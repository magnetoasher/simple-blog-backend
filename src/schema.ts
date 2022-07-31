import { applyMiddleware } from 'graphql-middleware';
import { makeSchema } from 'nexus';
import { validatePlugin } from 'nexus-validate';
import { permissions } from './permissions';
import UserQuery from './types/user/query';
import PostQuery from './types/post/query';
import UserMutation from './types/user/mutation';
import PostMutation from './types/post/mutation';
import User from './types/user';
import Post from './types/post';
import { UserCreateInput, UserUniqueInput } from './types/user/input';
import { PostCreateInput, PostOrderByUpdatedAtInput } from './types/post/input';
import { DateTime, SortOrder } from './types/global';
import { AuthPayload, ErrorPayload } from './types/user/payload';

const schemaWithoutPermissions = makeSchema({
  types: [
    UserQuery,
    PostQuery,
    UserMutation,
    PostMutation,
    Post,
    User,
    ErrorPayload,
    AuthPayload,
    UserUniqueInput,
    UserCreateInput,
    PostCreateInput,
    SortOrder,
    PostOrderByUpdatedAtInput,
    DateTime,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
  plugins: [validatePlugin()],
});

export const schema = applyMiddleware(schemaWithoutPermissions, permissions);
