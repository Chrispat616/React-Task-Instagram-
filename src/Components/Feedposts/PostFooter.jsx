import {
  Flex,
  Box,
  Text,
  InputRightElement,
  InputGroup,
  Button,
  Input,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
  MessagesLogo,
  BookMarkLogo,
} from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePosts from "../../hooks/useLikePosts";

const PostFooter = ({ post, username, isProfilePage }) => {
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const authUser = useAuthStore((state) => state.user);
  const commentRef = useRef(null);
  const { handleLikePost, isLiked, likes } = useLikePosts(post);

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };

  return (
    <>
      <Box mb={8} marginTop={"auto"}>
        <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mt={"2"}>
          <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
            {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
          </Box>
          <Box
            cursor={"pointer"}
            fontSize={18}
            onClick={() => commentRef.current.focus()}
          >
            <CommentLogo />
          </Box>
          <Box cursor={"pointer"} fontSize={18}>
            <MessagesLogo />
          </Box>
          <Box cursor={"pointer"} ml={"auto"}>
            <BookMarkLogo />
          </Box>
        </Flex>
        <Text fontWeight={600} fontSize={"sm"}>
          {likes} likes
        </Text>
        {!isProfilePage && (
          <>
            <Text fontSize={"sm"} fontWeight={700}>
              {username}
              {"   "}
              <Text as="span" fontWeight={400}>
                We just getting started
              </Text>
            </Text>
            <Text fontSize={"small"} color={"grey"} cursor={"pointer"}>
              View all 1,500 comments
            </Text>
          </>
        )}
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
        >
          {authUser && (
            <InputGroup>
              <Input
                variant={"flushed"}
                placeholder={"Add a comment..."}
                fontSize={14}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                ref={commentRef}
              />
              <InputRightElement>
                {comment && (
                  <Button
                    fontSize={14}
                    color={"grey"}
                    fontWeight={600}
                    cursor={"pointer"}
                    _hidden={true}
                    _hover={{ color: "white" }}
                    bg={"transparent"}
                    onClick={handleSubmitComment}
                    isLoading={isCommenting}
                  >
                    Post
                  </Button>
                )}
              </InputRightElement>
            </InputGroup>
          )}
        </Flex>
      </Box>
    </>
  );
};
export default PostFooter;
