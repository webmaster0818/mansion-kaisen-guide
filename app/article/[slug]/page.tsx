import { notFound } from "next/navigation";
import articles from "../../../data/articles.json";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Breadcrumb from "../../components/Breadcrumb";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} | マンション回線ガイド`,
    description: article.description,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <div className="bg-white border-b border-border">
        <Breadcrumb
          items={[
            { label: "コラム", href: "/article/nuro-mansion/" },
            { label: article.title },
          ]}
        />
      </div>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                コラム
              </span>
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                マンション向け
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {article.title}
            </h1>
            <p className="text-muted text-lg">{article.description}</p>
            <p className="text-xs text-muted mt-3">
              最終更新：2026年4月 | 運営：株式会社MediaX
            </p>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 bg-white border-b border-border">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-primary/5 rounded-xl border border-primary/20 p-6">
              <h2 className="text-base font-bold text-foreground mb-3">この記事でわかること</h2>
              <ol className="space-y-2">
                {article.sections.map((section, i) => (
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
            {article.sections.map((section, i) => (
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
            <h2 className="text-2xl font-bold text-foreground mb-6">まとめ・ポイント</h2>
            <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6">
              <ul className="space-y-3">
                {article.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="text-primary font-bold mt-0.5 flex-shrink-0">✓</span>
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
              {article.faqs.map((faq, i) => (
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
              マンション向け光回線を比較する
            </h2>
            <p className="text-white/80 mb-6">
              料金・速度・キャンペーンを10社一覧で比較
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
            <p className="text-xs text-white/60 mt-3">
              ※ 広告・PRリンクを含みます。掲載情報は2026年4月時点のものです。
            </p>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-lg font-bold text-foreground mb-4">関連コラム</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href="/article/nuro-mansion/"
                className="block p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <p className="text-sm font-bold text-foreground mb-1">NURO光 マンション</p>
                <p className="text-xs text-muted">導入条件と代替案</p>
              </a>
              <a
                href="/article/wifi-router/"
                className="block p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <p className="text-sm font-bold text-foreground mb-1">Wi-Fiルーターおすすめ</p>
                <p className="text-xs text-muted">2026年マンション向け5選</p>
              </a>
              <a
                href="/article/speed-test/"
                className="block p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <p className="text-sm font-bold text-foreground mb-1">回線速度の正しい計測方法</p>
                <p className="text-xs text-muted">マンション編</p>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
