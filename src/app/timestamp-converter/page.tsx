"use client";
import { useState, useEffect } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

export default function TimestampConverter() {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [timestampInput, setTimestampInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [convertedDate, setConvertedDate] = useState("");
  const [convertedTimestamp, setConvertedTimestamp] = useState("");
  const [tsUnit, setTsUnit] = useState<"seconds" | "milliseconds">("seconds");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTimestampConvert = () => {
    const ts = Number(timestampInput);
    if (isNaN(ts)) return;
    const ms = tsUnit === "seconds" ? ts * 1000 : ts;
    const date = new Date(ms);
    setConvertedDate(date.toLocaleString());
  };

  const handleDateConvert = () => {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return;
    setConvertedTimestamp(String(Math.floor(date.getTime() / 1000)));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageWrapper
      title="Timestamp Converter"
      description="Convert between Unix timestamps and human-readable dates."
    >
      {/* Live Timestamp */}
      <div className="tool-card p-4 mb-6">
        <div className="text-center">
          <p className="text-[var(--text-secondary)] text-sm mb-1">Current Unix Timestamp (seconds)</p>
          <button
            onClick={() => copyToClipboard(String(now))}
            className="text-3xl font-mono font-bold text-[var(--accent)] hover:text-[var(--accent-hover)] cursor-pointer transition-colors"
          >
            {now}
          </button>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {new Date().toLocaleString()} &middot; {copied ? "Copied!" : "Click to copy"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Timestamp to Date */}
        <div className="tool-card p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Timestamp → Date</h2>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              className="tool-input flex-1"
              placeholder="Enter Unix timestamp"
              value={timestampInput}
              onChange={(e) => setTimestampInput(e.target.value)}
            />
            <select
              className="tool-input w-36"
              value={tsUnit}
              onChange={(e) => setTsUnit(e.target.value as "seconds" | "milliseconds")}
            >
              <option value="seconds">Seconds</option>
              <option value="milliseconds">Milliseconds</option>
            </select>
          </div>
          <button className="btn-primary w-full mb-3" onClick={handleTimestampConvert}>
            Convert to Date
          </button>
          {convertedDate && (
            <div className="tool-output p-3">
              <p className="text-[var(--text-primary)]">{convertedDate}</p>
            </div>
          )}
        </div>

        {/* Date to Timestamp */}
        <div className="tool-card p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Date → Timestamp</h2>
          <input
            type="datetime-local"
            className="tool-input w-full mb-3"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
          <button className="btn-primary w-full mb-3" onClick={handleDateConvert}>
            Convert to Timestamp
          </button>
          {convertedTimestamp && (
            <div className="tool-output p-3 flex justify-between items-center">
              <p className="text-[var(--text-primary)] font-mono">{convertedTimestamp}</p>
              <button
                className="btn-secondary text-xs px-2 py-1"
                onClick={() => copyToClipboard(convertedTimestamp)}
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </ToolPageWrapper>
  );
}
