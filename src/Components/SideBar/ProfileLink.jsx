import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { Avatar, Box, Link, Tooltip } from "@chakra-ui/react";

const ProfileLink = () => {
  const authUser = useAuthStore((state) => state.user);

  return (
    <Tooltip
      hasArrow
      label={"Profile"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Link
        display={"flex"}
        as={RouterLink}
        to={`${authUser.username}`}
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        padding={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <Avatar size={"sm"} src={authUser?.profilePicURL || "./avatar-boy.svg"} />
        <Box display={{ base: "none", md: "block" }}>Profile</Box>
      </Link>
    </Tooltip>
  );
};

export default ProfileLink;
