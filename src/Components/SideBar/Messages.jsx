import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MessagesLogo } from "../../assets/constants";

const Messages = () => {
  const Navigate = useNavigate();
  const handleNavigation = () => {
    Navigate("/ChatPage");
  };
  return (
    <Tooltip
      hasArrow
      label={"Messages"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Flex
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        padding={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
        onClick={handleNavigation}
      >
        <MessagesLogo />
        <Box display={{ base: "none", md: "block" }}>Messages</Box>
      </Flex>
    </Tooltip>
  );
};

export default Messages;
