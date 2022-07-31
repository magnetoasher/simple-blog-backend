import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { nonNull, extendType, stringArg } from 'nexus';
import { APP_SECRET, getUserId } from '@/utils';
import { Context } from '@/context';
import { UserInputError } from 'nexus-validate';

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        firstName: stringArg(),
        lastName: stringArg(),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      validate: ({ string }) => ({
        email: string()
          .email('Email must be a valid email')
          .required('Email is required'),
      }),
      resolve: async (_parent, args, context: Context) => {
        const hashedPassword = await hash(args.password, 10);

        let user = await context.prisma.user.findUnique({
          where: {
            email: args.email,
          },
        });

        if (user) {
          throw new UserInputError('Email is already registered', {
            invalidArgs: ['email'],
          });
        }

        user = await context?.prisma?.user!.create({
          data: {
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            password: hashedPassword,
          },
        });

        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        };
      },
    });

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, { email, password }, context: Context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return {
            errors: [{ field: 'email', message: 'Invalid credentials' }],
          };
        }

        const passwordValid = await compare(password, user.password);

        if (!passwordValid) {
          return {
            errors: [{ field: 'email', message: 'Invalid credentials' }],
          };
        }

        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        };
      },
    });

    t.field('changePassword', {
      type: 'AuthPayload',
      args: {
        oldPassword: nonNull(stringArg()),
        newPassword: nonNull(stringArg()),
      },
      resolve: async (
        _parent,
        { oldPassword, newPassword },
        context: Context,
      ) => {
        const userId = getUserId(context);
        const user = await context.prisma.user.findUnique({
          where: {
            id: Number(userId),
          },
        });

        if (!user) {
          return {
            errors: [
              { field: 'token', message: 'No user found for given token' },
            ],
          };
        }

        const passwordValid = await compare(oldPassword, user.password);

        if (!passwordValid) {
          return {
            errors: [{ field: 'oldPassword', message: 'Invalid password' }],
          };
        }

        const hashedPassword = await hash(newPassword, 10);

        const updatedUser = await context.prisma.user.update({
          where: { id: Number(userId) },
          data: { password: hashedPassword },
        });

        return {
          token: sign({ userId }, APP_SECRET),
          user: updatedUser,
        };
      },
    });

    t.field('changeEmail', {
      type: 'AuthPayload',
      args: {
        password: nonNull(stringArg()),
        newEmail: nonNull(stringArg()),
        redirectUrl: stringArg(),
      },
      resolve: async (_parent, { password, newEmail }, context: Context) => {
        const userId = getUserId(context);
        const user = await context.prisma.user.findUnique({
          where: {
            id: Number(userId),
          },
        });

        if (!user) {
          return {
            errors: [
              { field: 'token', message: 'No user found for given token' },
            ],
          };
        }

        const passwordValid = await compare(password, user.password);

        if (!passwordValid) {
          return {
            errors: [{ field: 'password', message: 'Invalid password' }],
          };
        }

        const updatedUser = await context.prisma.user.update({
          where: { id: Number(userId) },
          data: { email: newEmail },
        });

        return {
          token: sign({ userId }, APP_SECRET),
          user: updatedUser,
        };
      },
    });
  },
});

export default UserMutation;
