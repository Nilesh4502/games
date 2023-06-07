// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirebaseConfig} from "./firebase-config";
// manu test 
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { Session } from "inspector";
import { getDatabase } from "firebase/database";


//

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// to do read from the env file 
const firebaseConfig = getFirebaseConfig();
//console.log("firebase config ", firebaseConfig);

// Initialize Firebase
const app = getApps.length >0 ?getApp() : initializeApp(firebaseConfig);
//const auth = getAuth(app);
console.log("auth", getAuth(app).currentUser)
const db = getFirestore(app);
//console.log("firestore instance ", db.toJSON());
const storage = getStorage(app);



// Returns the signed-in user's display name.
function getUserName(app) {
  return getAuth(app).currentUser.displayName;
}
// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName(app);
    console.log("auth state observer user is signed in ",userName, profilePicUrl );
    // Set the user's profile pic and name.
  

    // We save the Firebase Messaging Device token and enable notifications.
    //saveMessagingDeviceToken();
  } else {
    // User is signed out!
    console.log(" auth state observer User is signed out!")
      
  }
}

function initFirebaseAuth(app) {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(app), authStateObserver);
}

//Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return getAuth(app).currentUser.photoURL || '/images/profile_placeholder.png';
};
// Returns the signed-in user's profile Pic URL.
// function updateProfile(file:File, id:string) {
//   console.log("update the profile image");
  
//   const storage = getStorage();
//   const storageRef = ref(storage, `profile-pictures/${id}`);
  
//   // Upload the file to Firebase Storage
//   uploadBytes(storageRef, file).then((snapshot)=>{
//      return getDownloadURL(snapshot.ref);
//   })
//   .then((downloadURL)=>{
    
//     if(id){
//     return updateProfile(id, {
//       photoURL: downloadURL || '',
//     });
//   }
//   else {
//     throw new Error('User is not signed in.');
//   }
//   })
  
//   // const storage = getStorage();

  
//   // const imageRef = ref(storage, 'images/${id}');
//   // uploadBytes(imageRef,file).then(()=>{
//   //   alert("uploaded")
//   // })


//   // const storageRef = ref(storage, `files/${file.name}`);
//   // const uploadTask = uploadBytesResumable(storageRef, file);

//   // uploadTask.on("state_changed",()=>{
//   //   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//   //     return downloadURL;
//   // })})
function updateProfile(file, id) {
  console.log("update the profile image");

  const storage = getStorage();
  const storageRef = ref(storage, `profile-pictures/${id}`);

  // Upload the file to Firebase Storage
  uploadBytes(storageRef, file)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .then((downloadURL) => {
      const userRef = doc(db, 'users', id);
      return updateDoc(userRef, {
        photoURL: downloadURL || '',
      });
    })
    .then(() => {
      console.log('Profile image updated successfully.');
    })
    .catch((error) => {
      console.error('Failed to update profile image:', error);
    });
}

const fireDb = getDatabase(app);







console.log(`appname ${app.name}  storage ${storage} db ${db}`);
export default fireDb;
export {app, db,storage,initFirebaseAuth, getProfilePicUrl,updateProfile};