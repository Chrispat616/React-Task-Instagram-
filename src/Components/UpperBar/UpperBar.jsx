import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { Avatar, Box, Flex, Tooltip, Text, Spinner } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { Link } from "react-router-dom";

const UpperBar = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, authLoading] = useAuthState(auth);
  const uid = user?.uid;

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      if (!uid) return;

      try {
        setLoading(true);
        const userDocRef = doc(firestore, "users", uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const following = userData.following || [];
          const limitedFollowing = following.slice(0, 8);

          const followingUsers = await Promise.all(
            limitedFollowing.map(async (followedUid) => {
              const followedUserDocRef = doc(firestore, "users", followedUid);
              const followedUserDocSnap = await getDoc(followedUserDocRef);
              return followedUserDocSnap.exists() ? followedUserDocSnap.data() : null;
            })
          );

          setUsers(followingUsers.filter(Boolean));
        } else {
          setError("No user document found");
        }
      } catch (error) {
        setError("Error fetching users: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchFollowingUsers();
    }
  }, [uid, authLoading]);

  if (authLoading || loading) return <Spinner label="Loading users..." />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box w="full" h="full" p={4}>
      <Flex direction="row" gap={4}>
        {users.map((user, index) => (
          <Tooltip key={index} hasArrow label={user.fullname} openDelay={500}>
            <Link to={`/${user.username}`}>
              <Box display={{ base: "none", md: "block" }} cursor="pointer">
                <Avatar size="md" src={user.avatar || "./avatar-boy.svg"} />
              </Box>
            </Link>
          </Tooltip>
        ))}
      </Flex>
    </Box>
  );
};

export default UpperBar;
