"use client";
import { useState, useMemo } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

interface CronField {
  label: string;
  value: string;
  options: { label: string; value: string }[];
}

function parseCronToDescription(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return "Invalid cron expression";
  const [min, hr, day, mon, dow] = parts;
  const segments: string[] = [];
  if (min === "*" && hr === "*" && day === "*" && mon === "*" && dow === "*") return "Every minute";
  if (hr !== "*") segments.push(`at minute ${min === "*" ? "every" : min} of hour ${hr}`);
  if (day !== "*") segments.push(`on day ${day} of the month`);
  if (mon !== "*") segments.push(`in month${mon}`);
  if (dow !== "*") {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    segments.push(`on ${dow === "*" ? "every day" : days[parseInt(dow)] || `weekday ${dow}`}`);
  }
  if (min !== "*" && hr === "*" && segments.length === 0) segments.push(`every hour at minute ${min}`);
  return segments.join(" ") || `Custom: ${expr}`;
}

function getNextRuns(expr: string, count: number): Date[] {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return [];
  const [minS, hrS, dayS, monS, dowS] = parts;
  const results: Date[] = [];
  const start = new Date();
  start.setSeconds(0, 0);
  start.setMinutes(start.getMinutes() + 1);

  for (let i = 0; i < 525600 && results.length < count; i++) {
    const d = new Date(start.getTime() + i * 60000);
    const min = String(d.getMinutes());
    const hr = String(d.getHours());
    const day = String(d.getDate());
    const mon = String(d.getMonth() + 1);
    const dow = String(d.getDay());

    const match = (pattern: string, val: string) => pattern === "*" || pattern === val || pattern.split(",").includes(val);
    if (match(minS, min) && match(hrS, hr) && match(dayS, day) && match(monS, mon) && match(dowS, dow)) {
      results.push(new Date(d));
    }
  }
  return results;
}

const PRESETS = [
  { label: "Every minute", value: "* * * * *" },
  { label: "Every hour", value: "0 * * * *" },
  { label: "Every day at midnight", value: "0 0 * * *" },
  { label: "Every Monday at 9 AM", value: "0 9 * * 1" },
  { label: "First of every month", value: "0 0 1 * *" },
  { label: "Every weekday at 9 AM", value: "0 9 * * 1-5" },
];

export default function CronBuilder() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [day, setDay] = useState("*");
  const [month, setMonth] = useState("*");
  const [weekday, setWeekday] = useState("*");
  const [copied, setCopied] = useState(false);

  const expression = [minute, hour, day, month, weekday].join(" ");
  const description = parseCronToDescription(expression);
  const nextRuns = useMemo(() => getNextRuns(expression, 5), [expression]);

  const applyPreset = (val: string) => {
    const [m, h, d, mo, w] = val.split(" ");
    setMinute(m); setHour(h); setDay(d); setMonth(mo); setWeekday(w);
  };

  const fields: CronField[] = [
    {
      label: "Minute",
      value: minute,
      options: [{ label: "Every (*)", value: "*" }, ...Array.from({ length: 60 }, (_, i) => ({ label: String(i), value: String(i) }))],
    },
    {
      label: "Hour",
      value: hour,
      options: [{ label: "Every (*)", value: "*" }, ...Array.from({ length: 24 }, (_, i) => ({ label: String(i), value: String(i) }))],
    },
    {
      label: "Day of Month",
      value: day,
      options: [{ label: "Every (*)", value: "*" }, ...Array.from({ length: 31 }, (_, i) => ({ label: String(i + 1), value: String(i + 1) }))],
    },
    {
      label: "Month",
      value: month,
      options: [
        { label: "Every (*)", value: "*" },
        ...["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((n, i) => ({ label: `${i + 1} (${n})`, value: String(i + 1) })),
      ],
    },
    {
      label: "Weekday",
      value: weekday,
      options: [
        { label: "Every (*)", value: "*" },
        ...["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((n, i) => ({ label: `${i} (${n})`, value: String(i) })),
      ],
    },
  ];
  const setters = [setMinute, setHour, setDay, setMonth, setWeekday];

  return (
    <ToolPageWrapper title="Cron Expression Builder" description="Build and understand cron expressions visually.">
      {/* Presets */}
      <div className="tool-card p-4 mb-6">
        <h2 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Common Presets</h2>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.value} className="btn-secondary text-xs" onClick={() => applyPreset(p.value)}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Builder */}
      <div className="tool-card p-6 mb-6">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Builder</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {fields.map((field, i) => (
            <div key={field.label}>
              <label className="block text-xs text-[var(--text-secondary)] mb-1">{field.label}</label>
              <input
                type="text"
                className="tool-input w-full"
                value={field.value}
                onChange={(e) => setters[i](e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="tool-card p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Expression</h2>
          <button
            className="btn-secondary text-xs"
            onClick={() => { navigator.clipboard.writeText(expression); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-2xl font-mono text-[var(--accent)] mb-2">{expression}</p>
        <p className="text-[var(--text-secondary)] text-sm">{description}</p>
      </div>

      {/* Next runs */}
      {nextRuns.length > 0 && (
        <div className="tool-card p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Next 5 Run Times</h2>
          <ul className="space-y-1">
            {nextRuns.map((d, i) => (
              <li key={i} className="font-mono text-sm text-[var(--text-secondary)]">
                {d.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </ToolPageWrapper>
  );
}
