import React, { useRef, useState } from 'react';
import { Box, Heading, Text, VStack, Avatar, Center, Spacer, Button } from '@chakra-ui/react';
import { useSession, getSession } from 'next-auth/react';
import Header from './Header';
import { updateProfile } from '../lib/firebase-manager'; // Import the updateProfile function from firebase.manager.tsx

const Profile = () => {
  const { data: session, status } = useSession();
  const [imageLoading, setImageLoading] = useState(false);
  const inputFileRef = useRef(null);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      setImageLoading(true);

      try {
        // Call the updateProfile function from firebase.manager.tsx with the file and user ID
       // updateProfile(file, session.user);
      //  const { user } = session;
      // await updateProfile(file, user.uid); // Wait for the profile update to complete

      // const downloadURL = await getDownloadURL(ref(storage, `profile-pictures/${user.uid}`));
      // user.image = downloadURL;
        setImageLoading(false);
        // Refresh the session to fetch updated user data
        await getSession();
      } catch (error) {
        setImageLoading(false);
        console.error('Failed to upload profile image:', error);
      }
    }
  };

  if (status === 'loading') {
    return <Box>Loading...</Box>;
  }

  if (!session) {
    return <Box>You are not logged in.</Box>;
  }

  const { user } = session;

  return (
    <Box>
      <Header />
      <Box
        maxW={{ base: '100%', md: 'container.md' }}
        mx="auto"
        p={{ base: '4', md: '8' }}
      >
        <VStack spacing={4} align="start">
          <Heading as="h1" size="xl" mb={4}>
            Profile
          </Heading>
          <Center>
            {user.image ? (
              <Avatar
                size={{ base: '2xl', md: '3xl' }}
                src={user.image}
              />
            ) : (
              <Avatar
                size={{ base: '2xl', md: '3xl' }}
                name={user.name}
              />
            )}
          </Center>
          <Box>
            <Text fontWeight="bold">Name:</Text>
            <Text>{user.name}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Email:</Text>
            <Text>{user.email}</Text>
          </Box>
          {/* Add UI for image upload */}
          <Box>
            <Text fontWeight="bold">Profile Image:</Text>
            <input
              type="file"
              ref={inputFileRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            {imageLoading ? (
              <Text>Loading...</Text>
            ) : (
              <Button
                size="sm"
                onClick={() => inputFileRef.current.click()}
                disabled={imageLoading}
              >
                Upload
              </Button>
            )}
          </Box>
        </VStack>
        <Spacer />
      </Box>
    </Box>
  );
};

export async function getServerSideProps() {
  // Add logic for fetching initial data for the profile page, if needed
  return {
    props: {},
  };
}

export default Profile;
