import React ,{useState,useEffect, useRef }from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
   
  } from '@chakra-ui/react'
  import { useRouter } from "next/router";
  import { getFirestore, collection, getDocs,deleteDoc,doc,updateDoc } from 'firebase/firestore';
  import { db } from '../lib/firebase-manager';
  import { DeleteIcon,EditIcon} from '@chakra-ui/icons'
  import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
  } from '@chakra-ui/react'

  
 


function Details() {
    const [data, setData] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const initialRef = useRef();
    const finalRef = useRef();
    const router=useRouter();
    const [state,setState]=useState({
      name: '',
      email: '',
      contact: '',
    });

    

  useEffect(() => {
    getDataFromFirestore();
  }, []);

  async function getDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, 'userdetails'));
    const newData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(newData);
  }

  async function handleDelete(id) {
    try {
      await deleteDoc(doc(db, 'userdetails', id));
      getDataFromFirestore();
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  }
  const handleEdit = (id) => {
    setEditItem(id);
  };

 function handleInputChange(e) {
  const { name, value } = e.target;
  setState({ ...state, [name]: value });
}
 const handleSave= async ()=>{
  try {
    const docRef = doc(db, 'userdetails', editItem);
    const updatedData = {
      name: state.name,
      email: state.email,
      contact: state.contact
    };
    await updateDoc(docRef, updatedData);
    getDataFromFirestore();
    setEditItem(null);
  } catch (error) {
    console.error('Error updating document: ', error);
  }

 }


      
  return (
    <div>
       <Button
        colorScheme="teal"
        size="lg"
        marginTop="20px"
        marginLeft="auto"
        marginRight="auto"
        display="block"
        onClick={() => router.push("/")}
      >
        HOME
      </Button>
      <TableContainer
        marginTop="20px"
        marginLeft="auto"
        marginRight="auto"
        maxW="800px"
        width="95%"
      >
    <Table variant='striped' colorScheme='teal'>
      <TableCaption>User Details</TableCaption>
      <Thead>
        <Tr>
          <Th>UUID</Th>
          <Th>NAME</Th>
          <Th >EMAIL</Th>
          <Th>CONTACT</Th>
          <Th>Edit</Th>
          <Th>Delete</Th>
        </Tr>
      </Thead>
      {data.map((item) => (<Tbody>
        <Tr key={item.uuid}>
          <Td>{item.uuid}</Td>
         <Td>{item.name}</Td>
          <Td >{item.email}</Td>
          <Td>{item.contact}</Td>
          <Td><EditIcon onClick={()=>handleEdit(item.id)} /></Td>
          <Td><DeleteIcon onClick={() => handleDelete(item.id)} /></Td>
        </Tr>
        
      </Tbody> ))}
   
    </Table>
    </TableContainer>
  <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={editItem !== null}
        onClose={() => setEditItem(null)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
         <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={state.name}
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
              value={state.email}
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
              value={state.contact}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={() => setEditItem(null)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
 </div>
  )
}

export default Details