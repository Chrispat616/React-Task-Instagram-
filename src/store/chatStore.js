import { create } from "zustand";
import useUserStore from "./userStore";

const useChatStore = create((set) => ({
  chatId: null,
  user: null,

  setChangeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;
    if (currentUser) {
      set({
        chatId,
        user,
      });
    } else {
      console.log("No current user available");
    }
  },

  resetChat: () => {
    set({
      chatId: null,
      user: null,
    });
  },
}));

export default useChatStore;
