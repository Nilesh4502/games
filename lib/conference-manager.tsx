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
    increment,
    getDoc,
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
  import {app} from "./firebase-config"
  
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
async function conferenceRoleData(){
    const docRef=doc(collection(db,"conferenceRole"));
    const PermissionRef=doc(collection(docRef,"permission"));

    const dataSnapshot=await getDoc(docRef);
    const permissionSnapshot=await getDoc(PermissionRef);

    const data=dataSnapshot.data();
    const permission=permissionSnapshot.data();

    return{
        data,
        permission
    };
}

async function conference_data(){
        const docRef=doc(collection(db,"conference"));
        const activityRef=doc(collection(docRef,"ConferenceActivity"));
        const ownerIdRef=doc(collection(docRef,"ownerid"));
        const participantsLeftRef=doc(collection(docRef,"participantsLeft"));
        const participantsJointRef=doc(collection(docRef,"participantsJoint"));
        const participantRef=doc(collection(docRef,"paricipants"));
        const roleRef=doc(collection(participantRef,"Role"));


        const conferenceDataSnapshot = await getDoc(docRef);
        const activityDataSnapshot = await getDoc(activityRef);
        const ownerDataSnapshot = await getDoc(ownerIdRef);
        const participantsLeftDataSnapshot = await getDoc(participantsLeftRef);
        const participantsJointDataSnapshot = await getDoc(participantsJointRef);
        const participantDataSnapshot = await getDoc(participantRef);
        const roleDataSnapshot = await getDoc(roleRef);
    
        const conferenceData = conferenceDataSnapshot.data();
        const activityData = activityDataSnapshot.data();
        const ownerData = ownerDataSnapshot.data();
        const participantsLeftData = participantsLeftDataSnapshot.data();
        const participantsJointData = participantsJointDataSnapshot.data();
        const participantData = participantDataSnapshot.data();
        const roleData = roleDataSnapshot.data();
    
        return {
          conferenceData,
          activityData,
          ownerData,
          participantsLeftData,
          participantsJointData,
          participantData,
          roleData,
        };
}
