import React, { useState } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { getDatabase } from 'firebase/database';
import { collection, addDoc } from "firebase/firestore";
import { ref, set } from 'firebase/database';
import fireDb,{db}from '../lib/firebase-manager';
import { useRouter } from 'next/router';
import { Box, Button, useToast,FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';

const initializeState = {
  uuid: '',
  name: '',
  email: '',
  contact: ''
};

function Data() {
  const { data: session } = useSession();
  const router = useRouter();
  const [state, setState] = useState(initializeState);

  const { uuid, name, email, contact } = state;
  const toast = useToast();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !contact) {
      alert('Please provide a value in each field.');
    } else {
      try {
        const docRef = await addDoc(collection(db, "userdetails"), {
          uuid: state.uuid,
          name: state.name,
          email: state.email,
          contact: state.contact
        });

        console.log('Document created with ID:', docRef.id);

        toast({
          title: 'File Added',
          description: 'The file was successfully uploaded.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        setTimeout(() => router.push('/'), 500);
      } catch (error) {
        console.error('Error creating document:', error); toast({
          title: 'Error',
          description: 'An error occurred while uploading the file.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }


  return (
    <Box maxW="md" mx="auto" mt={8} p={4}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="uuid">UUID</FormLabel>
            <Input
              type="text"
              id="uuid"
              name="uuid"
              value={uuid}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="contact">Contact</FormLabel>
            <Input
              type="tel"
              id="contact"
              name="contact"
              value={contact}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default Data;
