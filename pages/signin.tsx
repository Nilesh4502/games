import { Flex, VStack, Heading, Input, InputGroup, InputLeftElement, Button, IconButton, useColorModeValue } from '@chakra-ui/react';
import { EmailIcon, LockIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect } from 'react';
import {
    useSession,
    signIn,
    signOut
} from 'next-auth/react'



export default function Signin() {
    const router = useRouter();
    const {
        data: session
    } = useSession();
    console.log("signin session data from usesession hook", session);

    const handleSignIn = async(e: React.MouseEvent<HTMLButtonElement>) => {
        try {
        console.log("sign in the user ");
      //  await signIn();
        await signIn(undefined, { callbackUrl: '/dashboard' })
        console.log('New route:', router.pathname);
    }catch(error){

        console.log('error in catch:', error);

    }

    };
    const handleSignOut = async(e: React.MouseEvent<HTMLButtonElement>) => {
        //    e.preventDefault();
        console.log("sign OUT  the user ");
        const data = await signOut({redirect: false, callbackUrl: "/"})
        router.push(data.url)


    };
 /*   useEffect(() => {
        if (session) {
          router.push('/dashboard');
        } else {
          router.push('/signin');
        }
      }, [session]);
      */

    const bg = useColorModeValue('white', 'gray.700');
    const color = useColorModeValue('gray.800', 'white');

    return (
        <Flex minHeight="100vh" width="full" alignItems="center" justifyContent="center" bg={bg}>
            <VStack spacing={4} w="full" maxW="400px" px={4}>
                <Heading textAlign="center" size="lg" color={color}>Sign in</Heading>

                <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<EmailIcon color="gray.300" />} />
                    <Input type="email" placeholder="Email address" />
                </InputGroup>

                <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<LockIcon color="gray.300" />} />
                    <Input type="password" placeholder="Password" />
                </InputGroup>

                <Button rightIcon={<ArrowForwardIcon />} colorScheme="purple" variant="solid">
                    Sign in
                </Button>
                {/*  social sign*/}
                {!session ? <Button  leftIcon={<EmailIcon />} colorScheme="blue" variant="outline" size="sm" onClick={handleSignIn}>
                    Sign in with Social Media
                </Button>
                    :
                    <Button  leftIcon={<EmailIcon />} colorScheme="blue" variant="outline" size="sm" onClick={handleSignOut}>
                        Sign Out
                    </Button>}

            </VStack>
        </Flex>
    );
}
