import { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useLikePosts = (post) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  const [likes, setLikes] = useState(post?.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(
    post?.likes?.includes(authUser?.uid) || false
  );

  useEffect(() => {
    if (post && authUser) {
      setLikes(post.likes.length);
      setIsLiked(post.likes.includes(authUser.uid));
    }
  }, [post, authUser]);

  const handleLikePost = async () => {
    if (isUpdating) return;
    if (!authUser) {
      return showToast(
        "Error",
        "You must be logged in to like a post",
        "error"
      );
    }

    setIsUpdating(true);
    try {
      const postRef = doc(firestore, "posts", post.id);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });

      setIsLiked(!isLiked);
      setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePosts;
