import { useState } from "react";
import {
  Flex,
  Box,
  Image,
  Avatar,
  GridItem,
  Text,
  useDisclosure,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { IoMdMore } from "react-icons/io";
import { Menu, MenuButton, MenuList, MenuItem, Icon } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Comments from "../Comments/Comments";
import PostFooter from "../Feedposts/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { deleteObject, ref } from "firebase/storage";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import usePostStore from "../../store/postStore";

const ProfilePost = ({ post }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const handleEdit = () => {
    alert("Edit action triggered");
  };
  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;
    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, "users", authUser.uid);
      await deleteDoc(doc(firestore, "posts", post.id));
      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });
      deletePost(post.id);
      decrementPostsCount(post.id);
      showToast("Success", "Post deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderEndColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          bottom={0}
          left={0}
          right={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {" "}
                {post.likes.length}
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {" "}
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={post.imageURL}
          alt="profile post"
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />
      </GridItem>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex
              gap={4}
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={post.imageURL} alt="profile post" />
              </Flex>
              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar
                      src={userProfile.ProfilePicURL}
                      size={"sm"}
                      name="Doe"
                    />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  </Flex>
                  {authUser?.uid === userProfile.uid && (
                    <Menu
                      isOpen={menuVisible}
                      onClose={() => setMenuVisible(false)}
                    >
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
                        <MenuItem
                          icon={<EditIcon />}
                          onClick={handleEdit}
                        ></MenuItem>
                        <MenuItem
                          icon={<DeleteIcon />}
                          onClick={handleDeletePost}
                          isLoading={isDeleting}
                        ></MenuItem>
                      </MenuList>
                    </Menu>
                  )}
                </Flex>
                <Divider my={4} bg={"gray.500"} />
                <VStack
                  w="full"
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  <Comments
                    createdAt="1d ago"
                    username="Pato"
                    profilepic="/pato.png"
                    text={"Dummy images from unsplash"}
                  />
                  <Comments
                    createdAt="1d ago"
                    username="Emmy"
                    profilepic="/img1.png"
                    text={"Awesome"}
                  />
                </VStack>
                <Divider my={4} bg={"gray.8000"} />
                <PostFooter isProfilePage={true} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ProfilePost;
