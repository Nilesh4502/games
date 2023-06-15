import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirebaseConfig} from "./firebase-config";
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

  const firebaseConfig = getFirebaseConfig();

  const app = getApps.length >0 ?getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);



  async function createRoom(state) {
    try {
      const docRef=collection(db,"rooms");
      const geoRef = collection(db, "rooms", "geoDetails");
      const addressRef = collection(geoRef, "address");
      const activationRef = collection(db, "rooms","ActivationDetails");
      const deactivateRef = collection(activationRef, "Deactivated");
      const roomMetaRef=collection(docRef,"roomMeta")
      const ownerId=collection(docRef,"ownerId")


      await addDoc(roomMetaRef,{
        isPublic: true
      })
      await addDoc(ownerId,{
        id:state.id
      })

  
      await addDoc(activationRef, {
        activatedby: state.activatedby,
        activationTimeStamp: serverTimestamp(),
        isLive: true,
        isBanned: false
      });
  
      await addDoc(deactivateRef, {
        deactivatedby: state.deactivatedby,
        deactivatedtimestamp: serverTimestamp(),
      });
      await addDoc(geoRef,{
          location: state.location
      })
      await addDoc(addressRef,{
            city: state.city,
            state: state.state,
            country: state.country
      })
      await addDoc(docRef,{
        creationDate: state.date,
        girfUrl: state.gif,
        imageUrl: state.img,
        isLive:false,
        room_ctg:state.ctg,
        roomId:state.id,
        roomname:state.name


      })
      
    } catch (error) {
      // Handle the error appropriately
    }
  }
  
  

function roomCategory(category){
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
async function category_data(){
   const categoryData=await getDoc(doc(collection(db,"roomCtgr")));
   return categoryData.data();
}

async function room_data(){
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