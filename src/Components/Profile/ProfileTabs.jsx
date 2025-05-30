import { useState } from "react";
import { Flex, Box, Text, Fade } from "@chakra-ui/react";
import { IoMdFunnel } from "react-icons/io";
import { BsBookmark, BsGrid3X3, BsSuitHeart } from "react-icons/bs";
import { ReelsLogo } from "../../assets/constants";
import useShowToast from "../../hooks/useShowToast";
import ProfilePosts from "./ProfilePosts";
import Overview from "../Overview/Overview";

const ProfileTabs = () => {
  const [selectedTab, setSelectedTab] = useState("posts");
  const showToast = useShowToast();

  return (
    <>
      <Flex
        w={"full"}
        justifyContent={"center"}
        gap={{ base: 4, sm: 10 }}
        textTransform={"uppercase"}
        fontWeight={"normal"}
      >
        <TabItem icon={<BsGrid3X3 />} label="POSTS" onClick={() => setSelectedTab("posts")} />
        <TabItem
          icon={<ReelsLogo />}
          label="REELS"
          onClick={() => showToast("Feature coming soon...", "", "info")}
        />
        <TabItem
          icon={<BsBookmark />}
          label="SAVED"
          onClick={() => showToast("Feature coming soon...", "", "info")}
        />
        <TabItem
          icon={<BsSuitHeart />}
          label="LIKED"
          onClick={() => showToast("Feature coming soon...", "", "info")}
        />
        <TabItem
          icon={<IoMdFunnel />}
          label="STATISTICS"
          onClick={() => setSelectedTab("statistics")}
        />
      </Flex>
      {selectedTab === "posts" && <ProfilePosts />}
      <Flex
        justifyContent="center"
        alignItems="center"
        w="full"
        h="full"
        mt={8}
        style={{ display: selectedTab === "statistics" ? "flex" : "none" }}
      >
        {selectedTab === "statistics" && <Overview />}
      </Flex>
    </>
  );
};

const TabItem = ({ icon, label, onClick }) => (
  <Flex
    borderTop={"1px solid white"}
    alignItems={"center"}
    p="3"
    gap={1}
    cursor={"pointer"}
    onClick={onClick}
  >
    <Box fontSize={20}>{icon}</Box>
    <Text fontSize={12} display={{ base: "none", sm: "block" }}>
      {label}
    </Text>
  </Flex>
);

export default ProfileTabs;
