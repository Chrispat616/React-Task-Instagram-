import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { ExploreLogo } from "../../assets/constants";
import useShowToast from "../../hooks/useShowToast";

const Explore = () => {
  const showToast = useShowToast();
  return (
    <Flex
      alignItems={"center"}
      gap={4}
      _hover={{ bg: "whiteAlpha.400" }}
      borderRadius={6}
      padding={2}
      w={{ base: 10, md: "full" }}
      justifyContent={{ base: "center", md: "flex-start" }}
      onClick={() => showToast("Coming soon...", "", "info")}
    >
      <ExploreLogo />
      <Box display={{ base: "none", md: "block" }}>Explore</Box>
    </Flex>
  );
};

export default Explore;
