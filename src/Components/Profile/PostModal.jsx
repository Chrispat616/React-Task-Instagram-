import { useEffect } from "react";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Avatar,
  Box,
  Divider,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Image,
} from "@chakra-ui/react";
import { IoMdMore } from "react-icons/io";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Comments from "../Comments/Comments";
import Caption from "../Comments/Caption";
import PostFooter from "../Feedposts/PostFooter";
import usePostStore from "../../store/postStore";

const PostModal = ({
  post,
  isOpen,
  onClose,
  handleEdit,
  handleDeletePost,
  menuVisible,
  setMenuVisible,
  userProfile,
  authUser,
}) => {
  const { fetchComments } = usePostStore();

  useEffect(() => {
    if (isOpen) {
      fetchComments(post.id);
    }
  }, [isOpen, post.id, fetchComments]);

  return (
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
                    src={userProfile.profilePicURL}
                    size={"sm"}
                    name={userProfile.fullname}
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
                style={{ paddingLeft: 25 }}
              >
                {post.caption && <Caption post={post} />}
                {post.comments.map((comment, index) => (
                  <Comments
                    key={comment.id || index}
                    comment={comment}
                    postId={post.id}
                  />
                ))}
              </VStack>
              <Divider my={4} bg={"gray.800"} />
              <PostFooter isProfilePage={true} post={post} />
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostModal;
