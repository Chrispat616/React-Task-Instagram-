import { useEffect, useRef, useState } from "react";
import {
  Flex,
  Box,
  Text,
  InputRightElement,
  InputGroup,
  Button,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

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
import moment from "moment/moment";
import CommentsModal from "../Modals/CommentsModal";
import usePostStore from "../../store/postStore";

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
  const { fetchComments } = usePostStore();
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const authUser = useAuthStore((state) => state.user);
  const commentRef = useRef();
  const { handleLikePost, isLiked, likes } = useLikePosts(post);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    {
      fetchComments(post.id);
    }
  }, [post.id, fetchComments]);

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

        {isProfilePage && (
          <Text fontSize={12} color={"gray"}>
            {moment(post.createdAt).fromNow()}
          </Text>
        )}
        {!isProfilePage && (
          <>
            <Text fontSize={"sm"} fontWeight={700}>
              {creatorProfile?.username}
              {"   "}
              <Text as="span" fontWeight={400}>
                {post.caption}
              </Text>
            </Text>
            {post.comments.length > 0 && (
              <Text
                fontSize={"small"}
                color={"grey"}
                cursor={"pointer"}
                onClick={onOpen}
              >
                View all {post.comments.length} comments
              </Text>
            )}
            {isOpen ? (
              <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />
            ) : null}
          </>
        )}
        {authUser && (
          <Flex
            alignItems={"center"}
            gap={2}
            justifyContent={"space-between"}
            w={"full"}
          >
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
          </Flex>
        )}
      </Box>
    </>
  );
};
export default PostFooter;
