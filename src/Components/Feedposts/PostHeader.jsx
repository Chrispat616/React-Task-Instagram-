import { Flex, Box, Avatar } from "@chakra-ui/react"

const PostHeader = ({username, avatar}) => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} my={4} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={avatar} alt="User Profile pic" size={"xs"}/>
        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
        {username}
         <Box color={"grey"}>
         • 1w
         </Box>
        </Flex>
      </Flex>
      <Box>
          
      </Box>
    </Flex>
  )
}
export default PostHeader