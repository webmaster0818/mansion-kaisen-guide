import { notFound } from "next/navigation";
import wirings from "../../../data/wirings.json";
import providers from "../../../data/providers.json";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Breadcrumb from "../../components/Breadcrumb";

export async function generateStaticParams() {
  return wirings.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wiring = wirings.find((w) => w.slug === slug);
  if (!wiring) return {};
  return {
    title: `${wiring.title} | マンション回線ガイド`,
    description: wiring.description,
  };
}

export default async function WiringPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wiring = wirings.find((w) => w.slug === slug);

  if (!wiring) {
    notFound();
  }

  const recommendedProviderDetails = wiring.recommendedProviders
    .map((id) => providers.find((p) => p.id === id))
    .filter(Boolean);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: wiring.faqs.map((faq) => ({
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
            { label: "配線方式ガイド", href: "/wiring/overview/" },
            { label: wiring.title },
          ]}
        />
      </div>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                配線方式ガイド
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {wiring.title}
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              {wiring.description}
            </p>
          </div>
        </section>

        {/* Main Content - Sections */}
        <article className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="space-y-12">
              {wiring.sections.map((section, i) => (
                <section key={i} id={`section-${i}`}>
                  <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary/20">
                    {section.title}
                  </h2>
                  <p className="text-muted leading-relaxed mb-4">
                    {section.content}
                  </p>

                  {"points" in section && section.points && section.points.length > 0 && (
                    <ul className="space-y-3 mt-4">
                      {section.points.map((point, pi) => (
                        <li
                          key={pi}
                          className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10"
                        >
                          <span className="text-primary font-bold flex-shrink-0 mt-0.5">
                            ▶
                          </span>
                          <span className="text-sm text-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {"speed" in section && section.speed && (
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
                      <span className="text-emerald-700 font-bold text-sm">
                        最大速度:
                      </span>
                      <span className="text-emerald-800 font-bold">
                        {section.speed}
                      </span>
                    </div>
                  )}

                  {"stepNumber" in section && section.stepNumber && (
                    <div className="mt-2 mb-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
                        {section.stepNumber}
                      </span>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>
        </article>

        {/* Tips */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              知っておきたいポイント
            </h2>
            <div className="space-y-4">
              {wiring.tips.map((tip, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl bg-amber-50 border border-amber-200"
                >
                  <span className="text-amber-500 font-bold text-xl flex-shrink-0">
                    💡
                  </span>
                  <p className="text-sm text-foreground leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Providers */}
        {recommendedProviderDetails.length > 0 && (
          <section className="py-12 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                おすすめプロバイダ
              </h2>
              <div className="space-y-4">
                {recommendedProviderDetails.map((p, i) => {
                  if (!p) return null;
                  return (
                    <div
                      key={p.id}
                      className="rounded-xl border border-border bg-white p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                            {i + 1}
                          </span>
                          <h3 className="text-lg font-bold text-foreground">
                            {p.name}
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <span className="bg-primary/5 rounded-lg px-3 py-1">
                            月額{" "}
                            <span className="text-primary font-bold">
                              {p.monthlyPrice.toLocaleString()}円
                            </span>
                          </span>
                          <span className="bg-gray-50 rounded-lg px-3 py-1 text-muted">
                            {p.speed}
                          </span>
                        </div>
                        <div className="md:ml-auto">
                          <a
                            href={p.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-colors text-sm"
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
        )}

        {/* FAQ */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              よくある質問
            </h2>
            <div className="space-y-4">
              {wiring.faqs.map((faq, i) => (
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
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-lg font-bold text-foreground mb-4">
              関連ガイド
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {wirings
                .filter((w) => w.slug !== slug)
                .slice(0, 4)
                .map((w) => (
                  <a
                    key={w.slug}
                    href={`/wiring/${w.slug}/`}
                    className="block p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <p className="text-sm font-bold text-foreground mb-1 leading-snug">
                      {w.title}
                    </p>
                    <p className="text-xs text-muted line-clamp-2">
                      {w.description}
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
