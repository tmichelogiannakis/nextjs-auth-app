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
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = findUser(email);
        if (!user) {
          throw new Error('Wrong credentials!');
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Wrong credentials!');
        }

        return { email, name: user.id };
      }
    })
  ]
});

/*

authorize: async (credentials: Record<string, string>) => {
        

        const { email, password } = credentials;
        const user = findUser(email);
        if (!user) {
          // throw new Error('Wrong credentials!');
          return null;
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
          // throw new Error('Wrong credentials!');
          return null;
        }

        return { name: email }; 
        // return { email } as GenericReturnConfig;
      }



        const user = findUser(email);
        if (!user) {
          // throw new Error('Wrong credentials!');
          return null;
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
          // throw new Error('Wrong credentials!');
          return null;
        }
        
        return null;
        // return { email }; */
