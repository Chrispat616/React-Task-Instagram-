
import { useState } from "react";
import {
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  Tooltip,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Avatar,

} from "@chakra-ui/react";
import { SearchLogo } from "../../assets/constants";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import { Link } from "react-router-dom";

const Search = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);
  const { isOpen, onOpen, onClose: defaultOnClose } = useDisclosure();

  const showToast = useShowToast();
  const onClose = () => {
    setUsers([]);
    setErr(false);
    setUsername("");
    defaultOnClose();
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setUsername("")

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
        setUsers(matchedUsers)
        setErr(false)
      };
    } catch (error) {
      showToast("Error", error.message, "error");
      setErr(true);
    };
  };
  const handleUserClick = () => {
    setUsers([]);
    setErr(false);
    setUsername("");
    onClose();
  };
  return (
    <>
      <Tooltip
        hasArrow
        label={"Search"}
        placement='right'
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          padding={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <SearchLogo />
          <Box display={{ base: "none", md: "block" }}>Search</Box>
        </Flex>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
        <ModalOverlay />
        <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
          <ModalHeader>Search user</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSearch}>
              <FormControl>
                <FormLabel></FormLabel>
                <Input placeholder="Search User" value={username}
                  onChange={(e) => setUsername(e.target.value)} />
              </FormControl>
              <Flex w={"full"} justifyContent={"flex-end"}>
                <Button
                  type="submit"
                  ml={"auto"}
                  size={"sm"}
                  my={4}
                >
                  Search
                </Button>
              </Flex>
            </form>
            {err && <Text color="red.500">No users found!</Text>}
            {users &&
              users.map((user, index) => (
                <Flex
                  onClick={handleUserClick}
                  align="center"
                  p="20px"
                  className="user"
                  key={index}
                  borderBottom="1px solid #dddddd35"
                >
                  <Link to={`${user.username}`}>
                    <Flex align="center" gap="20px" className="detail">
                      <Avatar
                        src={user.avatar || "./avatar-boy-svgrepo-com.svg"}
                        alt="User Avatar"
                        width="24px"
                        height="24px"
                        borderRadius="50%"
                        objectFit="cover"
                      />
                      <Text color="white">{user.username}</Text>
                    </Flex>
                  </Link>
                </Flex>
              ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Search;
