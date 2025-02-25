"use client";

import { useEffect, useState } from "react";
import { useJobStore } from "../store/useJobStore";
import { useUserStore } from "../store/useUserStore";
import JobList from "@/components/JobList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Define a User type for type safety
type User = {
  id: number;
  name: string;
};

export default function HomePage() {
  const { fetchJobs } = useJobStore();
  const { users, user, fetchUsers, fetchUser, setUser } = useUserStore();
  const [selectedUserId, setSelectedUserId] = useState<number>(user?.id || 1);

  // Fetch jobs and user data on component mount
  useEffect(() => {
    fetchJobs(); // Fetch job listings
    fetchUsers(); // Assume user with ID 1 is logged in
  }, [fetchJobs, fetchUsers]);

  // Fetch user when selectedUserId changes
  useEffect(() => {
    if (users.length > 0) fetchUser(selectedUserId);
  }, [fetchUser, selectedUserId, users]);

  // Handle user selection
  const handleUserChange = (newUserId: number) => {
    setSelectedUserId(newUserId);
    const selectedUser = users.find((u) => u.id === newUserId);
    if (selectedUser) setUser(selectedUser);
  };

  return (
    <main>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">AI-Powered Job Match Dashboard</h1>

        <div className="flex items-center gap-2 border p-2 rounded-lg">
          <span className="semi-bold">User:</span>
          {users.length > 0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                  {user?.name || "Select User"} ⬇️
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {users.map((u: User) => (
                  <DropdownMenuItem
                    key={u.id}
                    onClick={() => handleUserChange(u.id)}
                  >
                    {u.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <span className="text-gray-500">Loading users...</span>
          )}
        </div>
      </div>

      <JobList />
    </main>
  );
}
