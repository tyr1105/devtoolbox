"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

function parseMarkdown(md: string): string {
  let html = md;
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-[var(--bg-secondary)] p-3 rounded overflow-x-auto my-2"><code>$2</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code class="bg-[var(--bg-secondary)] px-1 rounded text-sm">$1</code>');
  html = html.replace(/^######\s+(.+)$/gm, '<h6 class="text-base font-bold text-[var(--text-primary)] mt-4 mb-1">$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5 class="text-lg font-bold text-[var(--text-primary)] mt-4 mb-1">$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4 class="text-xl font-bold text-[var(--text-primary)] mt-4 mb-1">$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3 class="text-2xl font-bold text-[var(--text-primary)] mt-4 mb-1">$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2 class="text-3xl font-bold text-[var(--text-primary)] mt-4 mb-2">$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1 class="text-4xl font-bold text-[var(--text-primary)] mt-4 mb-2">$1</h1>');
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[var(--accent)] underline">$1</a>');
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote class="border-l-4 border-[var(--accent)] pl-4 italic text-[var(--text-secondary)] my-2">$1</blockquote>');
  html = html.replace(/^[\*\-]\s+(.+)$/gm, '<li class="ml-4 list-disc text-[var(--text-primary)]">$1</li>');
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="ml-4 list-decimal text-[var(--text-primary)]">$1</li>');
  html = html.replace(/^---$/gm, '<hr class="border-[var(--border-color)] my-4"/>');
  html = html.replace(/^(?!<[a-z])((?!<\/)[^\n]+)$/gm, '<p class="text-[var(--text-primary)] my-1">$1</p>');
  return html;
}

export default function MarkdownPreview() {
  const defaultMd = [
    "# Hello World",
    "",
    "This is a **markdown** preview tool.",
    "",
    "## Features",
    "",
    "- Bold text with **asterisks**",
    "- *Italic text*",
    "- `inline code`",
    "- [Links](https://example.com)",
    "",
    "> This is a blockquote",
    "",
    "```js",
    'console.log("Hello");',
    "```",
  ].join("\n");
  const [markdown, setMarkdown] = useState(defaultMd);
  const [copied, setCopied] = useState(false);
  const html = parseMarkdown(markdown);

  return (
    <ToolPageWrapper title="Markdown Preview" description="Write markdown and see a live HTML preview.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">Markdown</label>
            <button
              className="btn-secondary text-xs"
              onClick={() => { navigator.clipboard.writeText(html); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            >
              {copied ? "Copied!" : "Copy HTML"}
            </button>
          </div>
          <textarea
            className="tool-textarea h-[500px] font-mono text-sm"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Preview</label>
          <div
            className="tool-output p-4 h-[500px] overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </ToolPageWrapper>
  );
}
