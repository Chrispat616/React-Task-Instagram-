import { create } from "zustand";
import { firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,

  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (error) {
      console.log(error);
      return set({ currentUser: null, isLoading: false });
    }
  },
}));
export default useUserStore;
