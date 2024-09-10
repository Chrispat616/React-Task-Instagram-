import { Flex, Box, Text } from "@chakra-ui/react"
import { BsBookmark, BsGrid3X3, BsSuitHeart } from "react-icons/bs"
import { ReelsLogo } from "../../assets/constants"

const ProfileTabs = () => {
  return (
    <Flex
    w={"full"}
    justifyContent={"center"}
    gap={{base:4, sm:10}}
    textTransform={"uppercase"}
    fontWeight={"normal"}
    >
      <Flex borderTop={"1px solid white"}  alignItems={"center"} p='3' gap={1} cursor={"pointer"} >
        <Box fontSize={20}>
         <BsGrid3X3/>
        </Box>
        <Text fontSize={12} display={{base: "none", sm: "block"}}>POSTS</Text>
      </Flex>
      <Flex borderTop={"1px solid white"} alignItems={"center"} p='3' gap={1} cursor={"pointer"} >
        <Box fontSize={20}>
         <ReelsLogo/>
        </Box>
        <Text fontSize={12} display={{base: "none", sm: "block"}}>REELS</Text>
      </Flex>
      <Flex borderTop={"1px solid white"} alignItems={"center"} p='3' gap={1} cursor={"pointer"} >
        <Box fontSize={20}>
         <BsBookmark/>
        </Box>
        <Text fontSize={12} display={{base: "none", sm: "block"}}>SAVED</Text>
      </Flex>
      <Flex borderTop={"1px solid white"} alignItems={"center"} p='3' gap={1} cursor={"pointer"} >
        <Box fontSize={20}>
         <BsSuitHeart/>
        </Box>
        <Text fontSize={12} display={{base: "none", sm: "block"}}>LIKED</Text>
      </Flex>
    </Flex>
  )
}
export default ProfileTabs