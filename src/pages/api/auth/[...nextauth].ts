import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { compare } from 'bcrypt';
import { findUser } from '../../../data/users';

export default NextAuth({
  session: {
    jwt: true
  },
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = findUser(email);
        if (user) {
          const isPasswordValid = await compare(password, user.password);
          if (isPasswordValid) {
            return { email };
          }
        }
        throw new Error('Wrong credentials!');
      }
    })
  ]
});
