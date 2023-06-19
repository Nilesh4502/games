import React, { useEffect, useState, memo } from "react";
import { useRouter } from "next/router";
import {
  Flex,
  Box,
  Heading,
  Button,
  Stack,
  IconButton,
  useDisclosure,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { HamburgerIcon } from "@chakra-ui/icons";
import Logo from "./Logo";
import { useSession } from "next-auth/react";
import Dropdown from "./Dropdown";
import Permissions from "../data/ui-permissions.json";

const Header = memo(() => {
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [prevSession, setPrevSession] = useState(session);
  console.log(" in header component session is  ", session , status);

  const handleSignInClick = () => {
    router.push("/signin");
  };
  

  useEffect(() => {
    console.log("in use effect for header component",status , session);
    if (prevSession !== session) {
      setPrevSession(session);
    }
  }, [session,status]);

  return (
    <Box position="sticky" top="0" backgroundColor="white" zIndex="3">
      <Box borderBottom="1px" borderBottomColor="gray.200">
        <Flex justifyContent="space-between" alignItems="center" py={4} px={[4, 6, 10]}>
          <Logo />

          <Box display={{ base: "block", md: "none" }}>
            <IconButton
              variant="ghost"
              icon={<HamburgerIcon />}
              aria-label="Open Menu"
              onClick={onOpen}
            />
          </Box>
         
          <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
        >
          
          {status === "loading" ? (
            console.log("Status is loading"),
            <Spinner size="sm" />
          ) : (status === "unauthenticated" || !session) ? (
            console.log("Session is null or undefined", session, status),
            <>
               
              <Menu>
             <MenuButton as={Button} leftIcon={<ChevronDownIcon />}>
              Actions
             </MenuButton>
             <MenuList>
              <MenuItem onClick={handleSignInClick }>Sign in </MenuItem>
             <MenuItem onClick={()=>{router.push("/Room")}}>Room</MenuItem>
             <MenuItem onClick={()=>{router.push("/data")}}>user entry</MenuItem>
             <MenuItem onClick={()=>{router.push("/Details")}}>user details</MenuItem>
             <MenuItem onClick={()=>{router.push("/Roomcreate")}}>Room create</MenuItem>
             
            </MenuList>
            </Menu>
            
              
              
              
            </>
          ) : (
            console.log("Session is available", session, status),
            <Dropdown options={Permissions.permissions.user} />
          )}
        </Box>
        </Flex>
      </Box>
    </Box>
  );
});

export default Header;
