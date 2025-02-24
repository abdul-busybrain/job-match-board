import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null, // Initially no user is selected

  fetchUser: async (userId) => {
    try {
      const response = await fetch("/users.json");
      const data = await response.json();
      const selectedUser = data.find((user) => user.id === userId);
      set({ data: selectedUser });
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  },
}));
