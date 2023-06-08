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
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Checkbox, 
  CheckboxGroup,
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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

  function handleClick() {}

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
          {roomData
            .filter((item) =>
            selectedCategories.length === 0 ||
            selectedCategories.includes(item.Room.category)
          )
            .slice(0, numRooms)
            .map((item) => (
              <Box key={item.Room.id} m="4" p="4" width="100%">
                <Card maxW="100%">
                  <Image
                    src={item.Room.imageurl}
                    height="300px"
                    objectFit="cover"
                  />
                 
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
