import { NextAuthOptions } from 'next-auth'
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter'
import { db } from './db'
import GoogleProvider from 'next-auth/providers/google'
import { fetchRedis } from '@/helpers/redis'

function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    if (!clientId || clientId.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_ID')
    }

    if (!clientSecret || clientSecret.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_SECRET')
    }

    return { clientId, clientSecret }
}

export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    session: {
        strategy: 'jwt',
    },

    pages: {
        signIn: '/signin',
    },
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,
        }),
    ],

    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            const dbUserResult = (await fetchRedis('get', `user:${token.id}`)) as
                | string
                | null

            if (!dbUserResult) {
                if (user) {
                    token.id = user!.id
                }

                const escapedEmail = user.email
                const result = await db.json.get('allUsers', `$[?(@.email == "${escapedEmail}")]`)

                if (!result || result.length === 0) {
                    await db.json.set('allUsers', '$', [], { nx: true })
                    await db.json.arrappend('allUsers', '$', user)
                }
                return token
            }

            const dbUser = JSON.parse(dbUserResult) as User

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
            }
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
            }
            return session
        },
        redirect() {
            return '/'
        },
    },

}