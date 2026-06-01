"use client"

import { MapPin, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { University, universityLocations } from "@/lib/university-locations"

interface DeliveryMapProps {
  university: University
  selectedLocation: string
  onLocationSelect: (locationName: string) => void
  onBackToForm: () => void
}

export function DeliveryMap({
  university,
  selectedLocation,
  onLocationSelect,
  onBackToForm,
}: DeliveryMapProps) {
  const locations = universityLocations[university]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBackToForm}
          className="-ml-2"
        >
          ← Trở lại Form
        </Button>
        <h3 className="font-bold text-sm flex items-center gap-1.5">
          <Building className="h-4 w-4" />
          Bản đồ {university}
        </h3>
      </div>

      <div className="relative aspect-square w-full rounded-xl bg-[#f1f5f9] border border-border overflow-hidden">
        <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
          {/* Border walls */}
          <rect x="0" y="0" width="30" height="400" fill="#cbd5e1" />
          <rect x="0" y="0" width="400" height="30" fill="#cbd5e1" />
          <rect x="370" y="0" width="30" height="400" fill="#cbd5e1" />
          <rect x="0" y="370" width="400" height="30" fill="#cbd5e1" />

          {/* Generic campus buildings */}
          <circle cx="180" cy="120" r="30" fill="#bae6fd" stroke="#7dd3fc" strokeWidth="2" />
          <path
            d="M 200 170 h 40 v 60 h -40 z M 180 190 h 80 v 20 h -80 z"
            fill="#94a3b8"
          />
          <path d="M 30 160 Q 70 200 30 240" fill="none" stroke="#ef4444" strokeWidth="8" />
          <rect x="80" y="150" width="40" height="150" fill="#cbd5e1" rx="4" />
          <rect x="300" y="300" width="70" height="70" fill="#fde047" opacity="0.6" />
        </svg>

        {/* Location markers */}
        {locations.map((loc) => (
          <button
            key={loc.id}
            type="button"
            onClick={() => onLocationSelect(loc.name)}
            style={{ left: loc.x, top: loc.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-20"
          >
            <div
              className={`flex items-center justify-center h-7 w-7 rounded-full shadow-md transition-all ${
                selectedLocation === loc.name
                  ? "bg-primary text-white scale-125"
                  : "bg-white text-primary border border-primary hover:bg-primary/5"
              }`}
            >
              <MapPin className="h-4 w-4" />
            </div>
            <span className="absolute top-8 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-[9px] font-bold text-white opacity-0 group-hover:opacity-100 shadow-lg pointer-events-none transition-opacity">
              {loc.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
