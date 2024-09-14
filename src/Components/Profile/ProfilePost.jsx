import { useState } from "react"
import { Flex, Box, Image, Avatar, GridItem, Text, useDisclosure, Divider, VStack} from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"
import { Modal, ModalBody, ModalCloseButton,ModalContent,ModalOverlay } from "@chakra-ui/react"
import { IoMdMore } from "react-icons/io";
import { Menu, MenuButton, MenuList, MenuItem, Icon } from "@chakra-ui/react";
import {EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Comments from "../Comments/Comments"
import PostFooter from "../Feedposts/PostFooter"

const ProfilePost = ({img}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const handleEdit = () => { 
    alert("Edit action triggered");
  };
  const handleDelete = () => {
    alert("Delete action triggered");
  };
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
     <GridItem
    cursor={"pointer"}
    borderRadius={4}
    overflow={"hidden"}
    border={"1px solid"}
    borderEndColor={"whiteAlpha.300"}
    position={"relative"}
    aspectRatio={1/1}
    onClick={onOpen}
    >
      <Flex
      opacity={0}
      _hover={{opacity:1}}
      position={"absolute"}
      top={0}
      bottom={0}
      left={0}
      right={0}
      bg={"blackAlpha.700"}
      transition={"all 0.3s ease"}
      zIndex={1}
      justifyContent={"center"}>
        <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
          <Flex>
            <AiFillHeart size={20}/>
            <Text fontWeight={"bold"} ml={2}> 7</Text>
          </Flex>
          <Flex>
            <FaComment size={20}  />
            <Text fontWeight={"bold"} ml={2}> 7</Text>
          </Flex>
        </Flex>
      </Flex>
      <Image src={img} alt='profile post' w={"100%"} h= {"100%"} objectFit={"cover"}/>
     </GridItem>
     <Modal isOpen={isOpen} onClose={onClose}
     isCentered={true}
     size={{base:"3xl", md:"5xl"}}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex gap={4} w={{base:"90%", sm: "70%", md: "full"}} mx={"auto"}>
              <Box 
              borderRadius={4}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"whiteAlpha.300"}
              flex={1.5}>
                 <Image src={img} alt="profile post"/>
              </Box>
              <Flex flex={1} flexDir={"column"} px={10} display={{base:"none", md: "flex"}}>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                  <Avatar src='/pato.png' size={"sm"} name='Legendary Patrix' />
                   <Text fontWeight={"bold"} fontSize={12}> 
                     Pato
                   </Text>
                </Flex>
                <Menu isOpen={menuVisible} onClose={() => setMenuVisible(false)}>
                  <MenuButton
                    as={Box}
                    _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                    borderRadius={4}
                    p={1}
                    onClick={() => setMenuVisible(!menuVisible)}
                  > 
                    <Icon as={IoMdMore} size={50} cursor="pointer" />
                   </MenuButton>
                   <MenuList>
                     <MenuItem icon={<EditIcon />} onClick={handleEdit}>
                     </MenuItem>
                     <MenuItem icon={<DeleteIcon />} onClick={handleDelete}>
                     </MenuItem>
                   </MenuList>
                 </Menu>
                </Flex>
                <Divider my={4} bg={"gray.500"}/>
                <VStack w='full' alignItems={'start'} maxH={"350px"} overflowY={"auto"}>
                  <Comments
                  createdAt='1d ago'
                  username= 'Pato'
                  profilepic='/pato.png'
                  text={"Dummy images from unsplash"}
                  />
                  <Comments
                  createdAt='1d ago'
                  username= 'Emmy'
                  profilepic='/img1.png'
                  text={"Awesome"}
                  />
                  <Comments
                  createdAt='12h ago'
                  username= 'Wells'
                  profilepic='/img2.png'
                  text={"Trailblazing"}
                  />
                  <Comments
                  createdAt='12h ago'
                  username= 'Wells'
                  profilepic='/img2.png'
                  text={"Trailblazing"}
                  />
                  <Comments
                  createdAt='12h ago'
                  username= 'Wells'
                  profilepic='/img2.png'
                  text={"Trailblazing"}
                  />
                  <Comments
                  createdAt='12h ago'
                  username= 'Wells'
                  profilepic='/img2.png'
                  text={"Trailblazing"}
                  />
                  <Comments
                  createdAt='12h ago'
                  username= 'Wells'
                  profilepic='/img2.png'
                  text={"Trailblazing"}
                  />
                  <Comments
                  createdAt='12h ago'
                  username= 'Wells'
                  profilepic='/img2.png'
                  text={"Trailblazing"}
                  />
                </VStack>
                <Divider my={4} bg={"gray.8000"}/>
                <PostFooter isProfilePage={true}/>
              </Flex>
            </Flex>
          </ModalBody >
        </ModalContent>
      </Modal>
    </>
  )
}
export default ProfilePost