"use client";

import { Progress } from "./ui/progress";

function ProgressBar({ score }: { score: number }) {
  const color =
    score >= 80 ? "bg-green-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full bg-gray-200 rounded-full h-4 ">
        {/* Custome colored bar */}
        <div
          className={`absolute top-0 left-0 h-4 rounded-full ${color}`}
          style={{ width: `${score}%` }}
        ></div>

        {/* Invisible Progress Bar to maintain Layout */}
        <Progress value={score} className="opacity-0" />
      </div>

      {/* Percentage label */}
      <span className="text-sm font-medium text-black ">{score}%</span>
    </div>
  );
}

export default ProgressBar;
