import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { deleteObject, ref } from "firebase/storage";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import usePostStore from "../../store/postStore";
import PostGridItem from "./PostGridItem";
import PostModal from "./PostModal";

const ProfilePost = ({ post }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

  const handleEdit = () => {
    alert("Edit action triggered");
  };

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;
    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, "users", authUser.uid);
      await deleteDoc(doc(firestore, "posts", post.id));
      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });
      deletePost(post.id);
      decrementPostsCount(post.id);
      showToast("Success", "Post deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <PostGridItem post={post} onOpen={onOpen} />
      <PostModal
        post={post}
        isOpen={isOpen}
        onClose={onClose}
        handleEdit={handleEdit}
        handleDeletePost={handleDeletePost}
        isDeleting={isDeleting}
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
        userProfile={userProfile}
        authUser={authUser}
      />
    </>
  );
};

export default ProfilePost;
