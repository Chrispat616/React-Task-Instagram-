import { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  Input,
  Button,
  Text,
  Avatar,
} from "@chakra-ui/react";
import useUserStore from "../../store/userStore";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);
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
        setUsers([]);
      } else {
        const matchedUsers = [];
        querySnapshot.forEach((doc) => {
          matchedUsers.push(doc.data());
        });
        setUsers(matchedUsers);
        setErr(false);
        setUsername("");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setErr(true);
    }
  };

  const handleAdd = async (user) => {
    if (!user || !currentUser) return;

    const chatRef = collection(firestore, "chats");
    const userChatsRef = collection(firestore, "userChats");

    try {
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
    } catch (err) {
      console.error("Error adding chat:", err);
    }
  };

  return (
    <Box
      width="max-content"
      height="max-content"
      p="10px"
      bgGradient="linear(to-br, rgba(245, 96, 164, 1), rgba(189, 38, 255, 1), rgba(117, 37, 206, 1), rgba(252, 175, 69, 1), rgba(255, 69, 58, 1))"
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
              placeholder="Username"
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
          <Flex
            mt="50px"
            align="center"
            justify="space-between"
            className="user"
            key={index}
          >
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
