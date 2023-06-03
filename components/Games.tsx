import React, { useState } from "react";
import {
  Stack,
  Card,
  CardBody,
  Text,
  Image,
  Heading,
  Box,
  Flex,
  Button,
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";
import gameData from "../data/game.json";

interface Game {
  id: number;
  name: string;
  img_url: string;
  company_name: string;
  rating: string;
  price: string;
}

function RatingStars({ rating }: { rating: string }) {
  const stars = [];

  for (let i = 0; i < parseInt(rating); i++) {
    stars.push("★");
  }

  return <span>{stars}</span>;
}

function Games() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const gameList = gameData.game;

  const [isLargerThanMobile] = useMediaQuery("(min-width: 768px)");

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = gameList.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <Flex flexWrap="wrap" justifyContent="center">
      <SimpleGrid
        spacing={4}
        columns={isLargerThanMobile ? 4 : 2}
        width={isLargerThanMobile ? "80%" : "100%"}
      >
        {itemsToShow.map((game) => (
          <Box key={game.id} m="4" p="4" width="100%">
            <Card maxW="100%">
              <Image
                src={game.img_url}
                alt={game.name}
                height="200px"
                objectFit="cover"
              />
              <CardBody>
                <Stack mt="6" spacing="3">
                  <Heading size="md">{game.name}</Heading>
                  <Text>Companyname: {game.company_name}</Text>
                  <Text>Price: {game.price}$</Text>
                  <Text>
                    Rating: <RatingStars rating={game.rating} />
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          </Box>
        ))}
      </SimpleGrid>
      <Flex justifyContent="center" width="100%" mt="4">
        {currentPage > 0 && (
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={handlePreviousPage}
            mr="2"
          >
            Previous Page
          </Button>
        )}

        {endIndex < gameList.length && (
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={handleNextPage}
            ml="2"
          >
            Next Page
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

export default Games;
