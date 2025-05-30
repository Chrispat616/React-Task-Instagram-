import { Tooltip, Link, Box } from "@chakra-ui/react"
import { GoHomeFill } from "react-icons/go";
import { Link as RouterLink} from "react-router-dom"

const Home = () => {
  return (
    <Tooltip
    hasArrow
    label={"Home"}
    placement="right"
    ml={1}
    openDelay={500}
    display={{ base: 'block', md: 'none' }}
  >
    <Link
      display={"flex"}
      to={"/"}
      as={RouterLink}
      alignItems={"center"}
      gap={4}
      _hover={{ bg: "whiteAlpha.400" }}
      borderRadius={6}
      padding={2}
      w={{ base: 10, md: "full" }}
      justifyContent={{ base: "center", md: "flex-start" }}
    >
      <GoHomeFill size={25} />
      <Box display={{ base: "none", md: "block" }}>
       Home
      </Box>
    </Link>
  </Tooltip>
  )
}

export default Home;