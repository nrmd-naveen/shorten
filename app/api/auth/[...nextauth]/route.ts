
import NextAuth from "next-auth";
import Google  from "next-auth/providers/google"; 

const handler = NextAuth({
    providers: [
        Google({
                clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
                clientId: process.env.GOOGLE_CLIENT_ID || '',
            }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }