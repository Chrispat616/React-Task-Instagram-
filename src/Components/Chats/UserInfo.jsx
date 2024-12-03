import { useEffect } from "react";
import { Avatar, Flex, Image, Text } from "@chakra-ui/react";
import useUserStore from "../../store/userStore";
import { getAuth } from "firebase/auth";

const UserInfo = () => {
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo);
  const currentUser = useUserStore((state) => state.currentUser);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserInfo(user.uid);
      } else {
        console.log("No user logged in");
        fetchUserInfo(null);
      }
    });

    return () => unsubscribe();
  }, [fetchUserInfo]);

  return (
    <>
      <Flex
        className="userInfo"
        p="20px"
        alignItems="center"
        justifyContent="space-between"
      >
        {currentUser ? (
          <Flex className="user" alignItems="center" gap="20px">
            <Avatar
              src={currentUser.avatar || "./avatar.png"}
              alt="User Avatar"
              width="50px"
              height="50px"
              borderRadius="50%"
              objectFit="cover"
            />
            <Text>{currentUser.username}</Text>
          </Flex>
        ) : (
          <Text color="gray.500">No user data available</Text>
        )}
        <Flex className="icons" gap="20px">
          <Image
            src="./more.png"
            alt="More Options"
            width="20px"
            height="20px"
            cursor="pointer"
          />
          <Image
            src="./cam.png"
            alt="Video Options"
            width="20px"
            height="20px"
            cursor="pointer"
          />
          <Image
            src="./edit.png"
            alt="Edit Options"
            width="20px"
            height="20px"
            cursor="pointer"
          />
        </Flex>
      </Flex>
    </>
  );
};

export default UserInfo;
