import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
  skills: string[];
}

interface UserStore {
  user: User | null;
  fetchUser: (userId: number) => Promise<void>;
}

export const useUserStore =
  create <
  UserStore >
  ((set) => ({
    user: null,

    fetchUser: async (userId: number) => {
      try {
        const response = await fetch("/users.json");
        const data: User[] = await response.json();
        const selectedUser = data.find((user) => user.id === userId);
        set({ user: selectedUser || null }); // Fix: Use `user` instead of `data`
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
  }));
