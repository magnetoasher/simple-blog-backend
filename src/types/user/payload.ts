import { objectType } from 'nexus';

export const ErrorPayload = objectType({
  name: 'ErrorPayload',
  definition(t) {
    t.string('field');
    t.string('message');
  },
});

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token');
    t.field('user', { type: 'User' });
    t.list.field('errors', { type: 'ErrorPayload' });
  },
});
