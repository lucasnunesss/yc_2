import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";


export const {handlers, auth, signIn, signOut} = NextAuth({
  providers: [GitHub],
  callbacks: {
          async signIn({profile, user}){
                if(profile?.email === process.env.EMAIL_FOR_TEST){
                      user.role = "admin"
                } else {
                    user.role = "normal"
                }

                return true
            },

            async jwt({token, user, profile}){
                  if (user) {
                  
                    token.user = {
                      id: profile?.sub,
                      email: profile?.email,
                      role: user?.role,
                      image: profile?.picture, 
                    };
                  }
                return token

            },

            async session({session, token}){
              session.user = {
                id: token?.user?.id,
                email: token?.user?.email,
                picture: token?.user?.image,
                role: token.user.role,
              };
              return session;
            }
  }
})