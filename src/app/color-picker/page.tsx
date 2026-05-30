"use client";
import { useState, useEffect, useCallback } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

interface RGB { r: number; g: number; b: number; }
interface HSL { h: number; s: number; l: number; }

function hexToRgb(hex: string): RGB | null {
  const m = hex.replace("#", "");
  if (m.length !== 6) return null;
  const r = parseInt(m.substring(0, 2), 16);
  const g = parseInt(m.substring(2, 4), 16);
  const b = parseInt(m.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r, g, b };
}

function rgbToHex(rgb: RGB): string {
  return "#" + [rgb.r, rgb.g, rgb.b].map((c) => Math.round(c).toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360, s = hsl.s / 100, l = hsl.l / 100;
  if (s === 0) { const v = Math.round(l * 255); return { r: v, g: v, b: v }; }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
}

export default function ColorPicker() {
  const [hex, setHex] = useState("#6366f1");
  const [rgb, setRgb] = useState("99, 102, 241");
  const [hsl, setHsl] = useState("239, 84%, 67%");
  const [copied, setCopied] = useState("");
  const [colorPickerVal, setColorPickerVal] = useState("#6366f1");

  const updateFromHex = useCallback((h: string) => {
    const rgbObj = hexToRgb(h);
    if (rgbObj) {
      setRgb(rgbObj.r + ", " + rgbObj.g + ", " + rgbObj.b);
      const hslObj = rgbToHsl(rgbObj);
      setHsl(hslObj.h + ", " + hslObj.s + "%, " + hslObj.l + "%");
      setColorPickerVal(h.startsWith("#") ? h : "#" + h);
    }
  }, []);

  const updateFromRgb = useCallback((r: string) => {
    const parts = r.split(",").map((s) => parseInt(s.trim()));
    if (parts.length === 3 && parts.every((p) => !isNaN(p))) {
      const rgbObj = { r: parts[0], g: parts[1], b: parts[2] };
      setHex(rgbToHex(rgbObj));
      const hslObj = rgbToHsl(rgbObj);
      setHsl(hslObj.h + ", " + hslObj.s + "%, " + hslObj.l + "%");
      setColorPickerVal(rgbToHex(rgbObj));
    }
  }, []);

  const updateFromHsl = useCallback((h: string) => {
    const match = h.match(/(\d+),\s*(\d+)%?,\s*(\d+)%?/);
    if (match) {
      const hslObj = { h: parseInt(match[1]), s: parseInt(match[2]), l: parseInt(match[3]) };
      const rgbObj = hslToRgb(hslObj);
      setRgb(rgbObj.r + ", " + rgbObj.g + ", " + rgbObj.b);
      setHex(rgbToHex(rgbObj));
      setColorPickerVal(rgbToHex(rgbObj));
    }
  }, []);

  useEffect(() => { updateFromHex(hex); }, [hex, updateFromHex]);

  const copy = (label: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <ToolPageWrapper title="Color Picker & Converter" description="Pick colors and convert between HEX, RGB, and HSL formats.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preview */}
        <div className="tool-card p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Color Preview</h2>
          <div
            className="w-full h-48 rounded-lg border border-[var(--border-color)] mb-4"
            style={{ backgroundColor: colorPickerVal }}
          />
          <input
            type="color"
            value={colorPickerVal}
            onChange={(e) => { setColorPickerVal(e.target.value); setHex(e.target.value); updateFromHex(e.target.value); }}
            className="w-full h-12 rounded cursor-pointer border border-[var(--border-color)]"
          />
        </div>

        {/* Values */}
        <div className="tool-card p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Color Values</h2>
          {[
            { label: "HEX", value: hex, setter: setHex, display: hex },
            { label: "RGB", value: rgb, setter: setRgb, display: "rgb(" + rgb + ")" },
            { label: "HSL", value: hsl, setter: setHsl, display: "hsl(" + hsl + ")" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 mb-3">
              <span className="text-sm font-mono text-[var(--text-secondary)] w-10">{item.label}</span>
              <input
                type="text"
                className="tool-input flex-1"
                value={item.value}
                onChange={(e) => { item.setter(e.target.value); }}
                onBlur={() => {
                  if (item.label === "RGB") updateFromRgb(rgb);
                  if (item.label === "HSL") updateFromHsl(hsl);
                }}
              />
              <button className="btn-secondary text-xs px-2 py-1" onClick={() => copy(item.label, item.display)}>
                {copied === item.label ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToolPageWrapper>
  );
}
