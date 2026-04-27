import { notFound } from "next/navigation";
import providers from "../../../data/providers.json";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Breadcrumb from "../../components/Breadcrumb";

export async function generateStaticParams() {
  return providers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const provider = providers.find((p) => p.slug === slug);
  if (!provider) return {};
  return {
    title: `${provider.name}の評判・料金・速度【マンション向け】 | マンション回線ガイド`,
    description: `${provider.name}のマンションタイプを徹底レビュー。月額${provider.monthlyPrice.toLocaleString()}円、最大速度${provider.speed}。メリット・デメリット・スマホ割情報を詳しく解説します。`,
  };
}

export default async function ProviderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const provider = providers.find((p) => p.slug === slug);

  if (!provider) {
    notFound();
  }

  const faqData = [
    {
      q: `${provider.name}のマンションタイプはどのくらいの速度が出ますか？`,
      a: `理論値は最大${provider.speed}ですが、マンションでの実測値は配線方式や時間帯によって異なります。光配線方式なら300〜800Mbps程度、VDSL方式では30〜80Mbps程度が目安です。`,
    },
    {
      q: `${provider.name}の申し込みから開通までどのくらいかかりますか？`,
      a: `通常は申し込みから1〜2週間で開通できます。ただし、マンションへの設備未導入の場合や引っ越しシーズン（3〜4月）は1〜3ヶ月かかることがあります。`,
    },
    {
      q: `${provider.name}に乗り換える場合、違約金はかかりますか？`,
      a: `現在ご利用中の回線に契約期間の縛りがある場合、違約金が発生する可能性があります。${provider.name}への乗り換えキャンペーンで他社違約金を負担してもらえる場合があるため、公式サイトでご確認ください。`,
    },
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: provider.name,
    description: `マンション向け光回線サービス。月額${provider.monthlyPrice.toLocaleString()}円、最大${provider.speed}。`,
    offers: {
      "@type": "Offer",
      price: provider.monthlyPrice,
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="bg-white border-b border-border">
        <Breadcrumb
          items={[
            { label: "プロバイダ比較", href: "/#compare" },
            { label: provider.name },
          ]}
        />
      </div>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                光回線レビュー
              </span>
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                マンションタイプ
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {provider.name}の評判・料金・速度
              <br className="hidden md:block" />
              【マンション向け徹底レビュー】
            </h1>
            <p className="text-muted text-lg mb-8">
              {provider.name}のマンションタイプをメリット・デメリット・スマホ割まで詳しく解説します。
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl border border-border p-4 text-center">
                <p className="text-xs text-muted mb-1">月額料金（税込）</p>
                <p className="text-2xl font-bold text-primary">
                  {provider.monthlyPrice.toLocaleString()}
                  <span className="text-sm font-normal text-muted">円〜</span>
                </p>
              </div>
              <div className="bg-white rounded-xl border border-border p-4 text-center">
                <p className="text-xs text-muted mb-1">最大速度</p>
                <p className="text-2xl font-bold text-foreground">
                  {provider.speed}
                </p>
              </div>
              <div className="col-span-2 md:col-span-1 bg-white rounded-xl border border-border p-4 text-center">
                <p className="text-xs text-muted mb-1">スマホセット割</p>
                <p className="text-sm font-bold text-accent leading-snug">
                  {provider.smartphoneDiscount}
                </p>
              </div>
            </div>

            <a
              href={provider.officialUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-xl text-lg transition-colors shadow-lg shadow-accent/25"
            >
              {provider.name}の公式サイトを見る
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
            <p className="text-xs text-muted mt-2">※ 広告・PRリンクです</p>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {provider.name}の特徴
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {provider.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10"
                >
                  <span className="text-primary font-bold mt-0.5 flex-shrink-0">
                    ✓
                  </span>
                  <p className="text-sm text-foreground font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              メリット・デメリット
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pros */}
              <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6">
                <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
                  <span className="text-xl">✅</span> メリット
                </h3>
                <ul className="space-y-3">
                  {provider.pros.map((pro, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <span className="text-emerald-500 font-bold mt-0.5 flex-shrink-0">
                        +
                      </span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6">
                <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
                  <span className="text-xl">⚠️</span> デメリット
                </h3>
                <ul className="space-y-3">
                  {provider.cons.map((con, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">
                        -
                      </span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Users */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {provider.name}がおすすめな方
            </h2>
            <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6">
              <ul className="space-y-3">
                {provider.pros.slice(0, 3).map((pro, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{pro}を重視する方</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              よくある質問
            </h2>
            <div className="space-y-4">
              {faqData.map((faq, i) => (
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
              {provider.name}の詳細・申し込みはこちら
            </h2>
            <p className="text-primary/10 text-white/80 mb-6">
              公式サイトで最新キャンペーン・キャッシュバック情報をご確認ください
            </p>
            <a
              href={provider.officialUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-xl text-lg transition-colors shadow-lg"
            >
              {provider.name}公式サイトへ
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
              ※ 広告・PRリンクです。料金は税込・マンションタイプの場合。（2026年4月時点）
            </p>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-lg font-bold text-foreground mb-4">
              関連ガイド
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href="/wiring/overview/"
                className="block p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <p className="text-sm font-bold text-foreground mb-1">
                  配線方式ガイド
                </p>
                <p className="text-xs text-muted">
                  マンションの3つの配線方式を解説
                </p>
              </a>
              <a
                href="/carrier/docomo/"
                className="block p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <p className="text-sm font-bold text-foreground mb-1">
                  スマホ別おすすめ
                </p>
                <p className="text-xs text-muted">
                  キャリア別の最適な光回線を紹介
                </p>
              </a>
              <a
                href="/#compare"
                className="block p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <p className="text-sm font-bold text-foreground mb-1">
                  10社料金比較
                </p>
                <p className="text-xs text-muted">
                  マンション光回線の料金一覧表
                </p>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
