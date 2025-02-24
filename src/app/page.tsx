"use client";

import { useEffect } from "react";
import { useJobStore } from "../store/useJobStore";
import { useUserStore } from "../store/useUserStore";
import JobList from "@/components/JobList";

export default function HomePage() {
  const { fetchJobs } = useJobStore();
  const { fetchUser } = useUserStore();

  useEffect(() => {
    fetchJobs(); // Fetch job listings
    fetchUser(1); // Assume user with ID 1 is logged in
  }, [fetchJobs, fetchUser]);

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">
        AI-Powered Job Match Dashboard
      </h1>
      <JobList />
    </main>
  );
}
