import { notFound } from "next/navigation";
import knowledge from "../../../data/knowledge.json";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Breadcrumb from "../../components/Breadcrumb";

export async function generateStaticParams() {
  return knowledge.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = knowledge.find((k) => k.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} | マンション回線ガイド`,
    description: item.description,
  };
}

export default async function KnowledgePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = knowledge.find((k) => k.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <div className="bg-white border-b border-border">
        <Breadcrumb
          items={[
            { label: "基礎知識", href: "/knowledge/what-is-hikari/" },
            { label: item.title },
          ]}
        />
      </div>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                基礎知識
              </span>
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                光回線
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {item.title}
            </h1>
            <p className="text-muted text-lg">{item.description}</p>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 bg-white border-b border-border">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-primary/5 rounded-xl border border-primary/20 p-6">
              <h2 className="text-base font-bold text-foreground mb-3">目次</h2>
              <ol className="space-y-2">
                {item.sections.map((section, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <a
                      href={`#section-${i}`}
                      className="text-primary hover:underline"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Sections */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 space-y-10">
            {item.sections.map((section, i) => (
              <div key={i} id={`section-${i}`} className="scroll-mt-20">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  {section.heading}
                </h2>
                <div className="bg-white rounded-xl border border-border p-6">
                  <p className="text-foreground leading-relaxed">{section.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">覚えておきたいポイント</h2>
            <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
              <ul className="space-y-3">
                {item.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="text-blue-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">よくある質問</h2>
            <div className="space-y-4">
              {item.faqs.map((faq, i) => (
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
              光回線を比較・申し込みする
            </h2>
            <p className="text-white/80 mb-6">
              マンション向け光回線の料金・速度・特徴を一覧で比較
            </p>
            <a
              href="/#compare"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-xl text-lg transition-colors shadow-lg"
            >
              プロバイダ比較を見る
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
          </div>
        </section>

        {/* Related */}
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-lg font-bold text-foreground mb-4">関連する基礎知識</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href="/knowledge/what-is-hikari/"
                className="block p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <p className="text-sm font-bold text-foreground mb-1">光回線とは？</p>
                <p className="text-xs text-muted">仕組みをわかりやすく解説</p>
              </a>
              <a
                href="/knowledge/ipv6/"
                className="block p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <p className="text-sm font-bold text-foreground mb-1">IPv6（IPoE）とは？</p>
                <p className="text-xs text-muted">速くなる理由と対応回線</p>
              </a>
              <a
                href="/knowledge/construction-flow/"
                className="block p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <p className="text-sm font-bold text-foreground mb-1">工事の流れ</p>
                <p className="text-xs text-muted">マンション編・所要時間</p>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
