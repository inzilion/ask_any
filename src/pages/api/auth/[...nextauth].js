import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import client from "@/util/database"
import bcrypt from 'bcrypt'


export const authOptions = {
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // ...add more providers here
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드 
      name: "부천정산고",
        credentials: {
          email: { label: "학번", type: "text" },
          password: { label: "비번", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고 
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await client).db('ASK_ANY');
        let user = await db.collection('USERS').findOne({email : credentials.email})
        if (!user) {
          console.log('해당 학번은 없음');
          return null
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log('비번틀림');
          return null
        }
        return user
      }
    })
  ],
  
  secret: process.env.AUTH_SECRET,

  session: {
    strategy: 'jwt',
    maxAge: 1 * 60 * 60 //1일
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name
        token.user.email = user.email
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;  
      return session;
    },
 //   async signIn()

    // async jwt({ token, account, profile }) {
      
    //   if (account) {
    //     token.accessToken = account.access_token
    //     token.id = profile.id
    //   }
    //   return token
    // },
    
    // async session({ session, token }){
      
    // return session;
  },
}

export default NextAuth(authOptions)