import React, { useMemo, useRef, useEffect } from 'react'

// Simple SVG tree drawing with animated growth
function YggdrasilCanvas({ branches = [] }) {
  const svgRef = useRef(null)

  // Normalize and layout branches around the trunk
  const laidOut = useMemo(() => {
    const radiusBase = 120
    const angleStep = Math.PI / Math.max(6, branches.length + 2)
    return branches.map((b, i) => {
      const level = 1 + (i % 3)
      const angle = -Math.PI / 2 + (i - (branches.length - 1) / 2) * angleStep
      const length = radiusBase + level * 40 + (b.years || 1) * 6
      return { ...b, angle, length, level }
    })
  }, [branches])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    // trigger CSS animations
    const paths = svg.querySelectorAll('path[data-animate="grow"]')
    paths.forEach((p, idx) => {
      const total = p.getTotalLength()
      p.style.strokeDasharray = `${total}`
      p.style.strokeDashoffset = `${total}`
      // staggered reveal
      setTimeout(() => {
        p.style.transition = 'stroke-dashoffset 1600ms ease-in-out'
        p.style.strokeDashoffset = '0'
      }, 150 * idx)
    })
  }, [laidOut])

  const trunkHeight = 220

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <svg
        ref={svgRef}
        viewBox="0 0 800 600"
        className="w-full h-[520px] md:h-[600px]"
        role="img"
        aria-label="Yggdrasil tree with work experience branches"
      >
        {/* background gradient */}
        <defs>
          <linearGradient id="bark" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2e7d32" />
            <stop offset="100%" stopColor="#1b5e20" />
          </linearGradient>
          <linearGradient id="leaf" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>

        {/* trunk */}
        <path
          d={`M400 560 C 390 ${560 - trunkHeight / 2}, 410 ${560 - trunkHeight / 2}, 400 ${560 - trunkHeight}`}
          stroke="url(#bark)"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
          data-animate="grow"
        />

        {/* canopy glow */}
        <circle cx="400" cy={560 - trunkHeight - 20} r="120" fill="url(#leaf)" opacity="0.18" />

        {/* branches */}
        {laidOut.map((b, i) => {
          const startX = 400
          const startY = 560 - trunkHeight + b.level * -10
          const endX = startX + Math.cos(b.angle) * b.length
          const endY = startY + Math.sin(b.angle) * b.length

          const ctrl1X = startX + Math.cos(b.angle - 0.6) * (b.length * 0.3)
          const ctrl1Y = startY + Math.sin(b.angle - 0.6) * (b.length * 0.3)
          const ctrl2X = startX + Math.cos(b.angle) * (b.length * 0.7)
          const ctrl2Y = startY + Math.sin(b.angle) * (b.length * 0.7)

          const path = `M ${startX} ${startY} C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, ${endX} ${endY}`

          return (
            <g key={i}>
              <path d={path} stroke="url(#bark)" strokeWidth={8 - b.level} fill="none" strokeLinecap="round" data-animate="grow" />
              {/* leaves cluster */}
              <circle cx={endX} cy={endY} r="10" fill="url(#leaf)" />
              <circle cx={endX + 10} cy={endY - 6} r="7" fill="url(#leaf)" opacity="0.9" />
              <circle cx={endX - 9} cy={endY - 8} r="6" fill="url(#leaf)" opacity="0.8" />

              {/* label */}
              <foreignObject x={endX - 120} y={endY - 70} width="240" height="120">
                <div className="bg-white/80 backdrop-blur rounded-xl shadow-sm border border-emerald-100 p-3">
                  <div className="text-emerald-800 font-semibold leading-tight">{b.title}</div>
                  <div className="text-emerald-700 text-sm">{b.company} · {b.years} yrs</div>
                  {b.summary && (
                    <div className="mt-1 text-emerald-900/80 text-sm leading-snug line-clamp-3">{b.summary}</div>
                  )}
                  {b.skills?.length ? (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {b.skills.slice(0, 4).map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs border border-emerald-100">{s}</span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </foreignObject>
            </g>
          )
        })}

        {/* roots */}
        <path d="M400 560 C 360 580, 360 590, 340 598" stroke="#795548" strokeWidth="4" fill="none" opacity="0.5" />
        <path d="M400 560 C 420 585, 440 595, 458 600" stroke="#795548" strokeWidth="4" fill="none" opacity="0.5" />
      </svg>
    </div>
  )
}

export default YggdrasilCanvas
