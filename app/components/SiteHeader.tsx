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
        <nav className="hidden md:flex items-center gap-5 text-sm text-muted ml-auto">
          <a href="/#wiring" className="hover:text-primary transition-colors">
            配線方式
          </a>
          <a href="/#smartphone" className="hover:text-primary transition-colors">
            スマホ別
          </a>
          <a href="/rental/how-to-install/" className="hover:text-primary transition-colors">
            賃貸ガイド
          </a>
          <a href="/trouble/slow-speed/" className="hover:text-primary transition-colors">
            お悩み別
          </a>
          <a href="/knowledge/what-is-hikari/" className="hover:text-primary transition-colors">
            基礎知識
          </a>
          <a href="/ranking/cheap/" className="hover:text-primary transition-colors">
            ランキング
          </a>
          <a href="/article/nuro-mansion/" className="hover:text-primary transition-colors">
            コラム
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
            <nav className="flex flex-col gap-1 text-sm">
              <p className="text-xs font-bold text-muted uppercase tracking-wider mt-2 mb-1">基本ガイド</p>
              <a
                href="/#wiring"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                配線方式ガイド
              </a>
              <a
                href="/#smartphone"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                スマホ別おすすめ
              </a>
              <a
                href="/#compare"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                料金比較表
              </a>

              <p className="text-xs font-bold text-muted uppercase tracking-wider mt-3 mb-1">賃貸ガイド</p>
              <a
                href="/rental/how-to-install/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                賃貸での光回線の引き方
              </a>
              <a
                href="/rental/permission/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                管理会社への許可申請
              </a>
              <a
                href="/rental/alternatives/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                光回線NGの場合の代替案
              </a>
              <a
                href="/rental/restoration/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                退去時の原状回復
              </a>
              <a
                href="/rental/frequent-movers/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                引越し多い人の回線選び
              </a>

              <p className="text-xs font-bold text-muted uppercase tracking-wider mt-3 mb-1">お悩み別</p>
              <a
                href="/trouble/slow-speed/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                回線が遅い時の改善方法
              </a>
              <a
                href="/trouble/remote-work/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                在宅ワーク向け回線
              </a>
              <a
                href="/trouble/gaming/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                ゲーマー向け最速回線
              </a>
              <a
                href="/trouble/single-living/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                一人暮らし向け安い回線
              </a>
              <a
                href="/trouble/family/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                ファミリー向け回線
              </a>

              <p className="text-xs font-bold text-muted uppercase tracking-wider mt-3 mb-1">基礎知識</p>
              <a
                href="/knowledge/what-is-hikari/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                光回線とは？
              </a>
              <a
                href="/knowledge/ipv6/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                IPv6（IPoE）とは？
              </a>
              <a
                href="/knowledge/construction-flow/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                工事の流れ
              </a>
              <a
                href="/knowledge/cashback/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                キャッシュバック比較
              </a>

              <p className="text-xs font-bold text-muted uppercase tracking-wider mt-3 mb-1">ランキング</p>
              <a
                href="/ranking/cheap/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                安い光回線ランキング
              </a>
              <a
                href="/ranking/fastest/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                速い光回線ランキング
              </a>
              <a
                href="/ranking/no-construction/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                工事不要の回線比較
              </a>

              <p className="text-xs font-bold text-muted uppercase tracking-wider mt-3 mb-1">コラム</p>
              <a
                href="/article/nuro-mansion/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                NURO光 マンション
              </a>
              <a
                href="/article/wifi-router/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                Wi-Fiルーターおすすめ
              </a>
              <a
                href="/article/mansion-internet-free/"
                className="text-foreground hover:text-primary transition-colors py-1.5"
                onClick={() => setMenuOpen(false)}
              >
                備え付けネット無料の罠
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
