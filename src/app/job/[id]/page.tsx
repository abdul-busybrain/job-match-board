"use client";

import { Button } from "@/components/ui/button";
import { useJobStore } from "@/store/useJobStore";
import { useUserStore } from "@/store/useUserStore";
import { useParams } from "next/navigation";
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
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (typeof id === "string") {
      const selectedJob = jobs.find((job) => job.id === parseInt(id));
      setJob(selectedJob ?? null);
    }
  }, [jobs, id]);

  if (!job) return <p>Loading job details...</p>;
  if (!user) return <p>Loading user data...</p>;

  const matchScore = calculateMatchScore(user.skills, job.requiredSkills);

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600">
        {job.company} - {job.location}
      </p>
      <p className="font-medium">{job.salary}</p>
      <ul className="list-disc list-inside">
        {job.requiredSkills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <Button className="mt-3" disabled={matchScore < 50}>
        {matchScore >= 50
          ? "Apply Now"
          : `Improve Skills your ${job.requiredSkills.join(", ")}`}
      </Button>
    </div>
  );
}
