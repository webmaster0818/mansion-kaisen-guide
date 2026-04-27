interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems = [{ label: "ホーム", href: "/" }, ...items];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://mansion-kaisen-guide.com${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="パンくずリスト" className="py-3 px-4">
        <ol className="max-w-6xl mx-auto flex flex-wrap items-center gap-1 text-sm text-muted">
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && (
                <svg
                  className="w-3 h-3 text-muted/50 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              )}
              {item.href && index < allItems.length - 1 ? (
                <a
                  href={item.href}
                  className="hover:text-primary transition-colors truncate max-w-[150px] md:max-w-none"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className="text-foreground font-medium truncate max-w-[200px] md:max-w-none"
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
