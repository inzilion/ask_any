import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  
  secret: process.env.AUTH_SECRET,

  callbacks: {
 //   async signIn()

    // async jwt({ token, account, profile }) {
      
    //   if (account) {
    //     token.accessToken = account.access_token
    //     token.id = profile.id
    //   }
    //   return token
    // },
    
    async session({ session, token }){
      console.log(session)
      if(!session.rightList) session.rightList = [];
      session.rightList.push(1);
      console.log(token);
      
    return session;
  } 

  }
}

export default NextAuth(authOptions)