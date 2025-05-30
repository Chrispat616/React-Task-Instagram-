import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { ThreadsLogo } from "../../assets/constants";
import { MdOpenInNew } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";
import useShowToast from "../../hooks/useShowToast";

const Threads = () => {
  const showToast = useShowToast();

  return (
    <Flex
      alignItems={"center"}
      gap={4}
      _hover={{ bg: "whiteAlpha.400" }}
      borderRadius={6}
      padding={2}
      mt={10}
      w={{ base: 10, md: "full" }}
      justifyContent={{ base: "center", md: "flex-start" }}
      role="group"
      position="relative"
      onClick={() => showToast("Coming soon...", "", "info")}
    >
      <ThreadsLogo />
      <Flex alignItems="center" display="flex">
        Threads
        <Box
          as={RouterLink}
          to="/new-tab"
          display="none"
          _groupHover={{ display: "inline-flex" }}
          ml={20}
          alignItems="center"
        >
          <MdOpenInNew />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Threads;
