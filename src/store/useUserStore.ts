import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
  skills: string[];
}

interface UserStore {
  user: User | null;
  users: User[];
  fetchUsers: () => Promise<void>;
  fetchUser: (userId: number) => Promise<void>;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  users: [],

  fetchUsers: async () => {
    try {
      const response = await fetch("/users.json");
      const data: User[] = await response.json();
      set({ users: data });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },

  fetchUser: async (userId: number) => {
    set((state) => {
      const selectedUser = state.users.find((user) => user.id === userId);
      return { user: selectedUser || null };
    });
  },

  setUser: (user: User) => set({ user }),
}));
