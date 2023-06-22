import React from "react";
import { Container, Box, Button } from "@chakra-ui/react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Accordion from "../components/Accordion";
import Footer from "../components/Footer";
import Games from "../components/Games";
import { createRoom } from "../lib/room-manager";
import RoomComponent from '../components/Create_room';

const Index = () => {
  console.log("in index component");

 

  return (
    <Box>
      <Header />
      <Container maxW="container.xl" px={[4, 6, 10]} py={8}>
        {/* <Banner /> */}
        
        
        <Games />
        <Accordion />
      </Container>
      <Footer />
    </Box>
  );
};

export default Index;
