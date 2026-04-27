"use client";

import { useState } from "react";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12 18.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <span className="text-lg font-bold text-foreground">
            マンション回線ガイド
          </span>
        </a>

        {/* PR Label */}
        <span className="hidden md:inline-flex items-center gap-1 text-xs text-muted border border-border rounded px-2 py-0.5 bg-gray-50 ml-2">
          PRを含みます
        </span>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted ml-auto">
          <a href="/#wiring" className="hover:text-primary transition-colors">
            配線方式
          </a>
          <a href="/#smartphone" className="hover:text-primary transition-colors">
            スマホ別
          </a>
          <a href="/#ranking" className="hover:text-primary transition-colors">
            ランキング
          </a>
          <a href="/#compare" className="hover:text-primary transition-colors">
            料金比較
          </a>
          <a href="/#faq" className="hover:text-primary transition-colors">
            FAQ
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニューを開く"
          aria-expanded={menuOpen}
        >
          <svg
            className="w-6 h-6 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
            <span className="inline-flex items-center gap-1 text-xs text-muted border border-border rounded px-2 py-0.5 bg-gray-50 self-start">
              PRを含みます
            </span>
            <nav className="flex flex-col gap-3 text-sm">
              <a
                href="/#wiring"
                className="text-foreground hover:text-primary transition-colors py-1"
                onClick={() => setMenuOpen(false)}
              >
                配線方式ガイド
              </a>
              <a
                href="/#smartphone"
                className="text-foreground hover:text-primary transition-colors py-1"
                onClick={() => setMenuOpen(false)}
              >
                スマホ別おすすめ
              </a>
              <a
                href="/#ranking"
                className="text-foreground hover:text-primary transition-colors py-1"
                onClick={() => setMenuOpen(false)}
              >
                おすすめランキング
              </a>
              <a
                href="/#compare"
                className="text-foreground hover:text-primary transition-colors py-1"
                onClick={() => setMenuOpen(false)}
              >
                料金比較表
              </a>
              <a
                href="/#faq"
                className="text-foreground hover:text-primary transition-colors py-1"
                onClick={() => setMenuOpen(false)}
              >
                よくある質問
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
