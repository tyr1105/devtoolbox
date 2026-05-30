"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

export default function UrlEncoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const process = () => {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (e) {
      setError("Invalid input for " + mode + " operation");
      setOutput("");
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageWrapper title="URL Encoder / Decoder" description="Encode or decode URL components.">
      <div className="tool-card p-6">
        {/* Mode toggle */}
        <div className="flex gap-2 mb-4">
          <button
            className={mode === "encode" ? "btn-primary" : "btn-secondary"}
            onClick={() => setMode("encode")}
          >
            Encode
          </button>
          <button
            className={mode === "decode" ? "btn-primary" : "btn-secondary"}
            onClick={() => setMode("decode")}
          >
            Decode
          </button>
        </div>

        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Input</label>
        <textarea
          className="tool-textarea h-32 mb-4"
          placeholder={mode === "encode" ? "Enter text to URL encode..." : "Enter URL-encoded text to decode..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="btn-primary mb-4" onClick={process}>
          {mode === "encode" ? "Encode" : "Decode"}
        </button>

        {error && <p className="text-[var(--error)] text-sm mb-2">{error}</p>}

        {output && (
          <>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-[var(--text-secondary)]">Output</label>
              <button className="btn-secondary text-xs px-2 py-1" onClick={copyOutput}>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="tool-output p-3">
              <p className="font-mono text-sm text-[var(--text-primary)] break-all">{output}</p>
            </div>
          </>
        )}
      </div>
    </ToolPageWrapper>
  );
}
