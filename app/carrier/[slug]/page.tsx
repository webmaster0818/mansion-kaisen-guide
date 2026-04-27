import { notFound } from "next/navigation";
import carriers from "../../../data/carriers.json";
import providers from "../../../data/providers.json";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Breadcrumb from "../../components/Breadcrumb";

export async function generateStaticParams() {
  return carriers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const carrier = carriers.find((c) => c.slug === slug);
  if (!carrier) return {};
  return {
    title: `${carrier.title}【2026年最新】 | マンション回線ガイド`,
    description: carrier.description,
  };
}

export default async function CarrierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const carrier = carriers.find((c) => c.slug === slug);

  if (!carrier) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: carrier.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-white border-b border-border">
        <Breadcrumb
          items={[
            { label: "スマホ別おすすめ", href: "/#smartphone" },
            { label: carrier.title },
          ]}
        />
      </div>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                スマホ別おすすめ
              </span>
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                2026年最新
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {carrier.title}
            </h1>
            <p className="text-muted text-lg leading-relaxed mb-6">
              {carrier.heroText}
            </p>

            {/* Discount Banner */}
            <div className="bg-accent/10 border-2 border-accent/30 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🎁</span>
                <span className="font-bold text-accent text-lg">
                  {carrier.discountInfo.name}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">
                {carrier.discountInfo.amount}の割引
              </p>
              <p className="text-sm text-muted">{carrier.discountInfo.notes}</p>
            </div>
          </div>
        </section>

        {/* Ranked Recommendations */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              おすすめ光回線ランキング
            </h2>
            <div className="space-y-6">
              {carrier.recommendedProviders.map((rec, index) => {
                const providerDetail = providers.find(
                  (p) => p.id === rec.providerId
                );
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
                    key={rec.providerId}
                    className={`rounded-2xl border-2 p-6 ${
                      rankColors[index] || "border-border bg-white"
                    } hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold flex-shrink-0 ${
                          rankBadgeColors[index] || "bg-border text-foreground"
                        }`}
                      >
                        {rec.rank}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {providerDetail?.name ?? rec.providerId}
                        </h3>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-3 mb-3">
                          {providerDetail && (
                            <>
                              <span className="text-sm bg-white/80 rounded-lg px-3 py-1">
                                月額{" "}
                                <span className="text-primary font-bold">
                                  {providerDetail.monthlyPrice.toLocaleString()}円
                                </span>
                              </span>
                              <span className="text-sm bg-white/80 rounded-lg px-3 py-1 text-muted">
                                {providerDetail.speed}
                              </span>
                            </>
                          )}
                        </div>

                        <p className="text-sm text-foreground mb-2">
                          {rec.reason}
                        </p>
                        <p className="text-sm font-bold text-accent mb-4">
                          {rec.discountDetail}
                        </p>
                        <p className="text-xs text-muted bg-white/60 rounded-lg px-3 py-2 inline-block mb-4">
                          {rec.estimatedMonthlyTotal}
                        </p>

                        {providerDetail && (
                          <div className="mt-2">
                            <a
                              href={providerDetail.officialUrl}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-colors text-sm"
                            >
                              公式サイトへ
                              <svg
                                className="w-3.5 h-3.5"
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
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted mt-4">
              ※ 広告・PRリンクを含みます。料金は税込・マンションタイプ（2026年4月時点）
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              料金・割引比較表
            </h2>
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
                    <th className="text-left px-4 py-3 font-bold text-foreground whitespace-nowrap">
                      スマホ割引
                    </th>
                    <th className="text-center px-4 py-3 font-bold text-foreground whitespace-nowrap">
                      IPv6
                    </th>
                    <th className="text-center px-4 py-3 font-bold text-foreground whitespace-nowrap">
                      契約期間
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {carrier.comparisonData.map((row, i) => (
                    <tr
                      key={i}
                      className={`border-t border-border ${
                        row.recommended ? "bg-primary/5" : i % 2 === 0 ? "" : "bg-gray-50/50"
                      } hover:bg-primary/5 transition-colors`}
                    >
                      <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                        {row.recommended && (
                          <span className="inline-block text-xs bg-accent text-white rounded px-1.5 py-0.5 mr-2">
                            おすすめ
                          </span>
                        )}
                        {row.provider}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-primary whitespace-nowrap">
                        {row.monthlyPrice.toLocaleString()}円
                      </td>
                      <td className="px-4 py-3 text-muted text-xs">
                        {row.smartphoneDiscount}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.ipv6 ? (
                          <span className="text-emerald-500 font-bold">✓</span>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center text-muted text-xs">
                        {row.contractPeriod}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              よくある質問
            </h2>
            <div className="space-y-4">
              {carrier.faqs.map((faq, i) => (
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

        {/* Internal Links */}
        <section className="py-10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-lg font-bold text-foreground mb-4">
              他のキャリア別ガイド
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {carriers
                .filter((c) => c.slug !== slug)
                .map((c) => (
                  <a
                    key={c.slug}
                    href={`/carrier/${c.slug}/`}
                    className="block p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <p className="text-sm font-bold text-foreground mb-1">
                      {c.title}
                    </p>
                    <p className="text-xs text-muted line-clamp-2">
                      {c.description}
                    </p>
                  </a>
                ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
