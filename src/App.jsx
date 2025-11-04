import React from 'react';
import Hero3D from './components/Hero3D';
import SensorPanel from './components/SensorPanel';
import InsightsSection from './components/InsightsSection';
import DatasetSection from './components/DatasetSection';
import { Rocket } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-500 text-slate-950">
              <Rocket size={18} />
            </div>
            <span className="text-sm font-medium tracking-wide">TwinEdge Safety Lab</span>
          </div>
          <nav className="flex items-center gap-4 text-xs text-white/70 md:text-sm">
            <a href="#sensors" className="hover:text-white">Sensors</a>
            <a href="#insights" className="hover:text-white">Insights</a>
            <a href="#datasets" className="hover:text-white">Datasets</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero3D />
        <div id="sensors">
          <SensorPanel />
        </div>
        <div id="insights">
          <InsightsSection />
        </div>
        <div id="datasets">
          <DatasetSection />
        </div>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/80 py-6">
        <div className="mx-auto w-full max-w-7xl px-6 text-xs text-white/60">
          Built for immersive, hardware-light disaster response training. Connect Raspberry Pi sensors when ready.
        </div>
      </footer>
    </div>
  );
}
