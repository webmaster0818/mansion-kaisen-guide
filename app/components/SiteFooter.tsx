export default function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
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
              <span className="text-white font-bold">マンション回線ガイド</span>
            </a>
            <p className="text-sm leading-relaxed max-w-sm">
              マンション・アパート向けの光回線選びを、配線方式・料金・スマホ割の観点から徹底サポートします。
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            {/* 配線方式 */}
            <div>
              <p className="text-white font-bold mb-3">配線方式ガイド</p>
              <ul className="space-y-2">
                <li>
                  <a href="/wiring/overview/" className="hover:text-white transition-colors">
                    配線方式とは？
                  </a>
                </li>
                <li>
                  <a href="/wiring/hikari/" className="hover:text-white transition-colors">
                    光配線方式
                  </a>
                </li>
                <li>
                  <a href="/wiring/vdsl/" className="hover:text-white transition-colors">
                    VDSL方式
                  </a>
                </li>
                <li>
                  <a href="/wiring/lan/" className="hover:text-white transition-colors">
                    LAN配線方式
                  </a>
                </li>
                <li>
                  <a href="/wiring/check-method/" className="hover:text-white transition-colors">
                    確認方法
                  </a>
                </li>
              </ul>
            </div>

            {/* キャリア別 */}
            <div>
              <p className="text-white font-bold mb-3">スマホ別おすすめ</p>
              <ul className="space-y-2">
                <li>
                  <a href="/carrier/docomo/" className="hover:text-white transition-colors">
                    ドコモユーザー向け
                  </a>
                </li>
                <li>
                  <a href="/carrier/au/" className="hover:text-white transition-colors">
                    auユーザー向け
                  </a>
                </li>
                <li>
                  <a href="/carrier/softbank/" className="hover:text-white transition-colors">
                    ソフトバンクユーザー向け
                  </a>
                </li>
                <li>
                  <a href="/carrier/kakuyasu/" className="hover:text-white transition-colors">
                    格安SIMユーザー向け
                  </a>
                </li>
              </ul>
            </div>

            {/* プロバイダ */}
            <div>
              <p className="text-white font-bold mb-3">プロバイダ比較</p>
              <ul className="space-y-2">
                <li>
                  <a href="/provider/docomo-hikari/" className="hover:text-white transition-colors">
                    ドコモ光
                  </a>
                </li>
                <li>
                  <a href="/provider/softbank-hikari/" className="hover:text-white transition-colors">
                    ソフトバンク光
                  </a>
                </li>
                <li>
                  <a href="/provider/au-hikari/" className="hover:text-white transition-colors">
                    auひかり
                  </a>
                </li>
                <li>
                  <a href="/provider/nuro-hikari/" className="hover:text-white transition-colors">
                    NURO光
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>運営: 株式会社MediaX（東京都渋谷区）</p>
            <p className="text-slate-500 text-center">
              当サイトには広告・PRリンクが含まれています。掲載情報は2026年4月時点のものです。
            </p>
            <p>
              &copy; {new Date().getFullYear()} マンション回線ガイド All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
