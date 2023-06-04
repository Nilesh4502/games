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
import roomData from "../data/rooms.json";
import { useRouter } from "next/router";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface Room {
  id: string;
  type: string;
  category: string;
  imageUrl: string;
  videoUrl: string;
  hlsstreamurl: string;
}

function RoomComponent() {
  const [Category, setCategory] = useState("");
  const router = useRouter();
  const [numRooms, setNumRooms] = useState(4);
  const roomContainerRef = useRef(null);

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

  const handleCategorySelect = (category) => {
    setCategory(category);
  };

  const [isLargerThanMobile] = useMediaQuery("(min-width: 768px)");

  function handleClick() {}

  return (
    <div>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {Category || "Category"}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleCategorySelect("movies")}>
            movies
          </MenuItem>
          <MenuItem onClick={() => handleCategorySelect("sports")}>
            sports
          </MenuItem>
          <MenuItem onClick={() => handleCategorySelect("games")}>
            games
          </MenuItem>
          <MenuItem onClick={() => handleCategorySelect("music")}>
            music
          </MenuItem>
          <MenuItem onClick={() => router.push("/")}>Home</MenuItem>
        </MenuList>
      </Menu>
      <Flex flexWrap="wrap" justifyContent="center">
        <SimpleGrid
          spacing={4}
          columns={isLargerThanMobile ? 4 : 2}
          width={isLargerThanMobile ? "80%" : "100%"}
        >
          {roomData
            .filter((item) => item.Room.category === Category)
            .slice(0, numRooms)
            .map((item) => (
              <Box key={item.Room.id} m="4" p="4" width="100%">
                <Card maxW="100%">
                  <Image
                    src={item.Room.imageurl}
                    height="300px"
                    objectFit="cover"
                  />
                  {/* <video src={item.Room.videoUrl}  height="100px" /> */}
                  <CardBody>
                    <Stack mt="6" spacing="3">
                      <Heading size="md">{item.Room.type}</Heading>
                      <Text>{item.Room.id}</Text>
                      <Text>Category: {item.Room.category}</Text>
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

export default RoomComponent;
