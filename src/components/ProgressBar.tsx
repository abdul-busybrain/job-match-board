"use client";

import { Progress } from "./ui/progress";

function ProgressBar({ score }: { score: number }) {
  const color =
    score >= 80 ? "bg-green-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 relative">
      {/* Custome colored bar */}
      <div
        className={`absolute top-0 left-0 h-4 rounded-full ${color}`}
        style={{ width: `${score}%` }}
      ></div>

      {/* Invisible Progress Bar to maintain Layout */}
      <Progress value={score} className="opacity-0" />

      {/* Percentage label */}
      <span className="absolute ring-2 text-sm font-medium text-black mt-4">
        {score}%
      </span>
    </div>
  );
}

export default ProgressBar;
