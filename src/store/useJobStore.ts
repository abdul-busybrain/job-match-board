import { create } from "zustand";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  requiredSkills: string[];
}

interface JobStore {
  jobs: Job[];
  fetchJobs: () => Promise<void>;
}

export const useJobStore = create<JobStore>((set) => ({
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
