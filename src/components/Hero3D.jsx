import React from 'react';
import Spline from '@splinetool/react-spline';
import { Shield, Sparkles, Wifi } from 'lucide-react';

export default function Hero3D() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-slate-900 text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/WYFQ2aJq-6nMMlC0/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 pt-16 pb-24 md:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs backdrop-blur">
          <Wifi size={14} /> Live sensor-ready prototype
        </span>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
          AI-powered disaster response training
        </h1>
        <p className="max-w-2xl text-white/80 md:text-lg">
          Plug in Raspberry Pi temperature and gas sensors, stream data to the cloud, and unlock predictive hazard insights for immersive AR/VR simulations—no heavy hardware required.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-emerald-300 ring-1 ring-emerald-400/30">
            <Shield size={16} /> Safety-first intelligence
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-indigo-500/10 px-3 py-2 text-indigo-300 ring-1 ring-indigo-400/30">
            <Sparkles size={16} /> AR/VR-ready
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-900/95 to-transparent" />
    </section>
  );
}
