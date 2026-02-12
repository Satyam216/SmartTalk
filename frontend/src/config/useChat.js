import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuth} from "./useAuth";

export const useChat = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  getGroupMessages: async (groupId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/groups/${groupId}/messages`);
      set({ messages: res.data });
    } catch (error) {
      console.log("Group message fetch error:", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
  const { selectedUser, messages } = get();

  try {
    let res;
    if (selectedUser.members) {
      res = await axiosInstance.post(
        `/groups/${selectedUser._id}/messages`,
        messageData
      );
    } 
    else {
      res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
    }
    set({ messages: [...messages, res.data] });

  } catch (error) {
    toast.error(error.response?.data?.message || "Message send failed");
  }
},
  subscribeToMessages: () => {
  const socket = useAuth.getState().socket;
  const { selectedUser } = get();

  if (!socket || !selectedUser) return;

  socket.on("newMessage", (newMessage) => {
    if (
      !selectedUser.members &&
      newMessage.senderId === selectedUser._id
    ) {
      set({
        messages: [...get().messages, newMessage],
      });
    }
  });

  socket.on("newGroupMessage", (msg) => {
    if (
      selectedUser.members &&
      msg.groupId === selectedUser._id
    ) {
      set({
        messages: [...get().messages, msg],
      });
    }
  });
},
  unsubscribeFromMessages: () => {
  const socket = useAuth.getState().socket;
  if (!socket) return;

  socket.off("newMessage");
  socket.off("newGroupMessage");
},

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
