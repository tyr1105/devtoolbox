import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevToolBox - Free Online Developer Tools",
  description: "50+ free online developer tools: JSON formatter, Base64 encoder, JWT decoder, regex tester, UUID generator, timestamp converter, and more. No signup, no tracking, all client-side.",
  keywords: ["developer tools", "json formatter", "base64 encoder", "jwt decoder", "regex tester", "uuid generator", "online tools", "free tools"],
  openGraph: {
    title: "DevToolBox - Free Online Developer Tools",
    description: "50+ free online developer tools. Fast, private, no signup required.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        {/* Google AdSense placeholder - add data-ad-client when approved */}
      </head>
      <body className="antialiased">
        <header className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center gap-2 text-xl font-bold text-[var(--text-primary)] no-underline">
                <span className="text-2xl">🛠️</span>
                <span>DevToolBox</span>
                <span className="text-xs bg-[var(--accent)] text-white px-2 py-0.5 rounded-full ml-1">FREE</span>
              </a>
              <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--text-secondary)]">
                <a href="/json-formatter" className="hover:text-[var(--accent)] transition-colors no-underline text-[var(--text-secondary)]">JSON</a>
                <a href="/base64" className="hover:text-[var(--accent)] transition-colors no-underline text-[var(--text-secondary)]">Base64</a>
                <a href="/jwt-decoder" className="hover:text-[var(--accent)] transition-colors no-underline text-[var(--text-secondary)]">JWT</a>
                <a href="/regex-tester" className="hover:text-[var(--accent)] transition-colors no-underline text-[var(--text-secondary)]">Regex</a>
                <a href="/uuid-generator" className="hover:text-[var(--accent)] transition-colors no-underline text-[var(--text-secondary)]">UUID</a>
                <a href="/timestamp-converter" className="hover:text-[var(--accent)] transition-colors no-underline text-[var(--text-secondary)]">Timestamp</a>
                <a href="/color-picker" className="hover:text-[var(--accent)] transition-colors no-underline text-[var(--text-secondary)]">Color</a>
              </nav>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-[var(--border-color)] mt-16 py-8 text-center text-sm text-[var(--text-secondary)]">
          <p>DevToolBox — All tools run 100% client-side. Your data never leaves your browser.</p>
          <p className="mt-2">Built with ❤️ for developers everywhere</p>
        </footer>
      </body>
    </html>
  );
}
