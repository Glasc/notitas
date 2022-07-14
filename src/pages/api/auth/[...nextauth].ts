import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
// providers
import DiscordProvider from 'next-auth/providers/discord'

const prisma = new PrismaClient()
export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.

      return session
    },
  },
})
