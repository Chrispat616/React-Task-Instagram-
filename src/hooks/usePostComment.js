import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { addDoc, collection, updateDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);

  const handlePostComment = async (postId, comment, parentId = null) => {
    if (isCommenting) return;
    if (!authUser) {
      return showToast("Error", "Log in to comment", "error");
    }

    setIsCommenting(true);

    const newComment = {
      commentId: Date.now().toString(),
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId,
      parentId,
      replies: [],
    };

    try {
      const commentRef = await addDoc(
        collection(firestore, "comments"),
        newComment
      );

      if (parentId) {
        const parentCommentRef = doc(firestore, "comments", parentId);

        const parentCommentSnap = await getDoc(parentCommentRef);

        if (!parentCommentSnap.exists()) {
          console.error(
            "Parent comment does not exist in Firestore:",
            parentId
          );
          showToast("Error", "Parent comment does not exist!", "error");
          return;
        }

        await updateDoc(parentCommentRef, {
          replies: [
            ...(parentCommentSnap.data().replies || []),
            { commentId: newComment.commentId, commentRef: commentRef.id },
          ],
        });
      }

      addComment(postId, { ...newComment, commentId: commentRef.id }, parentId);
    } catch (error) {
      console.error("Error adding comment:", error);
      showToast("Error", error.message, "error");
    } finally {
      setIsCommenting(false);
    }
  };

  return { isCommenting, handlePostComment };
};

export default usePostComment;
