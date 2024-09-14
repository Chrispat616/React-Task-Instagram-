import { Avatar, Flex,Text, Button} from "@chakra-ui/react"
import useLogout from "../../hooks/useLogout"
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const SuggestedHeader = () => {
  const {handleLogout, isLoggingOut} = useLogout()
  const authUser= useAuthStore((state)=>state.user)
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2} cursor={"pointer"}  _hover={{ bg: "whiteAlpha.200" }} >
        <Link to={`${authUser.username}`}>
        <Avatar size={'sm'} src={authUser.profilePicURL} />
        </Link>
        <Link to={`${authUser.username}`}>
        <Text fontSize={12} fontWeight={"bold"}>
         {authUser.username}
        </Text>
        </Link>
      </Flex>
      <Flex
      onClick={handleLogout}
      >
        <Button 
      fontSize={14}
      fontWeight={"medium"}
      color={"blue.500"}
      cursor={"pointer"}
      style={{textDecoration: "none"}} 
        isLoading={isLoggingOut}>Logout</Button>
      </Flex>
    </Flex>
  );
};
export default SuggestedHeader;