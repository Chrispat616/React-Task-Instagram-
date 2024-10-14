import {
  Avatar,
  Text,
  AvatarGroup,
  Flex,
  VStack,
  Button,
} from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useFollowAndUnfollowUser from "../../hooks/useFollowAndUnfollowUser";

const ProfileHeader = () => {
  const { userProfile } = useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const { isFollowing, isUpdating, handleFollowUser } =
    useFollowAndUnfollowUser(userProfile.uid);

  const isAuthenticated = !!authUser;
  const isOwnProfile =
    isAuthenticated && authUser.username === userProfile?.username;
  const isAnotherProfile =
    isAuthenticated && authUser.username !== userProfile?.username;

  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
    >
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        justifySelf={"center"}
        alignSelf={"flex-start"}
        mx={"auto"}
      >
        <Avatar src={userProfile.profilePicURL} alt="User profile picture" />
      </AvatarGroup>
      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          w={"full"}
        >
          <Text fontSize={{ base: "small", md: "large" }}>
            {userProfile.username}
          </Text>

          {isOwnProfile && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                bg={"dimgray"}
                color={"white"}
                _hover={{ bg: "gray" }}
                size={{ base: "xs", md: "sm" }}
              >
                Edit Profile
              </Button>
              <Button
                bg={"dimgray"}
                color={"white"}
                _hover={{ bg: "gray" }}
                size={{ base: "xs", md: "sm" }}
              >
                View Archive
              </Button>
            </Flex>
          )}

          {isAnotherProfile && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                bg={"blue.600"}
                color={"white"}
                _hover={{ bg: "gray" }}
                size={{ base: "xs", md: "sm" }}
                onClick={handleFollowUser}
                isLoading={isUpdating}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </Flex>
          )}
        </Flex>

        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text>
            <Text as="span" fontWeight={"medium"} mr={1}>
              {userProfile.posts.length}
            </Text>
            Posts
          </Text>
          <Text>
            <Text as="span" fontWeight={"medium"} mr={1}>
              {userProfile.following.length}
            </Text>
            Following
          </Text>
          <Text>
            <Text as="span" fontWeight={"medium"} mr={1}>
              {userProfile.followers.length}
            </Text>
            Followers
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {userProfile.fullname}
          </Text>
        </Flex>
        <Text fontSize={"sm"}>{userProfile.bio}</Text>
      </VStack>
    </Flex>
  );
};

export default ProfileHeader;
