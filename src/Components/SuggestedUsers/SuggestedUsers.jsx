import { Flex, VStack,Text, Box } from "@chakra-ui/react"
import SuggestedHeader from "./SuggestedHeader"
import SuggestedUser from "./SuggestedUser"
import { Link } from "react-router-dom"

const SuggestedUsers = () => {
  return (
    <VStack py={8} px={6} gap={4}> 
       <SuggestedHeader/>
       <Flex alignItems={"center"} justifyContent={"space-between"} width={"full"}>
        <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
           Suggested for you
        </Text>
        <Text fontSize={12} fontWeight={"bold"} color={"white"} cursor={'pointer'}>
           See all
        </Text>
       </Flex>
       <SuggestedUser name='Dan Abramov' followers={2587} avatar='https:/bit.ly/dan-abramov'/>
       <SuggestedUser name='Ryan Florence' followers={800} avatar='https:/bit.ly/ryan-florence'/>
       <SuggestedUser name='Christian Nwamba' followers={980} avatar='https:/bit.ly/code-beast'/>
       
       <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
       © 2024 INSTACLONE by {" "}
       <Link href='https://github.com/Chrispat616' target="_blank" color='blue.500' fontSize={14}>
       Chigbogu
       </Link>
       </Box>
    </VStack>
  )
}
export default SuggestedUsers