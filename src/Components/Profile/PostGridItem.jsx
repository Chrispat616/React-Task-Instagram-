import { Flex, GridItem, Image, Text } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import usePostStore from "../../store/postStore";
import { useEffect } from "react";

const PostGridItem = ({ post, onOpen }) => {
  const { fetchComments } = usePostStore();
  useEffect(() => {
    if (onOpen) {
      fetchComments(post.id);
    }
  }, [onOpen, post.id, fetchComments]);

  return (
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
              {post.likes.length}
            </Text>
          </Flex>
          <Flex>
            <FaComment size={20} />
            <Text fontWeight={"bold"} ml={2}>
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
  );
};

export default PostGridItem;
