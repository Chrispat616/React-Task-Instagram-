import { Flex } from "@chakra-ui/react";
import UserInfo from "./UserInfo";
import ChatList from "./ChatList";

const List = () => {
  return (
    <Flex flex={1} flexDirection={"column"} display={"flex"}>
      <UserInfo />
      <ChatList />
    </Flex>
  );
};

export default List;
