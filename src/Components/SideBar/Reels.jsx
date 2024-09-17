import { Box, Flex, Tooltip } from '@chakra-ui/react';
import {ReelsLogo } from '../../assets/constants';

const Reels = () => {
  return (
    <Tooltip
    hasArrow
    label={"Reels"}
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
      <ReelsLogo />
      <Box display={{ base: "none", md: "block" }}>
       Reels
      </Box>
    </Flex>
  </Tooltip>
  );
};

export default Reels;