import { useEffect, useState } from "react";
import { Avatar, Flex, Image, Input, Text, VStack } from "@chakra-ui/react";
import AddUser from "./AddUser";
import useUserStore from "../../store/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import useChatStore from "../../store/chatStore";
import useShowToast from "../../hooks/useShowToast";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const currentUser = useUserStore((state) => state.currentUser);
  const { setChangeChat } = useChatStore();
  const showToast = useShowToast();

  useEffect(() => {
    if (!currentUser?.uid) {
      return;
    }

    const userChatsDocRef = doc(firestore, "userChats", currentUser.uid);
    const unSub = onSnapshot(userChatsDocRef, async (res) => {
      if (!res.exists()) {
        setChats([]);
        return;
      }

      const items = res.data().chats || [];
      const promises = items.map(async (item) => {
        const userDocRef = doc(firestore, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.exists() ? userDocSnap.data() : null;
        return { ...item, user };
      });

      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => {
      unSub();
    };
  }, [currentUser?.uid]);

  const handleSelect = async (chat) => {
    if (!currentUser?.uid) return;

    const userChats = chats.map((item) => {
      const { ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId);

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(firestore, "userChats", currentUser.uid);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      setChangeChat(chat.chatId, chat.user);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <Flex className="chatList" flex="1" overflowY="scroll" direction="column">
      <Flex className="search" align="center" gap="20px" p="20px">
        <Flex
          className="searchBar"
          flex="1"
          bg="rgba(17, 25, 40, 0.5)"
          align="center"
          gap="20px"
          borderRadius="10px"
          p="5px"
        >
          <Image src="./search-svg.svg" alt="Search Icon" boxSize="20px" />
          <Input
            type="text"
            placeholder=" Click on plus sign(+) to add user →"
            bg="transparent"
            border="1px solid rgba(255, 255, 255, 0.57)"
            outline="none"
            color="white"
            flex="2"
            _placeholder={{ color: "gray.400" }}
          />
        </Flex>
        <Image
          src={addMode ? "./minus-svgrepo-com.svg" : "./plus-svgrepo-com.svg"}
          alt="Add Icon"
          className="add"
          boxSize="36px"
          bg="rgba(17, 25, 40, 0.5)"
          p="10px"
          borderRadius="10px"
          cursor="pointer"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </Flex>
      {chats.map((chat) => (
        <Flex
          key={chat.chatId}
          className="item"
          align="center"
          gap="20px"
          p="20px"
          borderBottom="1px solid #dddddd35"
          cursor="pointer"
          bg={"transparent"}
          onClick={() => handleSelect(chat)}
        >
          <Avatar
            src={chat.user?.avatar || "./avatar-boy.svg"}
            alt="User Avatar"
            boxSize="36px"
            borderRadius="50%"
            objectFit="cover"
          />
          <VStack className="texts" align="start" spacing="10px">
            <Text fontWeight="400">{chat.user?.username || "Unknown User"}</Text>
            <Text fontSize="14px" fontWeight="250">
              {chat.lastMessage}
            </Text>
          </VStack>
        </Flex>
      ))}
      {addMode && <AddUser />}
    </Flex>
  );
};

export default ChatList;
