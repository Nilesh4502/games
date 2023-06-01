import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google';
import { cert } from "firebase-admin/app";

import { FirestoreAdapter  } from "@next-auth/firebase-adapter";
import {getFirebaseConfig} from "../../../lib/firebase-config";

// import {db} from "../../../lib/firebase.manager";
//import * as firestoreFunctions from "firebase/firestore";
const options = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
          }),

    ],
    /*
    callbacks: {
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token and user id from a provider.
        console.log("callback session   ", token);
        session.accessToken = token.accessToken
        session.user.id = token.id
        
        return session
      },
      async jwt({ token, account, profile }) {
        // Persist the OAuth access_token and or the user id to the token right after signin
        console.log("callback----JWT --- token", account );

        if (account) {
          token.accessToken = account.access_token
          token.id = profile.id
        }
        return token
      }
    },*/
    adapter: FirestoreAdapter({ // Update FirestoreAdapter configuration
      // Pass the Firebase app configuration object
      firebaseConfig: getFirebaseConfig()
  }),


}

export default (req, res) => NextAuth(req, res, options)
