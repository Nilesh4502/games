/**
 * To find your Firebase config object:
 * 
 * 1. Go to your [Project settings in the Firebase console](https://console.firebase.google.com/project/_/settings/general/)
 * 2. In the "Your apps" card, select the nickname of the app for which you need a config object.
 * 3. Select Config from the Firebase SDK snippet pane.
 * 4. Copy the config object snippet, then add it here.
 */
const config = {
    /* TODO: ADD YOUR FIREBASE CONFIGURATION OBJECT HERE */

    apiKey: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_apiKey,
    authDomain:process.env.NEXT_PUBLIC_FIREBASE_CONFIG_authDomain,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_projectId,
    storageBucket:process.env.NEXT_PUBLIC_FIREBASE_CONFIG_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_appId,
    // measurementId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_measurementId,
  
  };
 // console.log("firebase api key ", config.apiKey);
  export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.js');
    } else {
      return config;
    }
  }