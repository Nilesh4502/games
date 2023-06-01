import React from "react";
import {
  Box,
  Container,
  Flex,
  Link,
  Spacer,
  Heading,
  Image,
} from "@chakra-ui/react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <Box backgroundColor="gray.800" color="white" py={8}>
      <Container maxWidth="container.xl">
        <Flex flexWrap="wrap">
          <Box>
            <Logo />
          </Box>
          <Box flexGrow={1} textAlign="center">
            <Heading size="md" mb={4}>
              Column 1
            </Heading>
            <Link href="#">Link 1</Link>
            <br />
            <Link href="#">Link 2</Link>
            <br />
            <Link href="#">Link 3</Link>
            <br />
            <Link href="#">Link 4</Link>
          </Box>
          <Box flexGrow={1} textAlign="center">
            <Heading size="md" mb={4}>
              Column 2
            </Heading>
            <Link href="#">Link 5</Link>
            <br />
            <Link href="#">Link 6</Link>
            <br />
            <Link href="#">Link 7</Link>
            <br />
            <Link href="#">Link 8</Link>
          </Box>
          <Box flexGrow={1} textAlign="center">
            <Heading size="md" mb={4}>
              Column 3
            </Heading>
            <Link href="#">Link 9</Link>
            <br />
            <Link href="#">Link 10</Link>
            <br />
            <Link href="#">Link 11</Link>
            <br />
            <Link href="#">Link 12</Link>
          </Box>
          <Box flexGrow={1} textAlign="center">
            <Heading size="md" mb={4}>
              Column 4
            </Heading>
            <Link href="#">Link 13</Link>
            <br />
            <Link href="#">Link 14</Link>
            <br />
            <Link href="#">Link 15</Link>
            <br />
            <Link href="#">Link 16</Link>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
