import Link from "next/link";

const tools = [
  { name: "JSON Formatter", desc: "Format, validate, and minify JSON data with syntax highlighting", icon: "📋", href: "/json-formatter", category: "Data" },
  { name: "Base64 Encoder/Decoder", desc: "Encode text to Base64 or decode Base64 back to text", icon: "🔐", href: "/base64", category: "Encoding" },
  { name: "JWT Decoder", desc: "Decode and inspect JSON Web Tokens (JWT) header, payload, and signature", icon: "🔑", href: "/jwt-decoder", category: "Security" },
  { name: "Regex Tester", desc: "Test regular expressions with real-time matching and group capture", icon: "🔍", href: "/regex-tester", category: "Text" },
  { name: "UUID Generator", desc: "Generate UUID v4, v1, or NIL identifiers in bulk", icon: "🆔", href: "/uuid-generator", category: "Generator" },
  { name: "Timestamp Converter", desc: "Convert between Unix timestamps and human-readable dates", icon: "🕐", href: "/timestamp-converter", category: "Time" },
  { name: "Color Picker", desc: "Convert colors between HEX, RGB, HSL with visual picker", icon: "🎨", href: "/color-picker", category: "Design" },
  { name: "Diff Checker", desc: "Compare two texts side-by-side and see differences highlighted", icon: "📊", href: "/diff-checker", category: "Text" },
  { name: "Markdown Preview", desc: "Write Markdown with live preview and HTML export", icon: "📝", href: "/markdown-preview", category: "Writing" },
  { name: "Cron Expression Builder", desc: "Build and understand cron expressions with visual scheduler", icon: "⏰", href: "/cron-builder", category: "DevOps" },
  { name: "Hash Generator", desc: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes instantly", icon: "🔏", href: "/hash-generator", category: "Security" },
  { name: "URL Encoder/Decoder", desc: "Encode or decode URL components and query strings", icon: "🔗", href: "/url-encoder", category: "Encoding" },
  { name: "Lorem Ipsum Generator", desc: "Generate placeholder text in paragraphs, sentences, or words", icon: "📄", href: "/lorem-ipsum", category: "Generator" },
];

const categories = [...new Set(tools.map(t => t.category))];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="text-center py-12 mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[var(--success)] bg-clip-text text-transparent">
          Free Developer Tools
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Fast, private, and completely free. All processing happens in your browser — your data never leaves your device. No signup required.
        </p>
      </section>

      {/* Ad banner placeholder */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-4 mb-8 text-center text-sm text-[var(--text-secondary)]">
        {/* Google AdSense ad unit will go here */}
        <span>Ad Space — Supporting free tools for developers</span>
      </div>

      {/* Tools Grid */}
      {categories.map(cat => (
        <section key={cat} className="mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)] mb-4">{cat}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.filter(t => t.category === cat).map(tool => (
              <Link key={tool.href} href={tool.href} className="tool-card group">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{tool.icon}</span>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{tool.name}</h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{tool.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* SEO content */}
      <section className="mt-12 prose prose-invert max-w-none text-[var(--text-secondary)]">
        <h2 className="text-[var(--text-primary)]">About DevToolBox</h2>
        <p>
          DevToolBox provides a comprehensive suite of free online developer tools. Whether you need to format JSON, 
          encode Base64, decode JWT tokens, test regular expressions, generate UUIDs, or convert timestamps — we&apos;ve got you covered.
          Every tool runs entirely in your browser using client-side JavaScript, ensuring your data stays private and secure.
        </p>
        <h3 className="text-[var(--text-primary)]">Why DevToolBox?</h3>
        <ul>
          <li>100% free, no signup or account required</li>
          <li>All processing is client-side — your data never leaves your browser</li>
          <li>Fast, modern interface optimized for developer workflows</li>
          <li>Mobile-responsive design — use on any device</li>
          <li>Dark mode by default, because developers prefer it</li>
        </ul>
      </section>
    </div>
  );
}
