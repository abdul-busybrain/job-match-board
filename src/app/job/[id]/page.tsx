"use client";

import { Button } from "@/components/ui/button";
import { useJobStore } from "@/store/useJobStore";
import { useUserStore } from "@/store/useUserStore";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  requiredSkills: string[];
};

const calculateMatchScore = (userSkills: string[], jobSkills: string[]) => {
  if (!userSkills || !jobSkills) return 0;
  const matchedSkills = jobSkills.filter((skill) =>
    userSkills.includes(skill)
  ).length;
  return Math.round((matchedSkills / jobSkills.length) * 100);
};

export default function JobDetailsPage() {
  const { jobs } = useJobStore();
  const { user } = useUserStore();

  const router = useRouter();
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (typeof id === "string") {
      const selectedJob = jobs.find((job) => job.id === parseInt(id));
      setJob(selectedJob ?? null);
    }
  }, [jobs, id]);

  // Change page title dynamically
  useEffect(() => {
    if (job?.title) {
      document.title = `${job.title} | Job Details`;
    } else {
      document.title = "Job Details";
    }
  }, [job]);

  if (!job) return <p>Loading job details...</p>;
  if (!user) return <p>Loading user data...</p>;

  const matchScore = calculateMatchScore(user.skills, job.requiredSkills);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl w-full">
        <Button
          onClick={() => router.back()}
          className="mb-4 text-blue-600 hover:text-blue-700"
          variant="link"
        >
          🔙 Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">About the job</h1>

        <div className="mt-4">
          <h2 className="text-lg font-bold text-gray-700">Job Title:</h2>
          <span className="text-gray-800">{job.title}</span>
        </div>

        <div className="mt-2">
          <p className="font-bold text-gray-700">Company name:</p>
          <span className="text-gray-800">{job.company}</span>
        </div>

        <div className="mt-2">
          <p className="font-bold text-gray-700">Job location:</p>
          <span className="text-gray-800">{job.location}</span>
        </div>

        <div className="mt-2">
          <p className="font-bold text-gray-700">Salary range:</p>
          <span className="text-gray-800">{job.salary}</span>
        </div>

        <div className="mt-2">
          <p className="font-bold text-gray-700">Required skills:</p>
          <ul className="list-disc pl-4 text-gray-800">
            {job.requiredSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>

        <div
          className={`mt-4 px-3 py-2 rounded-lg text-sm font-semibold ${
            matchScore >= 50
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {matchScore >= 50
            ? `Match Score: ${matchScore}% ✅`
            : `Match Score: ${matchScore}% ❌`}
        </div>

        <Button
          className={`mt-4 w-full ${
            matchScore >= 50
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={matchScore < 50}
        >
          {matchScore >= 50 ? "Apply Now" : "Improve Your Skills"}
        </Button>
      </div>
    </div>
  );
}
