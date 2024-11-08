import useGetUserPosts from "../../hooks/useGetUserPosts";
import ProfilePost from "./ProfilePost";
import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";

const ProfilePosts = () => {
  const { isLoading, posts } = useGetUserPosts();
  const noPostsFound = !isLoading && posts.length === 0;

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
      </Flex>
    );
  }

  if (noPostsFound) return <NoPostsFound />;

  return (
    <Grid
      templateColumns={{
        sm: "repeat(1, 1fr)",
        md: "repeat(3, 1fr)",
      }}
      gap={1}
      columnGap={1}
    >
      {posts.map((post) => (
        <ProfilePost post={post} key={post.id} />
      ))}
    </Grid>
  );
};

export default ProfilePosts;

const NoPostsFound = () => {
  return (
    <Flex flexDir="column" textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}>No Posts Found</Text>
    </Flex>
  );
};
