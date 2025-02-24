import { create } from "zustand";

export const useJobStore = create((set) => ({
  jobs: [],

  fetchJobs: async () => {
    try {
      const response = await fetch("/jobs.json");
      const data = await response.json();
      set({ jobs: data });
    } catch (error) {
      console.log("Error fetching jobs", error);
    }
  },
}));
