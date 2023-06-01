import { Box, Container } from '@chakra-ui/react';
import Profile from '../components/Profile';

const ProfilePage = () => {
  return (
    <Container maxW="container.md" mt={8}>
      <Box>
        <Profile />
      </Box>
    </Container>
  );
};

export default ProfilePage;
