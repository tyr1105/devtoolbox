"use client";
import { useState, useMemo } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("");
  const [error, setError] = useState("");

  const results = useMemo(() => {
    if (!pattern || !testStr) return null;
    try {
      const regex = new RegExp(pattern, flags);
      const matches: { match: string; index: number; groups: string[] }[] = [];
      if (flags.includes("g")) {
        let m;
        while ((m = regex.exec(testStr)) !== null) {
          matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
          if (!m[0]) break; // avoid infinite loop on empty matches
        }
      } else {
        const m = regex.exec(testStr);
        if (m) matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
      }
      setError("");
      return matches;
    } catch (e) {
      setError((e as Error).message);
      return null;
    }
  }, [pattern, flags, testStr]);

  const highlighted = useMemo(() => {
    if (!pattern || !testStr || error) return testStr;
    try {
      const regex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const parts: { text: string; isMatch: boolean }[] = [];
      let lastIdx = 0;
      let m;
      while ((m = regex.exec(testStr)) !== null) {
        if (m.index > lastIdx) parts.push({ text: testStr.slice(lastIdx, m.index), isMatch: false });
        parts.push({ text: m[0], isMatch: true });
        lastIdx = m.index + m[0].length;
        if (!m[0]) break;
      }
      if (lastIdx < testStr.length) parts.push({ text: testStr.slice(lastIdx), isMatch: false });
      return parts;
    } catch {
      return testStr;
    }
  }, [pattern, flags, testStr, error]);

  return (
    <ToolPageWrapper title="Regex Tester" description="Test regular expressions with real-time matching, group captures, and visual highlighting.">
      <div className="space-y-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Pattern</label>
            <input className="tool-input font-mono" placeholder="Enter regex pattern (e.g., \d+)" value={pattern} onChange={e => setPattern(e.target.value)} />
          </div>
          <div className="w-32">
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Flags</label>
            <input className="tool-input font-mono" placeholder="gimsuy" value={flags} onChange={e => setFlags(e.target.value)} />
          </div>
        </div>
        {error && <div className="text-[var(--error)] text-sm">Regex error: {error}</div>}
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Test String</label>
          <textarea className="tool-textarea" placeholder="Enter text to test against..." value={testStr} onChange={e => setTestStr(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Highlighted Matches</label>
          <div className="tool-output min-h-[80px]">
            {typeof highlighted === "string" ? highlighted : highlighted.map((part, i) => part.isMatch ? <mark key={i} className="bg-[var(--accent)] text-white rounded px-0.5">{part.text}</mark> : <span key={i}>{part.text}</span>)}
          </div>
        </div>
        {results && (
          <div>
            <h3 className="text-sm font-semibold text-[var(--accent)] mb-2">Matches ({results.length})</h3>
            {results.length === 0 ? <p className="text-sm text-[var(--text-secondary)]">No matches found.</p> : (
              <div className="space-y-2">
                {results.map((r, i) => (
                  <div key={i} className="bg-[var(--bg-card)] p-3 rounded-lg border border-[var(--border-color)]">
                    <span className="text-[var(--success)] font-mono">{r.match}</span>
                    <span className="text-[var(--text-secondary)] text-sm ml-3">index: {r.index}</span>
                    {r.groups.length > 0 && <span className="text-[var(--text-secondary)] text-sm ml-3">groups: {r.groups.map((g, gi) => <span key={gi} className="text-[var(--warning)]">${gi + 1}={g} </span>)}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
