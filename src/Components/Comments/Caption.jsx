import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useUserProfileStore from "../../store/userProfileStore";
import { getTimeMs } from "../../utils/getTimeMs";

const Caption = ({ post }) => {
  const userProfile = useUserProfileStore((state) => state.userProfile);

  return (
    <Flex gap={4}>
      <Link to={`/${userProfile.username}`}>
        <Avatar src={userProfile.profilePicURL} size={"sm"} />
      </Link>
      <Flex direction={"column"}>
        <Flex gap={2} alignItems={"center"}>
          <Link to={`/${userProfile.username}`}>
            <Text fontWeight={"bold"} fontSize={12}>
              {userProfile.username}
            </Text>
          </Link>
          <Text fontSize={14}>{post.caption}</Text>
        </Flex>
        <Text fontSize={12} color="gray">
          {" "}
          {post.createdAt ? getTimeMs(post.createdAt.toDate?.() || post.createdAt) : "N/A"}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Caption;
