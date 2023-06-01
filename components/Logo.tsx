import React from "react";
import { Image, Box } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Box>
      <Image
        src="https://picsum.photos/id/20/150/75"
        alt="Logo"
        boxSize="80px"
        rounded={10000}
      />
    </Box>
  );
};

export default Logo;
