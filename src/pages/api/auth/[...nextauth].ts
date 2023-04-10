import { verifyPassword } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@fakeisp.io',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findFirstOrThrow({
          where: { email: credentials?.email },
        });

        const passwordVerified = await verifyPassword(
          credentials?.password as string,
          user.password
        );

        if (!passwordVerified) {
          throw new Error('Invalid login!');
        }

        return { id: user.id, email: user.email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
