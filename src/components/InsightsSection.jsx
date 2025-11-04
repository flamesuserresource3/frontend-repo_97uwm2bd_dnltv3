import React from 'react';
import { Sparkles, Shield, Cpu, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const insights = [
  {
    icon: Shield,
    title: 'Predictive hazard scoring',
    body: 'Real-time thresholds transform temperature and gas spikes into risk scores for faster decisions.',
    tone: 'from-emerald-400/20 to-emerald-400/0',
  },
  {
    icon: Cpu,
    title: 'Edge + cloud AI loop',
    body: 'Process on-device for speed, refine in the cloud with historical datasets to improve accuracy.',
    tone: 'from-indigo-400/20 to-indigo-400/0',
  },
  {
    icon: Database,
    title: 'Ground-truthed datasets',
    body: 'Log structured events to a robust database—perfect for supervised learning and after-action reviews.',
    tone: 'from-amber-400/20 to-amber-400/0',
  },
  {
    icon: Sparkles,
    title: 'AR/VR-ready overlays',
    body: 'Surface heat maps, gas plumes, and evacuation cues inside immersive training environments.',
    tone: 'from-pink-400/20 to-pink-400/0',
  },
];

export default function InsightsSection() {
  return (
    <section className="bg-slate-950 py-12 text-white">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">AI-driven safety insights</h2>
          <p className="text-white/70">Transform sensor feeds and real-world datasets into actionable intelligence for safer, faster drills.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {insights.map((it, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4`}
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${it.tone}`} />
              <div className="relative z-10">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-black/30">
                  <it.icon size={18} />
                </div>
                <div className="mb-1 text-lg font-medium">{it.title}</div>
                <p className="text-sm text-white/70">{it.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
