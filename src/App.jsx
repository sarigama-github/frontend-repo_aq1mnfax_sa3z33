import React, { useMemo, useState } from 'react'
import Header from './components/Header'
import YggdrasilCanvas from './components/YggdrasilCanvas'
import TimelineLegend from './components/TimelineLegend'
import ExperienceForm from './components/ExperienceForm'

function App() {
  const [experiences, setExperiences] = useState([
    {
      title: 'Frontend Engineer',
      company: 'Bifrost Labs',
      years: 2.5,
      summary: 'Built delightful UIs and design systems across platforms.',
      skills: ['React', 'TypeScript', 'Tailwind', 'Testing'],
    },
    {
      title: 'Full‑Stack Developer',
      company: 'Valhalla Tech',
      years: 3,
      summary: 'Owned features end-to-end with APIs, databases, and CI.',
      skills: ['FastAPI', 'MongoDB', 'Docker', 'CI/CD'],
    },
    {
      title: 'Product Engineer',
      company: 'Runes & Co.',
      years: 1.5,
      summary: 'Worked closely with design and PM to ship measurable impact.',
      skills: ['Product Thinking', 'A/B Testing', 'Analytics'],
    },
  ])

  const totalYears = useMemo(() => experiences.reduce((acc, e) => acc + (Number(e.years) || 0), 0).toFixed(1), [experiences])

  const handleAdd = (exp) => setExperiences((prev) => [...prev, exp])

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-50 text-emerald-900">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-emerald-300/20 blur-3xl" />
      </div>

      <main className="relative z-10 px-4 md:px-6 pt-6 md:pt-10 pb-16">
        <Header />

        <YggdrasilCanvas branches={experiences} />
        <TimelineLegend totalYears={totalYears} />

        <div className="mt-8">
          <ExperienceForm onAdd={handleAdd} />
        </div>

        <div className="mt-6 text-center text-emerald-900/70">
          Click Add Branch to grow your tree. Tip: reorder by changing input order.
        </div>
      </main>
    </div>
  )
}

export default App
