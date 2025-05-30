import { useState } from "react";
import { Box, Flex, FormControl, Input, Button, Text, Avatar } from "@chakra-ui/react";
import useUserStore from "../../store/userStore";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import { Link } from "react-router-dom";

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);
  const showToast = useShowToast();
  const currentUser = useUserStore((state) => state.currentUser);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!username.trim()) return;

    const userRef = collection(firestore, "users");
    const q = query(
      userRef,
      where("username", ">=", username),
      where("username", "<=", username + "\uf8ff")
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setErr(true);
      } else {
        const matchedUsers = [];
        querySnapshot.forEach((doc) => {
          matchedUsers.push(doc.data());
        });
        setUsers(matchedUsers);
        setErr(false);
        setUsername("");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
      setErr(true);
    }
  };

  const handleAdd = async (user) => {
    if (!user || !currentUser) return;

    const chatRef = collection(firestore, "chats");
    const userChatsRef = collection(firestore, "userChats");

    try {
      const currentUserChatsSnapshot = await getDoc(doc(userChatsRef, currentUser.uid));
      const currentUserChats = currentUserChatsSnapshot.exists()
        ? currentUserChatsSnapshot.data().chats || []
        : [];

      const isUserAlreadyAdded = currentUserChats.some((chat) => chat.receiverId === user.uid);

      if (isUserAlreadyAdded) {
        showToast("Error", "User already added", "error");
        return;
      }

      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.uid), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.uid,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.uid), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.uid,
          updatedAt: Date.now(),
        }),
      });
    } catch (error) {
      showToast("Error", error.message, "error");
    }
    setUsers([]);
  };

  return (
    <Box
      width="max-content"
      height="max-content"
      p="10px"
      backgroundColor="rgba(17, 25, 40, 0.75)"
      border="1px solid rgba(255, 255, 255, 0.28)"
      borderRadius="10px"
      position="absolute"
      top="0"
      bottom="0"
      left="0"
      right="0"
      margin="auto"
      zIndex="10"
    >
      <form onSubmit={handleSearch}>
        <Flex gap="20px">
          <FormControl>
            <Input
              type="text"
              placeholder="Search Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              p="20px"
              borderRadius="10px"
              border="none"
              outline="none"
            />
          </FormControl>
          <Button
            type="submit"
            p="20px"
            borderRadius="10px"
            bg="#1a73e8"
            color="white"
            _hover={{ bg: "#1665d8" }}
          >
            Search
          </Button>
        </Flex>
      </form>
      {err && <Text color="red.500">No users found!</Text>}
      {users &&
        users.map((user, index) => (
          <Flex mt="50px" align="center" justify="space-between" className="user" key={index}>
            <Link to={`/${user.username}`}>
              <Flex align="center" gap="20px" className="detail">
                <Avatar
                  src={user.avatar || "./avatar-boy-svgrepo-com.svg"}
                  alt="User Avatar"
                  width="36px"
                  height="36px"
                  borderRadius="50%"
                  objectFit="cover"
                />
                <Text color="white">{user.username}</Text>
              </Flex>
            </Link>
            <Button
              onClick={() => handleAdd(user)}
              p="5px"
              borderRadius="10px"
              bg="#1a73e8"
              color="white"
              _hover={{ bg: "#1665d8" }}
            >
              Add User
            </Button>
          </Flex>
        ))}
    </Box>
  );
};

export default AddUser;
