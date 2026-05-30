"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "perspiciatis", "unde",
  "omnis", "iste", "natus", "error", "voluptatem", "accusantium", "doloremque",
  "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo",
  "inventore", "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta",
  "explicabo", "nemo", "ipsam", "quia", "voluptas", "aspernatur", "aut", "odit",
  "fugit", "consequuntur", "magni", "dolores", "eos", "ratione", "sequi", "nesciunt",
];

const CLASSIC_START = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function generateWord(): string {
  return LOREM_WORDS[getRandomInt(LOREM_WORDS.length)];
}

function generateSentence(wordCount: number): string {
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(generateWord());
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(sentenceCount: number): string {
  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence(8 + getRandomInt(12)));
  }
  return sentences.join(" ");
}

export default function LoremIpsum() {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithClassic, setStartWithClassic] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let result = "";
    if (type === "paragraphs") {
      const paragraphs: string[] = [];
      for (let i = 0; i < count; i++) {
        if (i === 0 && startWithClassic) {
          paragraphs.push(CLASSIC_START + " " + generateSentence(10));
        } else {
          paragraphs.push(generateParagraph(4 + getRandomInt(4)));
        }
      }
      result = paragraphs.join("\n\n");
    } else if (type === "sentences") {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        if (i === 0 && startWithClassic) {
          sentences.push(CLASSIC_START);
        } else {
          sentences.push(generateSentence(8 + getRandomInt(12)));
        }
      }
      result = sentences.join(" ");
    } else {
      const words: string[] = [];
      if (startWithClassic) {
        words.push(...CLASSIC_START.split(" ").slice(0, Math.min(count, CLASSIC_START.split(" ").length)));
      }
      while (words.length < count) {
        words.push(generateWord());
      }
      result = words.slice(0, count).join(" ");
    }
    setOutput(result);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageWrapper title="Lorem Ipsum Generator" description="Generate placeholder text for your designs and layouts.">
      <div className="tool-card p-6 mb-6">
        {/* Type selection */}
        <div className="flex gap-2 mb-4">
          {(["paragraphs", "sentences", "words"] as const).map((t) => (
            <button
              key={t}
              className={type === t ? "btn-primary" : "btn-secondary"}
              onClick={() => setType(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Count */}
        <div className="flex items-center gap-4 mb-4">
          <label className="text-sm text-[var(--text-secondary)]">Count:</label>
          <input
            type="number"
            className="tool-input w-24"
            min={1}
            max={type === "paragraphs" ? 10 : 100}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(type === "paragraphs" ? 10 : 100, Number(e.target.value))))}
          />
          {type === "paragraphs" && (
            <span className="text-xs text-[var(--text-secondary)]">(1-10)</span>
          )}
        </div>

        {/* Classic start toggle */}
        <label className="flex items-center gap-2 mb-4 cursor-pointer">
          <input
            type="checkbox"
            checked={startWithClassic}
            onChange={(e) => setStartWithClassic(e.target.checked)}
            className="accent-[var(--accent)]"
          />
          <span className="text-sm text-[var(--text-secondary)]">Start with &quot;Lorem ipsum dolor sit amet...&quot;</span>
        </label>

        <button className="btn-primary" onClick={generate}>
          Generate
        </button>
      </div>

      {output && (
        <div className="tool-card p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Generated Text</h2>
            <button className="btn-secondary text-xs px-2 py-1" onClick={copyOutput}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="tool-output p-4 whitespace-pre-wrap text-sm text-[var(--text-primary)]">
            {output}
          </div>
        </div>
      )}
    </ToolPageWrapper>
  );
}
