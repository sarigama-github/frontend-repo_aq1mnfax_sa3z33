import React from 'react'

function TimelineLegend({ totalYears }) {
  return (
    <div className="w-full max-w-5xl mx-auto mt-6 md:mt-8">
      <div className="flex items-center justify-between text-emerald-900/80 text-xs md:text-sm">
        <span className="font-medium">Roots</span>
        <div className="flex-1 h-px mx-3 bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300" />
        <span className="font-medium">Canopy · {totalYears} yrs</span>
      </div>
    </div>
  )
}

export default TimelineLegend
