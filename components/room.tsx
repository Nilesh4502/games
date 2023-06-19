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
import { getFirestore,getDocs,getDoc,doc, collection } from 'firebase/firestore';
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
          
                
                const geoCollectionRef = collection(roomCollectionRef,roomId,'geoDetails');
                const geoSnapshot = await getDocs(geoCollectionRef);
                const geoDetails = geoSnapshot.docs.map((geoDoc) => geoDoc.data());
          
                let address = [];
                  if (geoDetails.length > 0) {
                 const addressCollectionRef = collection(geoCollectionRef, geoDetails[0].id, 'address');
                 const addressSnapshot = await getDocs(addressCollectionRef);
                  address = addressSnapshot.docs.map((addressDoc) => addressDoc.data());
            }
          
                const activationCollectionRef = collection(roomCollectionRef, roomId, 'ActivationDetails');
                const activationSnapshot = await getDocs(activationCollectionRef);
                const activationDetails = activationSnapshot.docs.map((activationDoc) => activationDoc.data());
               let deactivated=[];
               if(activationDetails.length > 0){
                const deactivateDocRef =collection(activationCollectionRef,activationDetails[0].id, 'Deactivated');
                const deactivateSnapshot = await getDocs(deactivateDocRef);
                const deactivated = deactivateSnapshot.docs.map((deactivationDoc) => deactivationDoc.data());
               }
                const roomMetaCollectionRef = collection(roomCollectionRef,roomId, 'roomMeta');
                const roomMetaSnapshot = await getDocs(roomMetaCollectionRef);
                const roomMeta = roomMetaSnapshot.docs.map((roomMetaDoc) => roomMetaDoc.data());
          
                const ownerIdCollectionRef = collection(roomCollectionRef,roomId, 'ownerId');
                const ownerIdSnapshot = await getDocs(ownerIdCollectionRef);
                const ownerId = ownerIdSnapshot.docs.map((ownerIdDoc) => ownerIdDoc.data());
          
                
                const roomWithSubcollections = {
                  ...roomData,
                  geoDetails,
                  address,
                  activationDetails,
                  deactivated,
                  roomMeta,
                  ownerId,
                };
          
                roomsData.push(roomWithSubcollections);
                console.log("okkk")
              }
              
              setData(roomsData);
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
                        <Heading size="md">{item.type}</Heading>
                        <Text>{item.id}</Text>
                        <Text>Category: {item.category}</Text>
                        <Button onClick={handleClick}>JOIN</Button>
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
