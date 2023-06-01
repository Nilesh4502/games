import { useSession, signIn, signOut } from "next-auth/react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Spacer,
} from "@chakra-ui/react";

const Header = () => {
  const { data: session } = useSession();
  console.log("in header component",session);


  const handleSignInClick = () => {
    signIn();
  };

  const handleSignOutClick = () => {
    signOut();
  };

  return (
    <Box bg="gray.100" py={4}>
      <Flex maxW="container.lg" mx="auto" alignItems="center">
        <Heading size="lg">My App</Heading>
        <Spacer />
        {session ? (
          <Button colorScheme="teal" onClick={handleSignOutClick}>
            Sign Out
          </Button>
        ) : (
          <Button colorScheme="teal" onClick={handleSignInClick}>
            Sign In
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
