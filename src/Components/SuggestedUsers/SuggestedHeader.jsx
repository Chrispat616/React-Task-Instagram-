import { Avatar,Link, Flex,Text} from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

const SuggestedHeader = () => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2} cursor={"pointer"}  _hover={{ bg: "whiteAlpha.200" }} >
        <Avatar name="Pato" size={'sm'} src="/pato.png" />
        <Text fontSize={12} fontWeight={"bold"}>
          Pato
        </Text>
      </Flex>
      <Link as={RouterLink}
      to={"/auth"}
      fontSize={14}
      fontWeight={"medium"}
      color={"blue.500"}
      cursor={"pointer"}
      style={{textDecoration: "none"}}
      >
        Log out
      </Link>
    </Flex>
  )
}
export default SuggestedHeader