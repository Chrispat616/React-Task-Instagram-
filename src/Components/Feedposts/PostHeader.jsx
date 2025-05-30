import { Link } from "react-router-dom";
import { Flex, Text, Box, Avatar, SkeletonCircle, Skeleton } from "@chakra-ui/react";
import { getTimeMs } from "../../utils/getTimeMs";

const PostHeader = ({ post, creatorProfile, isProfilePage }) => {
  if (!creatorProfile) {
    return (
      <Flex justifyContent={"space-between"} alignItems={"center"} my={4} w={"full"}>
        <Flex alignItems={"center"} gap={2}>
          <SkeletonCircle size={"xs"} />
          <Skeleton height="10px" width="60px" />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} my={4} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${creatorProfile.username}`}>
          <Avatar
            src={creatorProfile.profilePicURL || "./avatar-boy.svg"}
            alt="User Profile pic"
            size={"xs"}
          />
        </Link>
        <Link to={`${creatorProfile.username}`}>
          <Flex fontSize={12} fontWeight={"bold"} gap={2}>
            {creatorProfile.username}
            {!isProfilePage && (
              <Box color={"grey"}>
                <Text fontSize={12} color={"gray"}>
                  •{" "}
                  {post.createdAt ? getTimeMs(post.createdAt.toDate?.() || post.createdAt) : "N/A"}
                </Text>
              </Box>
            )}
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};

export default PostHeader;
