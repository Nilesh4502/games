import React, { useEffect, useState, useRef } from "react";
import {
  Stack,
  Card,
  CardBody,
  Text,
  Image,
  Heading,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  CheckboxGroup,
  Button,
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { getFirestore,getDocs,getDoc,doc, collection,deleteDoc  } from 'firebase/firestore';
import { app } from '../lib/firebase-config';

function Room() {
    const db = getFirestore(app);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const router = useRouter();
  const [numRooms, setNumRooms] = useState(4);
  const [data, setData] = useState([]);

  const roomContainerRef = useRef(null);

  useEffect(() => {
        const getRoomsData = async () => {
            try {
              const roomCollectionRef = collection(db, 'rooms');
              const querySnapshot = await getDocs(roomCollectionRef);
          
              const roomsData = [];
          
              for (const docSnap of querySnapshot.docs) {
                const roomData = docSnap.data();
                const roomId = docSnap.id;
                console.log(roomId)
          
                const geoCollectionRef = collection(
                  db,
                  "rooms",
                  roomId,
                  "geoDetails"
                );
                const geoSnapshot = await getDocs(geoCollectionRef);
                const geoDetails = await Promise.all(
                  geoSnapshot.docs.map(async (geoDoc) => {
                    const geoData = geoDoc.data();
                    const geoId = geoDoc.id;
      
                    
                    const addressCollectionRef = collection(
                      geoCollectionRef,
                      geoId,
                      "address"
                    );
                    const addressSnapshot = await getDocs(addressCollectionRef);
                    const addressDocs = addressSnapshot.docs;
      
                    const addressPromises = addressDocs.map(async (addressDoc) => {
                      const addressData = addressDoc.data();
                      const addressId = addressDoc.id;
      
                      
                      const stateCollectionRef = collection(
                        addressCollectionRef,
                        addressId,
                        "state"
                      );
                      const stateSnapshot = await getDocs(stateCollectionRef);
                      const stateDocs = stateSnapshot.docs;
                      const states = stateDocs.map((stateDoc) => stateDoc.data());
      
                     
                      const cityCollectionRef = collection(
                        addressCollectionRef,
                        addressId,
                        "city"
                      );
                      const citySnapshot = await getDocs(cityCollectionRef);
                      const cityDocs = citySnapshot.docs;
                      const cities = cityDocs.map((cityDoc) => cityDoc.data());
      
                      
                      const countryCollectionRef = collection(
                        addressCollectionRef,
                        addressId,
                        "country"
                      );
                      const countrySnapshot = await getDocs(countryCollectionRef);
                      const countryDocs = countrySnapshot.docs;
                      const countries = countryDocs.map(
                        (countryDoc) => countryDoc.data()
                      );
      
                      return {
                        ...addressData,
                        id: addressId,
                        states,
                        cities,
                        countries,
                      };
                    });
      
                    const address = await Promise.all(addressPromises);
      
                    return {
                      ...geoData,
                      id: geoId,
                      address: address,
                    };
                  })
                );
                
                const activationCollectionRef = collection(roomCollectionRef, roomId, 'ActivationDetails');
                const activationSnapshot = await getDocs(activationCollectionRef);
                const activationDetails = await Promise.all(
                  activationSnapshot.docs.map(async (activationDoc) => {
                    const activationData = activationDoc.data();
                    const activationId = activationDoc.id;
                
                    const deactivatedCollectionRef = collection(
                      activationCollectionRef,
                      activationId,
                      'deactivated'
                    );
                    const deactivatedSnapshot = await getDocs(deactivatedCollectionRef);
                    const deactivatedDocs = deactivatedSnapshot.docs;
                    const deactivatedPromises = deactivatedDocs.map(async (deactivatedDoc) => {
                      const deactivatedData = deactivatedDoc.data();
                      const deactivatedId = deactivatedDoc.id;
                
                      const deactivatedByCollectionRef = collection(
                        deactivatedCollectionRef,
                        deactivatedId,
                        'deactivatedby'
                      );
                      const deactivatedBySnapshot = await getDocs(deactivatedByCollectionRef);
                      const deactivatedByDocs = deactivatedBySnapshot.docs;
                      const deactivatedBy = deactivatedByDocs.map((deactivatedByDoc) => deactivatedByDoc.data());
                
                      const deactivatedTimestampCollectionRef = collection(
                        deactivatedCollectionRef,
                        deactivatedId,
                        'deactivatedtimestamp'
                      );
                      const deactivatedTimestampSnapshot = await getDocs(deactivatedTimestampCollectionRef);
                      const deactivatedTimestampDocs = deactivatedTimestampSnapshot.docs;
                      const deactivatedTimestamp = deactivatedTimestampDocs.map((deactivatedTimestampDoc) =>
                        deactivatedTimestampDoc.data()
                      );
                
                      return {
                        ...deactivatedData,
                        id: deactivatedId,
                        deactivatedby: deactivatedBy,
                        deactivatedtimestamp: deactivatedTimestamp,
                      };
                    });
                
                    const deactivated = await Promise.all(deactivatedPromises);
                
                    return {
                      ...activationData,
                      id: activationId,
                      deactivated: deactivated,
                    };
                  })
                );
                
                const roomMetaCollectionRef = collection(roomCollectionRef,roomId, 'roomMeta');
                const roomMetaSnapshot = await getDocs(roomMetaCollectionRef);
                const roomMetaDetails=await Promise.all(
                  roomMetaSnapshot.docs.map(async (roomMetaDoc)=>{
                    const roomMetaData=roomMetaDoc.data();
                    const roomMetaId=roomMetaDoc.id;

                    return {
                      ...roomMetaData,
                      id: roomMetaId
                    };
                  })
                );
          
                const ownerIdCollectionRef = collection(roomCollectionRef,roomId, 'ownerId');
                const ownerIdSnapshot = await getDocs(ownerIdCollectionRef);
                const ownerIdDetails=await Promise.all(
                  ownerIdSnapshot.docs.map(async (ownerIdDoc)=>{
                    const ownerIdData=ownerIdDoc.data();
                    const ownerIdid=ownerIdDoc.id;

                    return {
                      ...ownerIdData,
                      id: ownerIdid
                    };
                  })
                );
          
                
                const roomWithSubcollections = {
                  ...roomData,
                  geoDetails,
                  activationDetails,
                  roomMetaDetails,
                  ownerIdDetails,
                };
          
                
                roomsData.push(roomWithSubcollections);
                setData(roomsData);
               
              }
              
              

              
              console.log(roomsData);
              
            } catch (error) {
              console.error('Error getting documents:', error);
            }
          };
          
  getRoomsData();
}, []);

          
  useEffect(() => {
    const handleScroll = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setNumRooms((prevNumRooms) => prevNumRooms + 4);
      }
    };

    const observer = new IntersectionObserver(handleScroll, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (roomContainerRef.current) {
      observer.observe(roomContainerRef.current);
    }

    return () => {
      if (roomContainerRef.current) {
        observer.unobserve(roomContainerRef.current);
      }
    };
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((c) => c !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const [isLargerThanMobile] = useMediaQuery("(min-width: 768px)");

  const handleClick = () => {
    // Handle click logic
  };

    const handleDelete = async (roomId) => {
      try {
        const docRef = doc(db, 'rooms',roomId);
        await deleteDoc(docRef);
        console.log('Document deleted successfully!');
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }

  return (
    <div>
      <Menu>
        <MenuButton as={Button} colorScheme='blue' padding="10px" margin="10px" rightIcon={<ChevronDownIcon />}>
          Filter
        </MenuButton>
        <MenuList minWidth='240px'>
          <CheckboxGroup
            value={selectedCategories}
            onChange={(categories) => setSelectedCategories(categories as string[])}
          >
            <Stack spacing={[1, 2]} direction="column">
              <Checkbox value="movies">Movies</Checkbox>
              <Checkbox value="sports">Sports</Checkbox>
              <Checkbox value="games">Games</Checkbox>
              <Checkbox value="music">Music</Checkbox>
            </Stack>
          </CheckboxGroup>
          <MenuItem onClick={() => setSelectedCategories([])}>
            Clear Selection
          </MenuItem>
          <MenuItem onClick={() => router.push("/")}>
            Home
          </MenuItem>
        </MenuList>
      </Menu>
      <Flex flexWrap="wrap" justifyContent="center">
        <SimpleGrid
          spacing={4}
          columns={isLargerThanMobile ? 4 : 2}
          width={isLargerThanMobile ? "80%" : "100%"}
        >
          {data &&
            data
              .filter(
                (item) =>
                  selectedCategories.length === 0 ||
                  selectedCategories.includes(item.category)
              )
              .slice(0, numRooms)
              .map((item) => (
                <Box key={item.id} m="4" p="4" width="100%">
                  <Card maxW="100%">
                    <Image
                      src={item.imageUrl}
                      height="300px"
                      objectFit="cover"
                    />
                    <CardBody>
                      <Stack mt="6" spacing="3">
                        <Heading size="md">{item.roomname}</Heading>
                        <Text>{item.id}</Text>
                        <Text>Category: {item.room_ctg}</Text>
                        
                       <Text>City: {item.geoDetails[0].city}</Text>
                       <Text>State: {item.geoDetails[0].state}</Text>
                       <Text>Country: {item.geoDetails[0].country}</Text>



                        <Button onClick={handleClick}>JOIN</Button>
                        <Button onClick={() => handleDelete(item.roomId)}>Delete</Button>
                      </Stack>
                    </CardBody>
                  </Card>
                </Box>
              ))}
        </SimpleGrid>
      </Flex>
      <div ref={roomContainerRef}></div>
    </div>
  );
}

export default Room;
