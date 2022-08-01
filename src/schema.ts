import { applyMiddleware } from 'graphql-middleware';
import { makeSchema } from 'nexus';
import { validatePlugin } from 'nexus-validate';
import { permissions } from './permissions';
import * as UserTypes from './types/user';
import * as PostTypes from './types/post';
import * as CommentTypes from './types/comment';
import * as GlobalTypes from './types/global';

const schemaWithoutPermissions = makeSchema({
  types: [
    ...Object.values(UserTypes),
    ...Object.values(PostTypes),
    ...Object.values(CommentTypes),
    ...Object.values(GlobalTypes),
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
