import { useState } from "react";
import { Avatar, Flex, Skeleton, SkeletonCircle, Text, Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useGetUserProfilebyId from "../../hooks/useGetUserProfilebyId";
import { getTimeMs } from "../../utils/getTimeMs";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";

const Comments = ({ comment, allComments = [] }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const authUser = useAuthStore((state) => state.user);
  const { userProfile, isLoading } = useGetUserProfilebyId(comment.createdBy);
  const { handlePostComment, handleDeleteComment } = usePostComment();

  if (isLoading) return <CommentSkeleton />;

  const replies = allComments.filter((reply) => reply.parentId === comment.commentId);

  const handleReplySubmit = () => {
    handlePostComment(comment.postId, replyText, comment.commentId);
    setReplyText("");
    setShowReplyBox(false);
  };
  const handleDelete = () => {
    handleDeleteComment(comment.commentId, comment.postId);
  };

  return (
    <Flex direction="column" gap={2} ml={comment.parentId ? 8 : 0}>
      <Flex gap={4}>
        <Link to={`/${userProfile.username}`}>
          <Avatar src={userProfile.profilePicURL || "./avatar-boy.svg"} size="sm" />
        </Link>
        <Flex direction="column">
          <Flex gap={2} alignItems="center">
            <Text fontWeight="bold" fontSize={12}>
              {userProfile.username}
            </Text>
            <Text fontSize={14}>{comment.comment}</Text>
          </Flex>

          <Flex gap={2}>
            <Text fontSize={12} color="gray" mt={0.5}>
              {" "}
              {comment.createdAt
                ? getTimeMs(comment.createdAt.toDate?.() || comment.createdAt)
                : "N/A"}
            </Text>
            <Button
              size="xs"
              p={1}
              w={9}
              fontSize={"small"}
              color={"grey"}
              onClick={() => setShowReplyBox(!showReplyBox)}
            >
              Reply
            </Button>
            {authUser?.uid === comment.createdBy && (
              <Button
                size="xs"
                p={1}
                w={9}
                fontSize={"small"}
                color={"grey"}
                onClick={() => handleDelete(comment.commentId)}
              >
                Delete
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>

      {showReplyBox && (
        <Box ml={8}>
          <Box
            p={2}
            w="full"
            border="1px solid"
            borderColor="gray.300"
            borderRadius={4}
            _focusWithin={{
              borderColor: "blue.500",
            }}
          >
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              style={{ border: "none", outline: "none", width: "100%" }}
            />
          </Box>
          <Button size="xs" onClick={handleReplySubmit}>
            Submit
          </Button>
        </Box>
      )}

      {replies.length > 0 && (
        <Box mt={4} ml={4}>
          {replies.map((reply) => (
            <Comments key={reply.parentId} comment={reply} allComments={allComments} />
          ))}
        </Box>
      )}
    </Flex>
  );
};

export default Comments;

const CommentSkeleton = () => (
  <Flex gap={4} w="full" alignItems="center">
    <SkeletonCircle h={10} w="10" />
    <Flex gap={1} flexDir="column">
      <Skeleton height={2} width={100} />
      <Skeleton height={2} width={50} />
    </Flex>
  </Flex>
);
