import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./lib/queries";
import { writeClient } from "./sanity/lib/writeClient";

export const {handlers, auth, signIn, signOut} = NextAuth({
  providers: [GitHub],
  callbacks: {
          async signIn({profile, user}){
            const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
              id: profile.id,
            })


            if(profile?.email === process.env.EMAIL_FOR_TEST){
              user.role = "admin"
            } else {
                user.role = "normal"
            }


              if(!existingUser){
                await writeClient.create({
                  _type: 'author',
                  id: profile.id,
                  role: user?.role || "normal",
                  name: user.name,
                  username: profile.login,
                  email: user.email,
                  image: user.image,
                  bio: profile.bio || ''
                })
              }

                return true
            },

            async jwt({token, user, profile, account}){
                  if (user) {
              
                    // if(account && profile){
                    //   const user2 = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                    //     id: profile?.id
                    // });

                    token.user = {
                      id: user?._id,
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