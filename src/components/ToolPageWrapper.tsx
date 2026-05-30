"use client";
import { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

export default function ToolPageWrapper({ title, description, children }: Props) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">{title}</h1>
        <p className="text-[var(--text-secondary)] mt-2">{description}</p>
      </div>
      {children}
      <div className="mt-8 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-4 text-center text-sm text-[var(--text-secondary)]">
        Ad Space — Supporting free tools for developers
      </div>
    </div>
  );
}
