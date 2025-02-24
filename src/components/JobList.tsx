"use client";

import { useJobStore } from "@/store/useJobStore";
import { useUserStore } from "@/store/useUserStore";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  requiredSkills: string[];
}

const calculateMatchScore = (userSkills: string[], jobSkills: string[]) => {
  if (!userSkills || !jobSkills) return 0;
  const matchedSkills = jobSkills.filter((skill) =>
    userSkills.includes(skill)
  ).length;
  return Math.round((matchedSkills / jobSkills.length) * 100);
};

export default function JobList() {
  const { jobs } = useJobStore();
  const { user } = useUserStore();

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className="space-y-4">
      {jobs.map((job: Job) => {
        const matchScore = calculateMatchScore(user.skills, job.requiredSkills);

        return (
          <div key={job.id} className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-gray-600">
              {job.company} - {job.location}
            </p>
            <p className="font-medium">{job.salary}</p>

            {/* Match Score Progress Bar */}
            <ProgressBar score={matchScore} />

            {/* View Job Details */}
            <Link href={`/job/${job.id}`} className="text-blue-500 underline">
              View Details
            </Link>
          </div>
        );
      })}
    </div>
  );
}
