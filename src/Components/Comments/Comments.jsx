import { useState } from "react";
import {
  Avatar,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useGetUserProfilebyId from "../../hooks/useGetUserProfilebyId";
import moment from "moment";
import usePostComment from "../../hooks/usePostComment";

const Comments = ({ comment, allComments = [] }) => {
  const { userProfile, isLoading } = useGetUserProfilebyId(comment.createdBy);
  const { handlePostComment } = usePostComment();
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);

  if (isLoading) return <CommentSkeleton />;

  const replies = allComments.filter(
    (reply) => reply.parentId === comment.commentId
  );

  const handleReplySubmit = () => {
    handlePostComment(comment.postId, replyText, comment.commentId);
    setReplyText("");
    setShowReplyBox(false);
  };

  return (
    <Flex direction="column" gap={2} ml={comment.parentId ? 8 : 0}>
      <Flex gap={4}>
        <Link to={`/${userProfile.username}`}>
          <Avatar src={userProfile.profilePicURL} size="sm" />
        </Link>
        <Flex direction="column">
          <Flex gap={2} alignItems="center">
            <Text fontWeight="bold" fontSize={12}>
              {userProfile.username}
            </Text>
            <Text fontSize={14}>{comment.comment}</Text>
          </Flex>
          <Text fontSize={12} color="gray">
            {moment(comment.createdAt).fromNow()}
          </Text>
          <Button size="xs" onClick={() => setShowReplyBox(!showReplyBox)}>
            Reply
          </Button>
        </Flex>
      </Flex>

      {showReplyBox && (
        <Box ml={8}>
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <Button size="xs" onClick={handleReplySubmit}>
            Submit
          </Button>
        </Box>
      )}

      {replies.map((reply) => (
        <Comments
          key={reply.commentId}
          comment={reply}
          allComments={allComments}
        />
      ))}
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
