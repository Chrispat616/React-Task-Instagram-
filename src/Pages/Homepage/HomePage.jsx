import { Container, Flex, Box, VStack} from "@chakra-ui/react";
import FeedPosts from "../../Components/Feedposts/FeedPosts";
import UpperBar from "../../Components/UpperBar/Upperbar";
import SuggestedUsers from "../../Components/SuggestedUsers/SuggestedUsers";

const HomePage = () => {
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        <Box flex={2} py={10}>
          <VStack>
            <Flex gap={5} 
            justifyContent="flex-start" alignItems="center"  w="100%"
             cursor={"pointer"} >
            <Box _hover={{ bg: "whiteAlpha.200" }} >For You</Box>
            <Box color={"grey"} _hover={{ bg: "whiteAlpha.200" }}>Following</Box>
            </Flex>
            <Box justifyContent="flex-start" alignItems="center"  w="100%">
             <UpperBar />
         </Box>
          <FeedPosts/>
          </VStack>
        </Box>
        <Box flex={3} mr={20} display={{ base: "none", lg: "block"}} maxW={"300px"} >
          <SuggestedUsers/>
        </Box >  
      </Flex>
    </Container>
  )
}
export default HomePage