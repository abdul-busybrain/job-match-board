"use client";

import { useJobStore } from "@/store/useJobStore";
import { useUserStore } from "@/store/useUserStore";
import ProgressBar from "./ProgressBar";
import Link from "next/link";
import { Button } from "./ui/button";

const calculateMatchScore = (userSkills: string[], jobSkils: string[]) => {
  if (!userSkills || !jobSkils) return 0;
  const matchedSkills = jobSkils.filter((skill) =>
    userSkills.includes(skill)
  ).length;
  return Math.round((matchedSkills / jobSkils.length) * 100);
};

function JobList() {
  const { jobs } = useJobStore();
  const { user } = useUserStore();

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className="space-y-4">
      {jobs.map((job) => {
        const matchScore = calculateMatchScore(user.skills, job.requiredSkills);

        return (
          <div key={job.id} className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-gray-600">
              {job.company} - {job.location}
            </p>
            <p className="font-medium">{job.salary}</p>

            {/* Match score Progress Bar */}
            <ProgressBar score={matchScore} />

            {/* View Job Details */}
            <Link href={`/job/${job.id}`} className="text-blue-500 underline">
              View details
            </Link>

            {/* Apply Button */}
            <Button className="mt-3" disabled={matchScore < 50}>
              {matchScore >= 50 ? "Apply Now" : "Improve your skills to apply"}
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default JobList;
