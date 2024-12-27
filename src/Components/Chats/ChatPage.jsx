import { Box, Flex } from "@chakra-ui/react";
import List from "./List";
import ChatMain from "./ChatMain";
import useAuthStore from "../../store/authStore";
import AuthPage from "../../Pages/AuthPage/AuthPage";
import useChatStore from "../../store/chatStore";

const ChatPage = () => {
  const authUser = useAuthStore((state) => state.user);
  const { chatId } = useChatStore();
  return authUser ? (
    <Flex
      bgImage="url('/bg.jpg')"
      bgSize="cover"
      bgPosition="center"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      color="white"
    >
      <Box
        width="80vw"
        height="90vh"
        bg="rgba(17, 25, 40, 0.75)"
        backdropFilter="blur(19px) saturate(180%)"
        borderRadius="12px"
        border="1px solid rgba(255, 255, 255, 0.125)"
        display="flex"
      >
        <List />
        {chatId && <ChatMain />}
      </Box>
    </Flex>
  ) : (
    <AuthPage />
  );
};

export default ChatPage;
