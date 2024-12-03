import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();

  let content;

  if (isLoading) {
    content = [0, 1, 2].map((_, idx) => (
      <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
        <Flex gap={2}>
          <SkeletonCircle size="10" />
          <VStack gap={2} alignItems={"flex-start"}>
            <Skeleton height="10px" w={"200px"} />
            <Skeleton height="10px" w={"200px"} />
          </VStack>
        </Flex>
        <Skeleton w={"full"}>
          <Box h={"400px"}>contents wrapped</Box>
        </Skeleton>
      </VStack>
    ));
  } else {
    const totalPosts = posts.length;
    if (totalPosts > 0) {
      content = posts.map((post) => <FeedPost key={post.id} post={post} />);
    } else {
      content = (
        <>
          <Text>Ooops!, Looks like you don&apos;t have any friends.</Text>
          <Text>Go out, and make friends!!</Text>
        </>
      );
    }
  }

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {content}
    </Container>
  );
};

export default FeedPosts;
