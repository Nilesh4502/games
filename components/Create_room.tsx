import { useState,useEffect, Component } from 'react';
import { useRouter } from 'next/router';
import { getFirestore, collection, addDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';

require('dotenv').config();
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { app } from '../lib/firebase-config';

function RoomComponent() {
  const db = getFirestore(app);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Roomid, setRoomId] = useState('');
  const [long,setLong]=useState('');
  const [lat,setLat]=useState('');
  const [name, setName] = useState('');
  const router = useRouter();
  const [location, setLocation] = useState(null);

  const handleCreateRoom = async () => {
    const State = {
      Roomid: Roomid,
      name: name,
      // Add other fields as needed based on your requirements
    };

    try {
      

      const roomDocRef = doc(collection(db, 'rooms'));
      const geoDetailsRef = collection(roomDocRef, 'geoDetails');
      const addressRef = doc(geoDetailsRef, 'address');
      const activationRef = collection(roomDocRef, 'ActivationDetails');
      const deactivateRef = doc(activationRef, 'Deactivated');
      const roomMetaRef = collection(roomDocRef, 'roomMeta');
      const ownerIdRef = collection(roomDocRef, 'ownerId');

      await addDoc(roomMetaRef, {
        isPublic: true,
      });

      await addDoc(ownerIdRef, {
        id: "u001",
      });

      await addDoc(geoDetailsRef, {
        Latitude: lat,
        Longitude: long
      });

      await setDoc(addressRef, {
        city: location.name,
        state: location.state,
        country: location.country,
      });

      await addDoc(activationRef, {
        activatedby: "admin",
        activationTimeStamp: serverTimestamp(),
        isLive: true,
        isBanned: false,
      });

      await setDoc(deactivateRef, {
        deactivatedby: "admin",
        deactivatedtimestamp: serverTimestamp(),
      });

      await setDoc(roomDocRef, {
        creationDate: serverTimestamp(),
        gifUrl: 'gif',
        imageUrl: 'https://picsum.photos/200/300',
        isLive: false,
        room_ctg: 'public',
        roomId: roomDocRef.id,
        roomname: State.name,
      });

      console.log('Document created with ID:', roomDocRef.id);

      toast({
        title: 'File Added',
        description: 'The file was successfully uploaded.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error creating document:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while uploading the file.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude.toString());
        setLong(longitude.toString());
        const key = process.env.NEXT_PUBLIC_MAP_API_KEY;

        try {
          // Retrieve location details based on coordinates using fetch
          const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${key}`);
          const data = await response.json();

          if (data.length > 0) {
            const { name, state, country } = data[0];
            setLocation({ name, state, country });
            console.log(location);
            console.log(data);
          } else {
            console.error('Location details not found');
          }
        } catch (error) {
          console.error(error);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);




  return (
    <div>
      <Button onClick={onOpen}>Create Room</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* <FormControl>
              <FormLabel>RoomId</FormLabel>
              <Input
                value={Roomid}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Room ID"
              />
            </FormControl> */}

            <FormControl mt={4}>
              <FormLabel>Room Name</FormLabel>
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreateRoom}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default RoomComponent;
