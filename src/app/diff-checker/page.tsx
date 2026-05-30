"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  content: string;
}

function simpleDiff(oldLines: string[], newLines: string[]): DiffLine[] {
  const result: DiffLine[] = [];
  const maxLen = Math.max(oldLines.length, newLines.length);
  for (let i = 0; i < maxLen; i++) {
    const oldLine = oldLines[i];
    const newLine = newLines[i];
    if (oldLine === undefined && newLine !== undefined) {
      result.push({ type: "added", content: newLine });
    } else if (oldLine !== undefined && newLine === undefined) {
      result.push({ type: "removed", content: oldLine });
    } else if (oldLine === newLine) {
      result.push({ type: "unchanged", content: oldLine });
    } else {
      result.push({ type: "removed", content: oldLine });
      result.push({ type: "added", content: newLine });
    }
  }
  return result;
}

export default function DiffChecker() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [diffResult, setDiffResult] = useState<DiffLine[]>([]);
  const [stats, setStats] = useState({ added: 0, removed: 0, unchanged: 0 });

  const runDiff = () => {
    const oldLines = textA.split("\n");
    const newLines = textB.split("\n");
    const result = simpleDiff(oldLines, newLines);
    setDiffResult(result);
    setStats({
      added: result.filter((l) => l.type === "added").length,
      removed: result.filter((l) => l.type === "removed").length,
      unchanged: result.filter((l) => l.type === "unchanged").length,
    });
  };

  const lineColors: Record<string, string> = {
    added: "bg-green-900/30 text-green-300 border-l-4 border-green-500",
    removed: "bg-red-900/30 text-red-300 border-l-4 border-red-500",
    unchanged: "text-[var(--text-secondary)] border-l-4 border-transparent",
  };

  const linePrefix: Record<string, string> = {
    added: "+",
    removed: "-",
    unchanged: " ",
  };

  return (
    <ToolPageWrapper title="Diff Checker" description="Compare two texts and see the differences line by line.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Original Text</label>
          <textarea
            className="tool-textarea h-64"
            placeholder="Paste original text here..."
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Modified Text</label>
          <textarea
            className="tool-textarea h-64"
            placeholder="Paste modified text here..."
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
          />
        </div>
      </div>

      <button className="btn-primary mb-4" onClick={runDiff}>
        Compare
      </button>

      {diffResult.length > 0 && (
        <>
          <div className="flex gap-4 mb-4 text-sm">
            <span className="text-green-400">+{stats.added} added</span>
            <span className="text-red-400">-{stats.removed} removed</span>
            <span className="text-[var(--text-secondary)]">{stats.unchanged} unchanged</span>
          </div>
          <div className="tool-output p-4 font-mono text-sm overflow-x-auto">
            {diffResult.map((line, i) => (
              <div key={i} className={lineColors[line.type] + " px-2 py-0.5"}>
                <span className="opacity-60 mr-2">{linePrefix[line.type]}</span>
                {line.content}
              </div>
            ))}
          </div>
        </>
      )}
    </ToolPageWrapper>
  );
}
