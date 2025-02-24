"use client";

import { Button } from "@/components/ui/button";
import { useJobStore } from "@/store/useJobStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function JobDetailsPage() {
  const { jobs } = useJobStore();
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const selectedJob = jobs.find((job) => job.id === parseInt(id));
    setJob(selectedJob);
  }, [jobs, id]);

  if (!job) return <p>Loading job details...</p>;

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
      <Button className="mt-4">Apply Now</Button>
    </div>
  );
}
