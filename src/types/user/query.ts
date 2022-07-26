import { extendType } from 'nexus';
import { Context } from '@/context';
import { getUserId } from '@/utils';

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allUsers', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany();
      },
    });

    t.nullable.field('me', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        const userId = getUserId(context);
        return context.prisma.user.findUnique({
          where: {
            id: Number(userId),
          },
        });
      },
    });
  },
});

export default UserQuery;
