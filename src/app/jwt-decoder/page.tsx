"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

interface JWTHeader { alg?: string; typ?: string; [k: string]: unknown }
interface JWTPayload { iss?: string; sub?: string; aud?: string; exp?: number; iat?: number; nbf?: number; [k: string]: unknown }

function b64UrlDecode(s: string): string {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return decodeURIComponent(escape(atob(s)));
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState<JWTHeader | null>(null);
  const [payload, setPayload] = useState<JWTPayload | null>(null);
  const [error, setError] = useState("");

  const decode = () => {
    try {
      const parts = token.split(".");
      if (parts.length < 2) throw new Error("Invalid JWT: must have at least 2 parts");
      setHeader(JSON.parse(b64UrlDecode(parts[0])));
      setPayload(JSON.parse(b64UrlDecode(parts[1])));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setHeader(null);
      setPayload(null);
    }
  };

  const fmtTime = (ts: number | undefined) => ts ? new Date(ts * 1000).toLocaleString() : "N/A";
  const isExpired = payload?.exp ? Date.now() / 1000 > payload.exp : false;

  return (
    <ToolPageWrapper title="JWT Decoder" description="Decode and inspect JSON Web Tokens — view header, payload, and expiration status.">
      <div className="space-y-4">
        <textarea className="tool-textarea" placeholder="Paste your JWT token here (eyJhbGciOi...)" value={token} onChange={e => setToken(e.target.value)} />
        <button className="btn-primary" onClick={decode}>Decode Token</button>
        {error && <div className="text-[var(--error)] text-sm">{error}</div>}
        {header && payload && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-[var(--accent)] mb-2">Header</h3>
              <pre className="tool-output">{JSON.stringify(header, null, 2)}</pre>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--accent)] mb-2">Payload</h3>
              <pre className="tool-output">{JSON.stringify(payload, null, 2)}</pre>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[var(--bg-card)] p-3 rounded-lg border border-[var(--border-color)]">
                <div className="text-xs text-[var(--text-secondary)]">Issued At</div>
                <div className="text-sm font-mono">{fmtTime(payload.iat)}</div>
              </div>
              <div className="bg-[var(--bg-card)] p-3 rounded-lg border border-[var(--border-color)]">
                <div className="text-xs text-[var(--text-secondary)]">Expires</div>
                <div className={`text-sm font-mono ${isExpired ? "text-[var(--error)]" : "text-[var(--success)]"}`}>{fmtTime(payload.exp)}</div>
              </div>
              <div className="bg-[var(--bg-card)] p-3 rounded-lg border border-[var(--border-color)]">
                <div className="text-xs text-[var(--text-secondary)]">Status</div>
                <div className={`text-sm font-bold ${isExpired ? "text-[var(--error)]" : "text-[var(--success)]"}`}>{isExpired ? "❌ EXPIRED" : "✅ VALID"}</div>
              </div>
              <div className="bg-[var(--bg-card)] p-3 rounded-lg border border-[var(--border-color)]">
                <div className="text-xs text-[var(--text-secondary)]">Algorithm</div>
                <div className="text-sm font-mono">{header.alg || "N/A"}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
