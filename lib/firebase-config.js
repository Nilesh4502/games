/**
 * To find your Firebase config object:
 * 
 * 1. Go to your [Project settings in the Firebase console](https://console.firebase.google.com/project/_/settings/general/)
 * 2. In the "Your apps" card, select the nickname of the app for which you need a config object.
 * 3. Select Config from the Firebase SDK snippet pane.
 * 4. Copy the config object snippet, then add it here.
 */
import { initializeApp, getApps, getApp } from 'firebase/app';

const config = {
    /* TODO: ADD YOUR FIREBASE CONFIGURATION OBJECT HERE */

    apiKey: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_apiKey,
    authDomain:process.env.NEXT_PUBLIC_FIREBASE_CONFIG_authDomain,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_projectId,
    storageBucket:process.env.NEXT_PUBLIC_FIREBASE_CONFIG_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_appId,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_databaseUrl,
    // measurementId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_measurementId,
  
  };
  const getFirebaseConfig = () => {
    return {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_apiKey,
    authDomain:process.env.NEXT_PUBLIC_FIREBASE_CONFIG_authDomain,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_projectId,
    storageBucket:process.env.NEXT_PUBLIC_FIREBASE_CONFIG_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_appId,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_databaseUrl,
    };
  };
 // console.log("firebase api key ", config.apiKey);

 let app;

// Check if the app already exists
if (getApps().length === 0) {
  // If the app doesn't exist, initialize it with the provided config
  app = initializeApp(config);
} else {
  // If the app already exists, use the existing app
  app = getApp();
}

 export { app , getFirebaseConfig }
