"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      setError("");
      setOutput("✅ Valid JSON!");
    } catch (e) {
      setError("❌ " + (e as Error).message);
      setOutput("");
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <ToolPageWrapper title="JSON Formatter & Validator" description="Format, minify, and validate JSON data with instant feedback.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Input JSON</label>
          <textarea className="tool-textarea" placeholder='{"key": "value", "array": [1, 2, 3]}' value={input} onChange={e => setInput(e.target.value)} />
          <div className="flex flex-wrap gap-2 mt-4">
            <button className="btn-primary" onClick={formatJson}>Format</button>
            <button className="btn-secondary" onClick={minifyJson}>Minify</button>
            <button className="btn-secondary" onClick={validateJson}>Validate</button>
            <select className="tool-input w-24" value={indent} onChange={e => setIndent(Number(e.target.value))}>
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={1}>1 tab</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Output</label>
          {error ? (
            <div className="tool-output text-[var(--error)]">{error}</div>
          ) : (
            <div className="tool-output">{output}</div>
          )}
          {output && !error && (
            <button className="btn-secondary mt-3" onClick={copyOutput}>📋 Copy</button>
          )}
        </div>
      </div>
      <div className="mt-8 text-sm text-[var(--text-secondary)] prose prose-invert">
        <h3 className="text-[var(--text-primary)]">How to use JSON Formatter</h3>
        <p>Paste your JSON data in the input field above. Click <strong>Format</strong> to beautify it with proper indentation, <strong>Minify</strong> to compress it, or <strong>Validate</strong> to check for syntax errors. All processing happens in your browser.</p>
      </div>
    </ToolPageWrapper>
  );
}
