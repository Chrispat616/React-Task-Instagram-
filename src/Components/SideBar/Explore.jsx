import { Box, Flex, Tooltip } from '@chakra-ui/react'
import { ExploreLogo } from '../../assets/constants'

const Explore = () => {
  return (
    <Tooltip
    hasArrow
    label={"Explore"}
    placement="right"
    ml={1}
    openDelay={500}
    display={{ base: 'block', md: 'none' }}
  >
    <Flex
      alignItems={"center"}
      gap={4}
      _hover={{ bg: "whiteAlpha.400" }}
      borderRadius={6}
      padding={2}
      w={{ base: 10, md: "full" }}
      justifyContent={{ base: "center", md: "flex-start" }}
    >
      <ExploreLogo />
      <Box display={{ base: "none", md: "block" }}>
       Explore
      </Box>
    </Flex>
  </Tooltip>
  );
};

export default Explore;