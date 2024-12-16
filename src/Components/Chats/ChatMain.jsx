import { useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Input,
  Text,
  VStack,
  Button,
  Avatar,
} from "@chakra-ui/react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import useChatStore from "../../store/chatStore";
import useUserStore from "../../store/userStore";
import { getTimeMs } from "../../utils/getTimeMs";
import useShowToast from "../../hooks/useShowToast";

const ChatMain = () => {
  const [chat, setChat] = useState();
  const [text, setText] = useState("");
  const showToast = useShowToast();
  const currentUser = useUserStore((state) => state.currentUser);
  const { chatId, user } = useChatStore((state) => ({
    chatId: state.chatId,
    user: state.user,
  }));

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(firestore, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleKeyPress = (e) => {
    if (e.code === "Enter") handleSend();
  };
  const handleSend = async () => {
    if (text.trim() === "") return;

    try {
      await updateDoc(doc(firestore, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.uid,
          text,
          createdAt: new Date(),
        }),
      });

      const userIDs = [currentUser.uid, user.uid];

      userIDs.forEach(async (uid) => {
        const userChatsRef = doc(firestore, "userChats", uid);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            uid === currentUser.uid ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setText("");
    }
  };

  return (
    <Flex
      flex="2"
      height="100%"
      direction="column"
      borderLeft="1px solid #dddddd35"
      borderRight="1px solid #dddddd35"
    >
      <Flex
        p="20px"
        align="center"
        justify="space-between"
        borderBottom="1px solid #dddddd35"
      >
        <Flex align="center" gap="20px">
          <Avatar
            src={user?.avatar || "./avatar-boy.svg"}
            alt="User Avatar"
            boxSize="60px"
            borderRadius="50%"
            objectFit="cover"
          />
          <VStack className="texts" align="start" spacing="5px">
            <Text fontSize="18px" fontWeight="bold">
              {user?.username}
            </Text>
            <Text fontSize="14px" fontWeight="300" color="#a5a5a5">
              Lorem ipsum dolor, sit amet.
            </Text>
          </VStack>
        </Flex>

        <Flex className="icons" gap="20px">
          <Image src="./phone-sv.svg" alt="Phone" boxSize="30px" />
          <Image src="./video-call.svg" alt="Video" boxSize="30px" />
          <Image src="./info-circle.svg" alt="Info" boxSize="30px" />
        </Flex>
      </Flex>

      <Flex
        className="center"
        p="20px"
        flex="2"
        overflowY="scroll"
        flexDirection="column"
        gap="20px"
      >
        {chat?.messages?.map((message) => (
          <Flex
            key={`${message.createdAt}-${message.senderId}`}
            className="message"
            maxW="100%"
            gap="20px"
            alignItems={"center"}
          >
            <VStack
              className="texts"
              align="start"
              spacing="5px"
              flex="1"
              alignItems={
                message.senderId === currentUser?.uid ? "end" : "start"
              }
            >
              <Text
                p="10px"
                bg={
                  message.senderId === currentUser?.uid
                    ? "blue.500"
                    : "gray.700"
                }
                color="white"
                borderRadius="10px"
              >
                {message.text}
              </Text>
              <Text fontSize="10px">
                {" "}
                {message.createdAt
                  ? getTimeMs(message.createdAt.toDate?.() || message.createdAt)
                  : "N/A"}
              </Text>
            </VStack>
          </Flex>
        ))}

        <Box ref={endRef}></Box>
      </Flex>

      <Flex
        className="bottom"
        p="20px"
        align="center"
        justify="space-between"
        borderTop="1px solid #dddddd35"
        gap="20px"
      >
        <Flex className="icons" gap="20px">
          <label htmlFor="file">
            <Image
              src="./img-box.svg"
              alt="Upload"
              boxSize="20px"
              cursor="pointer"
            />
          </label>
          <Input type="file" id="file" display="none" />
          <Image
            src="./camera-svg.svg"
            alt="Camera"
            boxSize="20px"
            cursor="pointer"
          />
          <Image
            src="./mic-svg.svg"
            alt="Mic"
            boxSize="20px"
            cursor="pointer"
          />
        </Flex>

        <Input
          className="input"
          type="text"
          placeholder="Type a message..."
          flex="1"
          bg="rgba(17, 25, 40, 0.5)"
          border="none"
          outline="none"
          color="white"
          p="20px"
          borderRadius="10px"
          fontSize="16px"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <Box className="emoji" position="relative">
          <Image
            src="./emoji-smile.svg"
            alt="Emoji"
            boxSize="20px"
            cursor="pointer"
          />
          <Box
            className="picker"
            position="absolute"
            bottom="50px"
            left="0"
          ></Box>
        </Box>

        <Button
          className="sendButton"
          bg="green.400"
          color="white"
          p="10px 20px"
          borderRadius="5px 200px 200px 10px"
          cursor="pointer"
          _disabled={{ bg: "#5182feb4", cursor: "not-allowed" }}
          onClick={handleSend}
        >
          Send
        </Button>
      </Flex>
    </Flex>
  );
};
export default ChatMain;
