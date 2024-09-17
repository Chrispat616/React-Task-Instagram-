import {  Box, Flex, Link} from "@chakra-ui/react"
import {Link as RouterLink} from "react-router-dom"; 
import { InstagramLogo,
     InstagramMobileLogo, 
} from "../../assets/constants";
import SidarBarItems from "./SidarBarItems";

const SideBar = () => {
    return (
      <Box
        h={"100vh"} 
        borderRight={"1px solid"}  
        borderColor={"whiteAlpha.300"}
        py={8}
        position={"sticky"}
        top={0}
        left={0}
        px={{ base: 2, md: 4 }}
      >
        <Flex direction={"column"} gap={10} w="full" h={"full"}>
          <Link to={"/"} as={RouterLink} pl={2} display={{ base: "none", md: "block" }} cursor="pointer">
            <InstagramLogo />
          </Link>
          <Link
            to={"/"}
            as={RouterLink}
            p={2}
            display={{ base: "block", md: "none" }}
            borderRadius={6}
            _hover={{ bg: "whiteAlpha.200" }}
            width={10}
            cursor="pointer"
          >
            <InstagramMobileLogo />
          </Link>
          <Flex direction={"column"} gap={5} cursor={"pointer"}>
            <SidarBarItems/>
          </Flex>
        </Flex>
      </Box>
    );
  };
  
  export default SideBar;