import providers from "../data/providers.json";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

const top3 = [providers[0], providers[1], providers[2]]; // ドコモ光、ソフトバンク光、auひかり

const wiringTypes = [
  {
    name: "光配線方式",
    icon: "fiber_optic",
    speed: "最大1Gbps",
    description: "各部屋まで光ファイバーを直接引き込む方式。最も高速で安定。",
    recommendation: "速度重視なら最適。NURO光やauひかりが特に快適。",
    color: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
    badge: "おすすめ",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "VDSL方式",
    icon: "phone",
    speed: "最大100Mbps",
    description:
      "共用部まで光ファイバー、各部屋へは電話線で接続。築年数の古いマンションに多い。",
    recommendation:
      "速度に限界あり。IPv6対応の光コラボ（ドコモ光等）で改善可能。",
    color: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
    badge: "要確認",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    name: "LAN配線方式",
    icon: "cable",
    speed: "最大100Mbps〜1Gbps",
    description:
      "共用部から各部屋までLANケーブルで接続。CAT5eなら100Mbps、CAT6なら1Gbps。",
    recommendation: "ケーブル規格次第。管理会社に確認を。",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    badge: "ケーブル次第",
    badgeColor: "bg-blue-100 text-blue-700",
  },
];

const smartphoneMatches = [
  {
    carrier: "ドコモ",
    color: "bg-red-50 border-red-200",
    textColor: "text-red-700",
    recommended: "ドコモ光",
    discount: "最大1,100円/月",
    reason: "ドコモのスマホセット割で家族全員割引",
  },
  {
    carrier: "au",
    color: "bg-orange-50 border-orange-200",
    textColor: "text-orange-700",
    recommended: "auひかり",
    discount: "最大1,100円/月",
    reason: "独自回線で速度も安定、auスマートバリュー適用",
  },
  {
    carrier: "ソフトバンク",
    color: "bg-gray-50 border-gray-300",
    textColor: "text-gray-700",
    recommended: "ソフトバンク光 / NURO光",
    discount: "最大1,100円/月",
    reason: "おうち割光セットで家族全員割引",
  },
  {
    carrier: "UQモバイル",
    color: "bg-purple-50 border-purple-200",
    textColor: "text-purple-700",
    recommended: "auひかり / ビッグローブ光",
    discount: "最大1,100円/月",
    reason: "自宅セット割でUQモバイルも大幅割引",
  },
  {
    carrier: "楽天モバイル",
    color: "bg-pink-50 border-pink-200",
    textColor: "text-pink-700",
    recommended: "楽天ひかり",
    discount: "SPU+1倍",
    reason: "楽天ポイントが貯まりやすくなる",
  },
  {
    carrier: "格安SIM（その他）",
    color: "bg-teal-50 border-teal-200",
    textColor: "text-teal-700",
    recommended: "GMOとくとくBB光 / enひかり",
    discount: "なし（月額が安い）",
    reason: "セット割なしでも月額最安。シンプルに安い",
  },
];

const howToChoose = [
  {
    num: 1,
    title: "配線方式を確認する",
    description:
      "マンションの配線方式（光配線/VDSL/LAN）で選べる回線と速度が変わります。管理会社や不動産会社に確認しましょう。",
  },
  {
    num: 2,
    title: "スマホキャリアとのセット割を確認",
    description:
      "ドコモ・au・ソフトバンクなど、お使いのスマホとセット割がある光回線を選ぶと、毎月1,100円以上お得になります。",
  },
  {
    num: 3,
    title: "実質月額料金で比較する",
    description:
      "月額料金だけでなく、キャッシュバック・工事費割引・スマホ割を含めた「実質月額」で比較することが重要です。",
  },
  {
    num: 4,
    title: "契約期間と違約金を確認",
    description:
      "賃貸の場合、引っ越しの可能性を考慮して契約期間の縛りと違約金を確認。短期間なら縛りなし回線も検討を。",
  },
  {
    num: 5,
    title: "管理会社の許可を取る",
    description:
      "賃貸マンションでは、新規で回線工事をする場合に管理会社やオーナーの許可が必要です。事前に確認しましょう。",
  },
];

const faqItems = [
  {
    q: "マンションの光回線は戸建てと何が違いますか？",
    a: "マンションタイプは建物の共用部まで光ファイバーを引き込み、各戸への接続方式（光配線/VDSL/LAN）によって速度が異なります。月額料金は戸建てより1,000〜2,000円ほど安いのが一般的です。",
  },
  {
    q: "VDSL方式でも快適に使えますか？",
    a: "VDSL方式は最大100Mbpsですが、IPv6（IPoE）対応の光回線を選べば、混雑時の速度低下を軽減できます。動画視聴やWeb閲覧は問題なく、オンラインゲームのヘビーユーザーはやや不満を感じる場合があります。",
  },
  {
    q: "賃貸マンションでも光回線の工事はできますか？",
    a: "既に建物に光回線が導入されていれば、室内工事のみで開通可能です。未導入の場合は管理会社・オーナーの許可が必要です。退去時の原状回復義務も確認しておきましょう。",
  },
  {
    q: "マンションで一番速い光回線はどれですか？",
    a: "光配線方式が導入されている場合、NURO光（最大2Gbps）が最速です。NURO光が未対応のマンションでは、auひかり（独自回線）やIPv6対応の光コラボが速度面でおすすめです。",
  },
  {
    q: "光回線の工事にはどれくらい時間がかかりますか？",
    a: "マンションに設備が導入済みの場合は1〜2週間、未導入の場合は1〜3ヶ月かかることがあります。NURO光は2回の工事が必要で、開通まで特に時間がかかる傾向があります。引っ越しシーズン（3〜4月）は特に混み合います。",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              マンションの光回線、
              <br className="md:hidden" />
              もう迷わない。
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
              配線方式・スマホキャリア・料金を徹底比較。
              <br className="hidden md:block" />
              あなたのマンションに最適な光回線が見つかります。
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                10社比較
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                配線方式別解説
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                賃貸対応ガイド
              </span>
            </div>
            <a
              href="#ranking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-xl text-lg transition-colors shadow-lg shadow-accent/25"
            >
              おすすめランキングを見る
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* 配線方式診断 */}
        <section id="wiring" className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                STEP 1
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                まずは配線方式をチェック
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                マンションの配線方式によって、選べる回線と出せる速度が大きく変わります。
                管理会社や契約書で確認しましょう。
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {wiringTypes.map((wiring) => (
                <div
                  key={wiring.name}
                  className={`rounded-2xl border-2 p-6 ${wiring.color} transition-shadow hover:shadow-lg`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className={`text-xl font-bold ${wiring.iconColor}`}
                    >
                      {wiring.name}
                    </h3>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${wiring.badgeColor}`}
                    >
                      {wiring.badge}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-3">
                    {wiring.speed}
                  </p>
                  <p className="text-sm text-muted mb-4">
                    {wiring.description}
                  </p>
                  <div className="pt-4 border-t border-current/10">
                    <p className="text-sm font-medium text-foreground">
                      {wiring.recommendation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* 配線方式ガイドへの内部リンク */}
            <div className="mt-8 text-center">
              <a
                href="/wiring/overview/"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium text-sm transition-colors"
              >
                配線方式の詳細ガイドを見る
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* スマホ別おすすめ */}
        <section id="smartphone" className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                STEP 2
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                スマホキャリア別おすすめ回線
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                お使いのスマホとセット割がある光回線を選べば、毎月の通信費を大幅に節約できます。
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {smartphoneMatches.map((match) => (
                <div
                  key={match.carrier}
                  className={`rounded-xl border-2 p-5 ${match.color} transition-shadow hover:shadow-md`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`text-lg font-bold ${match.textColor}`}
                    >
                      {match.carrier}
                    </span>
                  </div>
                  <p className="text-base font-bold text-foreground mb-1">
                    {match.recommended}
                  </p>
                  <p className="text-sm text-accent font-medium mb-2">
                    割引: {match.discount}
                  </p>
                  <p className="text-sm text-muted">{match.reason}</p>
                </div>
              ))}
            </div>
            {/* キャリア別詳細ページへの内部リンク */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/carrier/docomo/" className="text-sm px-4 py-2 rounded-lg bg-white border border-border hover:border-primary hover:bg-primary/5 transition-colors text-foreground">
                ドコモ詳細 →
              </a>
              <a href="/carrier/au/" className="text-sm px-4 py-2 rounded-lg bg-white border border-border hover:border-primary hover:bg-primary/5 transition-colors text-foreground">
                au詳細 →
              </a>
              <a href="/carrier/softbank/" className="text-sm px-4 py-2 rounded-lg bg-white border border-border hover:border-primary hover:bg-primary/5 transition-colors text-foreground">
                ソフトバンク詳細 →
              </a>
              <a href="/carrier/kakuyasu/" className="text-sm px-4 py-2 rounded-lg bg-white border border-border hover:border-primary hover:bg-primary/5 transition-colors text-foreground">
                格安SIM詳細 →
              </a>
            </div>
          </div>
        </section>

        {/* Top 3 ランキング */}
        <section id="ranking" className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
                RANKING
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                マンション光回線おすすめTOP3
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                料金・速度・スマホ割・評判を総合的に評価したおすすめランキングです。
              </p>
            </div>
            <div className="space-y-8">
              {top3.map((provider, index) => {
                const rankColors = [
                  "border-yellow-400 bg-yellow-50",
                  "border-gray-400 bg-gray-50",
                  "border-amber-600 bg-amber-50",
                ];
                const rankBadgeColors = [
                  "bg-yellow-400 text-yellow-900",
                  "bg-gray-400 text-white",
                  "bg-amber-600 text-white",
                ];
                return (
                  <div
                    key={provider.id}
                    className={`rounded-2xl border-2 ${rankColors[index]} p-6 md:p-8 transition-shadow hover:shadow-lg`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="flex-shrink-0">
                        <span
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-xl font-bold ${rankBadgeColors[index]}`}
                        >
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          {provider.name}
                        </h3>
                        <div className="flex flex-wrap gap-3 mb-4">
                          <span className="text-sm bg-white/80 rounded-lg px-3 py-1 font-medium">
                            月額{" "}
                            <span className="text-primary font-bold text-lg">
                              {provider.monthlyPrice.toLocaleString()}円
                            </span>
                          </span>
                          <span className="text-sm bg-white/80 rounded-lg px-3 py-1 font-medium">
                            速度: {provider.speed}
                          </span>
                        </div>
                        <p className="text-sm text-accent font-medium mb-4">
                          {provider.smartphoneDiscount}
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-bold text-emerald-700 mb-2 uppercase tracking-wide">
                              メリット
                            </p>
                            <ul className="space-y-1">
                              {provider.pros.map((pro) => (
                                <li
                                  key={pro}
                                  className="text-sm text-foreground flex items-start gap-1.5"
                                >
                                  <span className="text-emerald-500 mt-0.5 flex-shrink-0">
                                    +
                                  </span>
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-red-700 mb-2 uppercase tracking-wide">
                              デメリット
                            </p>
                            <ul className="space-y-1">
                              {provider.cons.map((con) => (
                                <li
                                  key={con}
                                  className="text-sm text-foreground flex items-start gap-1.5"
                                >
                                  <span className="text-red-400 mt-0.5 flex-shrink-0">
                                    -
                                  </span>
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-5">
                          <a
                            href={provider.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-colors text-sm"
                          >
                            公式サイトを見る
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 料金比較表 */}
        <section id="compare" className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                COMPARE
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                マンション光回線10社 料金比較表
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                月額料金・最大速度・スマホセット割を一覧で比較できます。
              </p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary/5">
                    <th className="text-left px-4 py-3 font-bold text-foreground whitespace-nowrap">
                      サービス名
                    </th>
                    <th className="text-right px-4 py-3 font-bold text-foreground whitespace-nowrap">
                      月額料金
                    </th>
                    <th className="text-center px-4 py-3 font-bold text-foreground whitespace-nowrap">
                      最大速度
                    </th>
                    <th className="text-left px-4 py-3 font-bold text-foreground whitespace-nowrap">
                      スマホセット割
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {providers.map((p, i) => (
                    <tr
                      key={p.id}
                      className={`border-t border-border ${
                        i % 2 === 0 ? "" : "bg-gray-50/50"
                      } hover:bg-primary/5 transition-colors`}
                    >
                      <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                        <a href={`/provider/${p.slug}/`} className="hover:text-primary hover:underline transition-colors">
                          {p.name}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-primary whitespace-nowrap">
                        {p.monthlyPrice.toLocaleString()}円
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        {p.speed}
                      </td>
                      <td className="px-4 py-3 text-muted text-xs">
                        {p.smartphoneDiscount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted mt-4 text-center">
              ※ 料金は税込・マンションタイプの場合。キャンペーン等により変動する場合があります。（2026年4月時点）
            </p>
          </div>
        </section>

        {/* 選び方5ポイント */}
        <section id="howto" className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                HOW TO CHOOSE
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                マンション光回線の選び方 5つのポイント
              </h2>
            </div>
            <div className="space-y-6 max-w-3xl mx-auto">
              {howToChoose.map((item) => (
                <div key={item.num} className="flex gap-5">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg">
                      {item.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                FAQ
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                よくある質問
              </h2>
            </div>
            <div className="space-y-4">
              {faqItems.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-border bg-white overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-base font-medium text-foreground hover:bg-gray-50 transition-colors list-none">
                    <span className="flex items-center gap-3">
                      <span className="text-primary font-bold">Q.</span>
                      {faq.q}
                    </span>
                    <svg
                      className="w-5 h-5 text-muted transition-transform group-open:rotate-180 flex-shrink-0 ml-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-sm text-muted leading-relaxed pl-8">
                      <span className="text-accent font-bold mr-1">A.</span>
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
