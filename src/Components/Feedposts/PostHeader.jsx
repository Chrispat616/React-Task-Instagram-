import {
  Flex,
  Text,
  Box,
  Avatar,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const PostHeader = ({ post, creatorProfile, isProfilePage }) => {
  if (!creatorProfile) {
    return (
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        my={4}
        w={"full"}
      >
        <Flex alignItems={"center"} gap={2}>
          <SkeletonCircle size={"xs"} />
          <Skeleton height="10px" width="60px" />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      my={4}
      w={"full"}
    >
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${creatorProfile.username}`}>
          <Avatar
            src={creatorProfile.profilePicURL}
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
                  • {moment(post.createdAt).fromNow()}
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
