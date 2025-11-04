import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Activity, Thermometer, Flame, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

function StatCard({ icon: Icon, label, value, unit, accent = 'emerald' }) {
  const ring = {
    emerald: 'ring-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    orange: 'ring-orange-400/30 bg-orange-400/10 text-orange-300',
    sky: 'ring-sky-400/30 bg-sky-400/10 text-sky-300',
  }[accent];

  return (
    <div className={`flex flex-1 items-center justify-between rounded-xl border border-white/10 px-4 py-3 backdrop-blur-sm ${ring}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/30">
          <Icon size={18} />
        </div>
        <div className="text-sm opacity-80">{label}</div>
      </div>
      <div className="text-right">
        <div className="text-xl font-semibold tracking-tight">{value}<span className="ml-1 text-xs opacity-70">{unit}</span></div>
      </div>
    </div>
  );
}

export default function SensorPanel() {
  const [streaming, setStreaming] = useState(false);
  const [temp, setTemp] = useState(22.5);
  const [gas, setGas] = useState(350);
  const [aqi, setAqi] = useState(42);
  const [riskLevel, setRiskLevel] = useState('Normal');
  const [riskScore, setRiskScore] = useState(10);
  const timerRef = useRef(null);

  const riskColor = useMemo(() => {
    if (riskLevel === 'High risk') return 'bg-red-500/10 text-red-300 ring-red-400/30';
    if (riskLevel === 'Elevated') return 'bg-amber-500/10 text-amber-300 ring-amber-400/30';
    return 'bg-emerald-500/10 text-emerald-300 ring-emerald-400/30';
  }, [riskLevel]);

  const assessRisk = async (t, g, a) => {
    try {
      if (!API_BASE) return; // no backend configured
      const res = await fetch(`${API_BASE}/api/insights/assess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ temperature_c: t, gas_ppm: g, aqi: a }),
      });
      if (res.ok) {
        const data = await res.json();
        setRiskLevel(data.level);
        setRiskScore(data.score);
      }
    } catch {}
  };

  const pushReading = async (t, g, a) => {
    try {
      if (!API_BASE) return;
      const payload = {
        timestamp: new Date().toISOString(),
        temperature_c: t,
        gas_ppm: g,
        aqi: a,
        location: { lat: 0, lng: 0 },
        source: 'simulator',
      };
      await fetch(`${API_BASE}/api/sensors/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {}
  };

  const tick = () => {
    setTemp((tPrev) => {
      const t = Number((tPrev + (Math.random() - 0.5) * 0.6).toFixed(1));
      setTimeout(() => assessRisk(t, gas, aqi), 0);
      setTimeout(() => pushReading(t, gas, aqi), 0);
      return t;
    });
    setGas((gPrev) => Math.max(250, Math.min(1200, Math.round(gPrev + (Math.random() - 0.45) * 25))));
    setAqi((aPrev) => Math.max(10, Math.min(180, Math.round(aPrev + (Math.random() - 0.45) * 5))));
  };

  const startStream = () => {
    if (timerRef.current) return;
    setStreaming(true);
    timerRef.current = setInterval(tick, 900);
  };

  const stopStream = () => {
    setStreaming(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => () => stopStream(), []);

  return (
    <section className="relative bg-slate-950 py-12 text-white">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Live sensor stream</h2>
            <p className="text-white/70">Simulated Raspberry Pi feed for temperature and gas sensors.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ring-1 ${riskColor}`}>
              <Activity size={14} /> {riskLevel} <span className="ml-1 opacity-60">({riskScore})</span>
            </span>
            {streaming ? (
              <button onClick={stopStream} className="rounded-lg bg-white/10 px-4 py-2 text-sm ring-1 ring-white/20 hover:bg-white/15">
                Pause
              </button>
            ) : (
              <button onClick={startStream} className="rounded-lg bg-emerald-500 px-4 py-2 text-sm text-slate-950 shadow hover:bg-emerald-400">
                Start stream
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard icon={Thermometer} label="Temperature" value={temp} unit="°C" accent="orange" />
          <StatCard icon={Flame} label="Gas (ppm)" value={gas} unit="ppm" accent="emerald" />
          <StatCard icon={Gauge} label="Air Quality Index" value={aqi} unit="AQI" accent="sky" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-4"
        >
          <div className="mb-3 text-sm text-white/70">Recent readings</div>
          <div className="grid grid-cols-3 gap-3 text-xs text-white/70 md:text-sm">
            <div className="rounded-lg bg-black/30 p-3">
              <div className="mb-1 opacity-70">Temperature</div>
              <div className="text-white">{temp} °C</div>
            </div>
            <div className="rounded-lg bg-black/30 p-3">
              <div className="mb-1 opacity-70">Gas</div>
              <div className="text-white">{gas} ppm</div>
            </div>
            <div className="rounded-lg bg-black/30 p-3">
              <div className="mb-1 opacity-70">AQI</div>
              <div className="text-white">{aqi}</div>
            </div>
          </div>
          {!API_BASE && (
            <div className="mt-3 text-xs text-white/50">Tip: Set VITE_BACKEND_URL to enable logging and AI insights.</div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
