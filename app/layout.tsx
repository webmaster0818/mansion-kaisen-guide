import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-jp",
  weight: ["400", "500", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "マンション回線ガイド｜マンション向け光回線おすすめ比較【2026年最新】",
  description:
    "マンション・アパート向け光回線10社を徹底比較。配線方式（光配線/VDSL/LAN）別の解説、スマホセット割、賃貸での注意点まで網羅。あなたの住まいに最適なインターネット回線が見つかります。",
  openGraph: {
    title: "マンション回線ガイド｜マンション向け光回線おすすめ比較【2026年最新】",
    description:
      "マンション・アパート向け光回線10社を徹底比較。配線方式別の専門解説で最適な回線が見つかります。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <head>
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
