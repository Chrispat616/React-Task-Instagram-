import { Box, Flex, Tooltip } from '@chakra-ui/react';
import {MenuLogo } from '../../assets/constants';

const Menu = () => {
  return (
    <Tooltip
    hasArrow
    label={"Menu"}
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
      <MenuLogo />
      <Box display={{ base: "none", md: "block" }}>
       Menu
      </Box>
    </Flex>
  </Tooltip>
  );
};

export default Menu;