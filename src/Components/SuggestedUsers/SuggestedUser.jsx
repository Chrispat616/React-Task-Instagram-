import { Flex, Button, Avatar, VStack, Spinner, Box } from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";
import useFollowAndUnfollowUser from "../../hooks/useFollowAndUnfollowUser";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user, setUser }) => {
  const { isFollowing, isUpdating, handleFollowUser } =
    useFollowAndUnfollowUser(user.uid);
  const authUser = useAuthStore((state) => state.user);
  const onFollowUser = async () => {
    await handleFollowUser();
    setUser({
      ...user,
      followers: isFollowing
        ? user.followers.filter((follower) => follower.uid !== authUser.uid)
        : [...user.followers, authUser],
    });
  };
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Link to={`${user.username}`}>
        <Flex alignItems={"center"} gap={2}>
          <Avatar src={user.profilePicURL} size={"md"} />
          <VStack spacing={2}>
            <Box fontSize={12} fontWeight={"bold"}>
              {user.fullname}
            </Box>
            <Box fontSize={12} color={"gray.500"} alignSelf={"start"}>
              {user.followers.length} followers
            </Box>
          </VStack>
        </Flex>
      </Link>
      {authUser.uid !== user.uid && (
        <Button
          fontSize={13}
          bg={"transparent"}
          p={0}
          height={"max-content"}
          fontWeight={"medium"}
          color={"blue.400"}
          cursor={"pointer"}
          _hover={{ color: "white" }}
          onClick={onFollowUser}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <Spinner size="xs" />
          ) : isFollowing ? (
            "unfollow"
          ) : (
            "follow"
          )}
        </Button>
      )}
    </Flex>
  );
};
export default SuggestedUser;
