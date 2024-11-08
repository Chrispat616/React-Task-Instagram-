import {
  collection,
  getDocs,
  query,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { useState } from "react";

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const showToast = useShowToast();

  const getUserProfiles = async (searchTerm) => {
    setIsLoading(true);
    setUsers([]);

    try {
      const q = query(
        collection(firestore, "users"),
        orderBy("username"),
        startAt(searchTerm),
        endAt(searchTerm + "\uf8ff")
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        showToast("Error", "No users found", "error");
        return;
      }

      const matchedUsers = [];
      querySnapshot.forEach((doc) => {
        matchedUsers.push(doc.data());
      });

      setUsers(matchedUsers);
    } catch (error) {
      showToast("Error", error.message, "error");
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUserProfiles, users, setUsers };
};

export default useSearchUser;
