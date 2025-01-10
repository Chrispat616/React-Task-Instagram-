import { create } from "zustand";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const usePostStore = create((set) => ({
  posts: [],
  updatePostLikes: (postId, likes) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, likes } : post
      ),
    })),

  fetchComments: async (postId) => {
    const commentsQuery = query(
      collection(firestore, "comments"),
      where("postId", "==", postId),
      orderBy("createdAt", "asc")
    );

    const querySnapshot = await getDocs(commentsQuery);
    const comments = querySnapshot.docs.map((doc) => ({
      commentId: doc.id,
      ...doc.data(),
    }));

    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, comments } : post
      ),
    }));
  },

  createPost: (post) =>
    set((state) => ({
      posts: [{ ...post, comments: [] }, ...state.posts],
    })),

  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    })),

  setPosts: (posts) =>
    set({
      posts: posts.map((post) => ({
        ...post,
        comments: post.comments || [],
      })),
    }),

  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...(post.comments || []), comment],
          };
        }
        return post;
      }),
    })),
}));

export default usePostStore;
