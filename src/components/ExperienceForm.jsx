import React, { useState } from 'react'

function ExperienceForm({ onAdd }) {
  const [form, setForm] = useState({ title: '', company: '', years: 1, summary: '', skills: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      title: form.title || 'Role',
      company: form.company || 'Company',
      years: Math.max(0.5, Number(form.years) || 1),
      summary: form.summary.trim(),
      skills: form.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    }
    onAdd?.(payload)
    setForm({ title: '', company: '', years: 1, summary: '', skills: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto bg-white/70 backdrop-blur rounded-2xl border border-emerald-100 p-4 md:p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">
        <input
          type="text"
          placeholder="Title (e.g., Senior Engineer)"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="md:col-span-2 px-3 py-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          required
        />
        <input
          type="text"
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="md:col-span-2 px-3 py-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          required
        />
        <input
          type="number"
          step="0.5"
          min="0.5"
          placeholder="Years"
          value={form.years}
          onChange={(e) => setForm({ ...form, years: e.target.value })}
          className="px-3 py-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          required
        />
        <input
          type="text"
          placeholder="Key skills (comma separated)"
          value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
          className="md:col-span-3 px-3 py-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <input
          type="text"
          placeholder="One-line summary"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          className="md:col-span-2 px-3 py-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>
      <div className="mt-4 flex justify-end">
        <button type="submit" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm">
          Add Branch
        </button>
      </div>
    </form>
  )
}

export default ExperienceForm
