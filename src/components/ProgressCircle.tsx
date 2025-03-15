import React from "react";

interface ProgressCircleProps {
  progress: number; // ค่าความคืบหน้า (0-100)
  size?: number; // ขนาดของวงกลม
  strokeWidth?: number; // ความหนาของเส้น
  details: string; // ข้อความที่จะแสดงในวงกลม
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  size = 120,
  strokeWidth = 12,
  details,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center -rotate-90">
      <svg width={size+20} height={size+2} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      <defs>
          <filter id="neon-glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* วงกลมพื้นหลัง */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* วงกลมแสดง Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#22c55e"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          filter="url(#neon-glow)"
          className="transition-all duration-500"
        />
      </svg>
      {/* ข้อความตรงกลาง */}
      <div className="absolute flex flex-col items-center rotate-90 text-white" >
        <span className="text-2xl font-bold">{progress}%</span>
        <span className="text-sm ">{details}</span>
      </div>
    </div>
  );
};

export default ProgressCircle;
