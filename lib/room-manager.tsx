import { initializeApp, getApps, getApp } from "firebase/app";
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
    getDoc,
    serverTimestamp,
  } from 'firebase/firestore';
  import { useRouter } from 'next/router';
  import {useToast} from '@chakra-ui/react';
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
  import { app } from "./firebase-config"

  

const db = getFirestore(app);


export async function createRoom(State) {
  try {
    console.log("okk");
    const docRef = collection(db, 'rooms');
    const roomDocRef = doc(docRef, State.id);
    const geoDetailsRef = collection(roomDocRef, 'geoDetails');
    const addressRef = doc(geoDetailsRef, 'address');
    const activationRef = collection(roomDocRef, 'ActivationDetails');
    const deactivateRef = collection(activationRef, 'Deactivated');
    const roomMetaRef = collection(roomDocRef, 'roomMeta');
    const ownerIdRef = collection(roomDocRef, 'ownerId');

    await addDoc(roomMetaRef, {
      isPublic: true
    });

    await addDoc(ownerIdRef, {
      id: "id"
    });

    await addDoc(activationRef, {
      activatedby: "activatedby",
      activationTimeStamp: serverTimestamp(),
      isLive: true,
      isBanned: false
    });

    await addDoc(deactivateRef, {
      deactivatedby: "deactivatedby",
      deactivatedtimestamp: serverTimestamp(),
    });

    await addDoc(geoDetailsRef, {
      location: "location"
    });

    await setDoc(addressRef, {
      city: "city",
      state: "state",
      country: "country"
    });

    await addDoc(docRef, {
      creationDate: "date",
      gifUrl: "gif",
      imageUrl: "https://picsum.photos/id/33/200/300",
      isLive: false,
      room_ctg: "ctg",
      roomId: State.id,
      roomname: State.name
    });

    console.log('Document created with ID:', docRef.id);
  } catch (error) {
    console.error('Error creating document:', error);
  }
}
  

  export  function roomCategory(category){
    const docRef=addDoc(collection(db,"roomCtgr"),{
       ctg_desc:category.desc  ,
       ctg_id:category.id,
       ctg_parrentId:category.parentId,
       ctg_type: category.type
    })

}

// function deleteRoom(){

// }

// function updateRoom(){

// }
export  async function category_data(){
   const categoryData=await getDoc(doc(collection(db,"roomCtgr")));
   return categoryData.data();
}

export async function room_data(){
  const docRef = doc(collection(db, "rooms"));
  const geoRef = doc(collection(db, "rooms", "geoDetails"));
  const addressRef = doc(collection(geoRef, "address"));
  const activationRef = doc(collection(db, "rooms", "ActivationDetails"));
  const deactivateRef = doc(collection(activationRef, "Deactivated"));
  const roomMetaRef = doc(collection(docRef, "roomMeta"));
  const ownerId = doc(collection(docRef, "ownerId"));

  const roomDataSnapshot = await getDoc(docRef);
  const geoDataSnapshot = await getDoc(geoRef);
  const addressDataSnapshot = await getDoc(addressRef);
  const activationDataSnapshot = await getDoc(activationRef);
  const deactivateDataSnapshot = await getDoc(deactivateRef);
  const roomMetaDataSnapshot = await getDoc(roomMetaRef);
  const ownerDataSnapshot = await getDoc(ownerId);

  const roomData = roomDataSnapshot.data();
  const geoData = geoDataSnapshot.data();
  const addressData = addressDataSnapshot.data();
  const activationData = activationDataSnapshot.data();
  const deactivateData = deactivateDataSnapshot.data();
  const roomMetaData = roomMetaDataSnapshot.data();
  const ownerData = ownerDataSnapshot.data();

  return {
    roomData,
    geoData,
    addressData,
    activationData,
    deactivateData,
    roomMetaData,
    ownerData,
  };

}