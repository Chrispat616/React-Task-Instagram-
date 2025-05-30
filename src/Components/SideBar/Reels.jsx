import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { ReelsLogo } from "../../assets/constants";
import useShowToast from "../../hooks/useShowToast";

const Reels = () => {
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
      <ReelsLogo />
      <Box display={{ base: "none", md: "block" }}>Reels</Box>
    </Flex>
  );
};

export default Reels;
