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
    <div className="p-6 bg-white shadow rounded-lg">
      <Button onClick={() => router.back()} className="mb-4" variant="link">
        🔙 Back
      </Button>
      <h1 className="text-2xl font-bold">About the job</h1>
      <div className="flex items-center gap-2 mt-4">
        <h2 className="text-2xl font-bold">Job Title:</h2>
        <span>{job.title}</span>
      </div>

      <div className="flex items-center gap-2">
        <p className=" font-bold">Company name: </p>
        <span>{job.company}</span>
      </div>

      <div className="flex items-center gap-2">
        <p className="font-bold">Job location:</p>
        {job.location}
      </div>

      <div className="flex items-center gap-2">
        <p className="font-bold">Salary range:</p>
        <span>{job.salary}</span>
      </div>

      <div className="flex gap-2">
        <p className="font-bold">Required skills:</p>
        <ul className="list-disc pl-4">
          {job.requiredSkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
      <Button className="mt-3" disabled={matchScore < 50}>
        {matchScore >= 50
          ? "Apply Now"
          : `Improve your skills in ${job.requiredSkills.join(", ")}`}
      </Button>
    </div>
  );
}
