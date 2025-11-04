import React, { useRef, useState } from 'react';
import { Upload, Database, FileSpreadsheet } from 'lucide-react';

export default function DatasetSection() {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState('');

  const handleSelect = () => inputRef.current?.click();
  const onChange = (e) => {
    const f = e.target.files?.[0];
    if (f) setFileName(`${f.name} • ${(f.size / 1024).toFixed(1)} KB`);
  };

  return (
    <section className="bg-slate-950 pb-16 pt-6 text-white">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold md:text-2xl">Datasets and logging</h3>
            <p className="text-white/70">Bring historical incidents and training runs to continuously improve models.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="col-span-2 rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-black/30">
                <Upload size={18} />
              </div>
              <div className="text-lg font-medium">Upload dataset (CSV/JSON)</div>
            </div>
            <input ref={inputRef} type="file" accept=".csv,.json" className="hidden" onChange={onChange} />
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={handleSelect} className="rounded-lg bg-indigo-500 px-4 py-2 text-sm text-slate-950 shadow hover:bg-indigo-400">
                Choose file
              </button>
              {fileName && <div className="text-sm text-white/80">{fileName}</div>}
            </div>
            <div className="mt-4 text-xs text-white/60">Files are processed client-side for now. Connect the backend to store and index in your database.</div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-black/30">
                <Database size={18} />
              </div>
              <div className="text-lg font-medium">Stream schema</div>
            </div>
            <div className="rounded-lg bg-black/40 p-3 text-xs text-white/80">
              {`{
  timestamp: ISOString,
  temperature_c: number,
  gas_ppm: number,
  aqi: number,
  location: { lat: number, lng: number },
  notes?: string
}`}
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
              <FileSpreadsheet size={14} /> Export logs for after-action review
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
