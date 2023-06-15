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
    increment,
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

  const firebaseConfig = getFirebaseConfig();

  const app = getApps.length >0 ?getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);

async function conferance(conference) {
    try {
        const docRef=collection(db,"conference");
        const activityRef=collection(docRef,"ConferenceActivity");
        const ownerIdRef=collection(docRef,"ownerid");
        const participantsLeftRef=collection(docRef,"participantsLeft");
        const participantsJointRef=collection(docRef,"participantsJoint");
        const participantRef=collection(docRef,"paricipants");
        const roleRef=collection(participantRef,"Role");
        
        await addDoc(docRef,{
            chatId:conference.chatid,
            confId:conference.confId,
            endedAt:conference.end,
             roomId:conference.roomId,
             startedAt: conference.start,
             title: conference.title

        })
        await addDoc(activityRef,{
            activity_approvedBy:conference.aprover,
            activit_code: conference.activitCode,
            activity_description: conference.activitydesc,
            activity_requested_time:conference.reqtime,
            activity_time: conference.time,
            activity_type: conference.type,
            performedBy_participant:conference.participant

        })
        await addDoc(participantsJointRef,{
            number:increment(1)
        })
        await addDoc(ownerIdRef,{
            ownerId:conference.ownerId
        })
        await addDoc(participantsLeftRef,{
            left:conference.patricipantLeft
        })

        await addDoc(participantRef,{
            userid: conference.userid,
            roleid: conference.roleid,
           joinedAt: conference.joinedAt,
        })
        await addDoc(roleRef,{
            ismoderate: {
                // ismoderate subcollection data
              },
              isspeaker: {
                // isspeaker subcollection data
              },
              isviewer: {
                // isviewer subcollection data
              },
        })
        

    } catch (e) {
        
    }
    
}

async function conferenceRole(role) {
    const docRef=addDoc(collection(db,"conferenceRole"),{
        role_id:role.id,
        type: role.type
    })

    const permission=addDoc(collection(db,"conferenceRole","permission"),{
        canBroadCast: role.broadcast,
        canChat: role.chat,
        canStream: role.stream,
        canView: role.view
    })
    
}
