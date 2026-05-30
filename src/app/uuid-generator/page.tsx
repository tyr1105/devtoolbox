"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

function uuidv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);

  const generate = () => {
    const result = Array.from({ length: count }, () => uuidv4());
    setUuids(result);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
  };

  return (
    <ToolPageWrapper title="UUID Generator" description="Generate random UUID v4 identifiers. Create one or many at once.">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Count</label>
            <input type="number" className="tool-input w-24" min={1} max={1000} value={count} onChange={e => setCount(Number(e.target.value))} />
          </div>
          <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer">
            <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} className="w-4 h-4" />
            Uppercase
          </label>
          <button className="btn-primary" onClick={generate}>Generate</button>
          {uuids.length > 0 && <button className="btn-secondary" onClick={copyAll}>📋 Copy All</button>}
        </div>
        {uuids.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Generated UUIDs</label>
            <div className="tool-output max-h-[500px]">
              {uuids.map((u, i) => <div key={i} className="py-1 border-b border-[var(--border-color)] last:border-0 font-mono text-[var(--success)]">{uppercase ? u.toUpperCase() : u}</div>)}
            </div>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
