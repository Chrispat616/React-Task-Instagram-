import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, IconButton, Tooltip } from "@chakra-ui/react";
import List from "./List";
import ChatMain from "./ChatMain";
import useAuthStore from "../../store/authStore";
import AuthPage from "../../Pages/AuthPage/AuthPage";
import useChatStore from "../../store/chatStore";
import { CloseIcon } from "@chakra-ui/icons";

const ChatPage = () => {
  const authUser = useAuthStore((state) => state.user);
  const { chatId } = useChatStore();
  const chatPageRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (chatPageRef.current && !chatPageRef.current.contains(event.target)) {
      navigate("/");
    }
  };
  const handleClose = () => {
    navigate("/");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        ref={chatPageRef}
        width="80vw"
        height="90vh"
        bg="rgba(17, 25, 40, 0.75)"
        backdropFilter="blur(19px) saturate(180%)"
        borderRadius="12px"
        border="1px solid rgba(255, 255, 255, 0.125)"
        display="flex"
        position="relative"
      >
        <Tooltip label="Close Chat" aria-label="Close Chat Tooltip">
          <IconButton
            icon={<CloseIcon />}
            position="absolute"
            top="14px"
            right="17px"
            boxSize="0px"
            onClick={handleClose}
            aria-label="Close Chat"
          />
        </Tooltip>
        <List />
        {chatId && <ChatMain />}
      </Box>
    </Flex>
  ) : (
    <AuthPage />
  );
};

export default ChatPage;
