import { notFound } from "next/navigation";
import rankings from "../../../data/rankings.json";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Breadcrumb from "../../components/Breadcrumb";

export async function generateStaticParams() {
  return rankings.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ranking = rankings.find((r) => r.slug === slug);
  if (!ranking) return {};
  return {
    title: `${ranking.title} | マンション回線ガイド`,
    description: `${ranking.title}。マンション向け光回線の最新ランキングと比較情報をご紹介。`,
  };
}

export default async function RankingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ranking = rankings.find((r) => r.slug === slug);

  if (!ranking) {
    notFound();
  }

  const medalColors = ["bg-yellow-400", "bg-gray-300", "bg-amber-600"];

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <div className="bg-white border-b border-border">
        <Breadcrumb
          items={[
            { label: "ランキング", href: "/ranking/cheap/" },
            { label: ranking.title },
          ]}
        />
      </div>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                ランキング
              </span>
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                2026年最新
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {ranking.title}
            </h1>
            <p className="text-muted text-base">
              ※ 掲載情報は2026年4月時点のものです。料金は税込・マンションタイプの場合。
            </p>
          </div>
        </section>

        {/* Ranking List */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">ランキング一覧</h2>
            <div className="space-y-4">
              {ranking.ranked.map((item, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border-2 p-6 ${
                    i === 0
                      ? "border-yellow-300 bg-yellow-50"
                      : i === 1
                      ? "border-gray-200 bg-gray-50"
                      : i === 2
                      ? "border-amber-200 bg-amber-50"
                      : "border-border bg-white"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${
                        i < 3 ? medalColors[i] : "bg-gray-400"
                      }`}
                    >
                      {item.rank}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                        <span className="inline-block px-2 py-0.5 bg-accent/10 text-accent text-xs font-bold rounded-full">
                          {item.badge}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-white rounded-lg border border-border p-3 text-center">
                          <p className="text-xs text-muted mb-1">月額料金</p>
                          <p className="text-base font-bold text-primary">{item.price}</p>
                        </div>
                        <div className="bg-white rounded-lg border border-border p-3 text-center">
                          <p className="text-xs text-muted mb-1">最大速度</p>
                          <p className="text-base font-bold text-foreground">{item.speed}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted">{item.note}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        {ranking.comparisonData && ranking.comparisonData.length > 0 && (
          <section className="py-12 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-foreground mb-6">比較表</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-4 py-3 text-left font-bold whitespace-nowrap">項目</th>
                      {ranking.ranked.slice(0, ranking.comparisonData[0]?.values.length).map((item, i) => (
                        <th key={i} className="px-4 py-3 text-center font-bold whitespace-nowrap">
                          {item.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ranking.comparisonData.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-primary/5" : "bg-white"}>
                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                          {row.label}
                        </td>
                        {row.values.map((val, j) => (
                          <td key={j} className="px-4 py-3 text-center text-muted">
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted mt-3">
                ※ 掲載情報は2026年4月時点のものです。最新情報は各公式サイトでご確認ください。
              </p>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">よくある質問</h2>
            <div className="space-y-4">
              {ranking.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-border bg-white overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-base font-medium text-foreground hover:bg-gray-50 transition-colors list-none">
                    <span className="flex items-center gap-3">
                      <span className="text-primary font-bold flex-shrink-0">Q.</span>
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

        {/* CTA */}
        <section className="py-12 bg-gradient-to-r from-primary to-primary-dark">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              光回線の詳細を比較・申し込みする
            </h2>
            <p className="text-white/80 mb-6">
              マンション向け光回線10社の料金・速度・特徴を一覧比較
            </p>
            <a
              href="/#compare"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-xl text-lg transition-colors shadow-lg"
            >
              全プロバイダを比較する
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
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
            <p className="text-xs text-white/60 mt-3">
              ※ 広告・PRリンクを含みます
            </p>
          </div>
        </section>

        {/* Related */}
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-lg font-bold text-foreground mb-4">関連ランキング</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href="/ranking/cheap/"
                className="block p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <p className="text-sm font-bold text-foreground mb-1">安い光回線ランキング</p>
                <p className="text-xs text-muted">マンションタイプ</p>
              </a>
              <a
                href="/ranking/fastest/"
                className="block p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <p className="text-sm font-bold text-foreground mb-1">速い光回線ランキング</p>
                <p className="text-xs text-muted">実測値比較</p>
              </a>
              <a
                href="/ranking/provider-compare/"
                className="block p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <p className="text-sm font-bold text-foreground mb-1">プロバイダ比較10社</p>
                <p className="text-xs text-muted">マンション向け</p>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
