"use client"

import { GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { University, universityNames } from "@/lib/university-locations"

interface UniversitySelectorProps {
  selected: University
  onChange: (university: University) => void
}

export function UniversitySelector({
  selected,
  onChange,
}: UniversitySelectorProps) {
  const universities: University[] = ["HUST", "NEU", "HUCE"]

  return (
    <div className="mb-6 flex flex-col items-center gap-3">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5">
        <GraduationCap className="h-4 w-4 text-primary" />
        <span className="text-xs font-semibold text-primary uppercase tracking-wide">
          Chọn trường
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center">
        {universities.map((uni) => (
          <Button
            key={uni}
            onClick={() => onChange(uni)}
            variant={selected === uni ? "default" : "outline"}
            className={`transition-all ${
              selected === uni
                ? "bg-primary text-white shadow-md scale-105"
                : "border-primary/40 text-primary hover:bg-primary/10"
            }`}
          >
            {universityNames[uni]}
          </Button>
        ))}
      </div>
    </div>
  )
}
