"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const process = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  return (
    <ToolPageWrapper title="Base64 Encoder / Decoder" description="Encode text to Base64 or decode Base64 strings back to readable text. Supports Unicode.">
      <div className="space-y-4">
        <div className="flex gap-2">
          <button className={mode === "encode" ? "btn-primary" : "btn-secondary"} onClick={() => setMode("encode")}>Encode</button>
          <button className={mode === "decode" ? "btn-primary" : "btn-secondary"} onClick={() => setMode("decode")}>Decode</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Input ({mode === "encode" ? "Plain Text" : "Base64"})</label>
            <textarea className="tool-textarea" placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."} value={input} onChange={e => setInput(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Output ({mode === "encode" ? "Base64" : "Plain Text"})</label>
            {error ? <div className="tool-output text-[var(--error)]">{error}</div> : <div className="tool-output">{output}</div>}
            {output && <button className="btn-secondary mt-3" onClick={() => navigator.clipboard.writeText(output)}>📋 Copy</button>}
          </div>
        </div>
        <button className="btn-primary" onClick={process}>Convert</button>
      </div>
    </ToolPageWrapper>
  );
}
