import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { addDoc, collection, updateDoc, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);
  const removeComment = usePostStore((state) => state.removeComment);
  const showToast = useShowToast();

  const handlePostComment = async (postId, comment, parentId = null) => {
    if (isCommenting) return;
    if (comment === "") return;
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
    const commentRef = await addDoc(collection(firestore, "comments"), newComment);
    try {
      if (parentId) {
        const parentCommentRef = doc(firestore, "comments", parentId);
        const parentCommentSnap = await getDoc(parentCommentRef);
        if (parentCommentSnap.exists()) {
          await updateDoc(parentCommentRef, {
            replies: [
              ...(parentCommentSnap.data().replies || []),
              {
                comment: newComment.comment,
                commentId: newComment.commentId,
                commentRef: commentRef.id,
                parentId: parentId,
              },
            ],
          });
        } else {
          await setDoc(parentCommentRef, {
            replies: [{ commentId: newComment.commentId, commentRef: commentRef.id }],
          });
        }
      }

      addComment(postId, { ...newComment, commentId: commentRef.id }, parentId);
    } catch (error) {
      console.error("Error adding comment:", error);
      showToast("Error", error.message, "error");
    } finally {
      setIsCommenting(false);
    }
  };
  const handleDeleteComment = async (commentId, postId) => {
    try {
      const commentRef = doc(firestore, "comments", commentId);
      await deleteDoc(commentRef);
      removeComment(postId, commentId);
      showToast("Success", "Comment deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting comment:", error);
      showToast("Error", error.message, "error");
    }
  };

  return { isCommenting, handlePostComment, handleDeleteComment };
};

export default usePostComment;
