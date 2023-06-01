import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const Banner = () => {
  console.log("in banner component")
  return (
    <Box
      position="relative"
      height={{ base: "240px", md: "320px", lg: "400px", xl: "480px" }}
      mb={{ base: 8, md: 12, lg: 16 }}
    >
      <Image
        src="https://picsum.photos/1920/1080"
        alt="banner"
        objectFit="cover"
        width="100%"
        height="100%"
        zIndex="-1"
      />
      <Box
        position="absolute"
        bottom={{ base: "0", md: "40px", lg: "80px", xl: "120px" }}
        left={{ base: "0", md: "40px", lg: "80px", xl: "120px" }}
        width={{ base: "calc(100% - 80px)", md: "calc(100% - 160px)", lg: "50%" }}
        color="white"
        zIndex="1"
      >
        <Text fontSize={{ base: "2xl", md: "3xl", lg: "4xl", xl: "5xl" }}>
          Welcome to our website
        </Text>
        <Text fontSize={{ base: "lg", md: "xl", lg: "2xl", xl: "3xl" }} mt={2}>
          Discover amazing features and benefits of our product
        </Text>
      </Box>
    </Box>
  );
};

export default Banner;
