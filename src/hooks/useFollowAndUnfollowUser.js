import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  runTransaction,
} from "firebase/firestore";

const useFollowAndUnfollowUser = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  const handleFollowUser = async () => {
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      const currentUserRef = doc(firestore, "users", authUser.uid);
      const userToFollowOrUnfollowRef = doc(firestore, "users", userId);

      await runTransaction(firestore, async (transaction) => {
        const currentUserDoc = await transaction.get(currentUserRef);
        const userToFollowOrUnfollowDoc = await transaction.get(
          userToFollowOrUnfollowRef
        );
        if (!currentUserDoc.exists() || !userToFollowOrUnfollowDoc.exists()) {
          throw new Error("User does not exist");
        }

        const isCurrentlyFollowing = currentUserDoc
          .data()
          .following.includes(userId);
        const currentUserFollowingArray = isCurrentlyFollowing
          ? arrayRemove(userId)
          : arrayUnion(userId);
        const userFollowersArray = isCurrentlyFollowing
          ? arrayRemove(authUser.uid)
          : arrayUnion(authUser.uid);

        transaction.update(currentUserRef, {
          following: currentUserFollowingArray,
        });
        transaction.update(userToFollowOrUnfollowRef, {
          followers: userFollowersArray,
        });

        if (isCurrentlyFollowing) {
          setAuthUser({
            ...authUser,
            following: authUser.following.filter((uid) => uid !== userId),
          });
          if (userProfile) {
            setUserProfile({
              ...userProfile,
              followers: userProfile.followers.filter(
                (uid) => uid !== authUser.uid
              ),
            });
          }
          setIsFollowing(false);
        } else {
          setAuthUser({
            ...authUser,
            following: [...authUser.following, userId],
          });
          if (userProfile) {
            setUserProfile({
              ...userProfile,
              followers: [...userProfile.followers, authUser.uid],
            });
          }
          setIsFollowing(true);
        }

        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            following: isCurrentlyFollowing
              ? authUser.following.filter((uid) => uid !== userId)
              : [...authUser.following, userId],
          })
        );
      });
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      const userIsFollowing = authUser.following.includes(userId);
      setIsFollowing(userIsFollowing);
    }
  }, [authUser, userId]);

  return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowAndUnfollowUser;
