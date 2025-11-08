'use client';

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleTableOfContentsSectionProps {
  contentHtml: string;
}

const ArticleTableOfContentsSection = ({ contentHtml }: ArticleTableOfContentsSectionProps) => {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!contentHtml) {
      setToc([]);
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(contentHtml, "text/html");
    const headings = doc.querySelectorAll("h2, h3");

    const items: TOCItem[] = [];
    headings.forEach((heading, index) => {
      const text = heading.textContent || "";
      const level = parseInt(heading.tagName.substring(1));
      const id = `heading-${index}`;
      items.push({ id, text, level });
    });

    setToc(items);

    let cleanup: (() => void) | undefined;

    const frameId = window.requestAnimationFrame(() => {
      const articleHeadings = document.querySelectorAll(
        ".article-content h2, .article-content h3"
      );

      articleHeadings.forEach((heading, index) => {
        heading.id = `heading-${index}`;
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "-100px 0px -80% 0px" }
      );

      articleHeadings.forEach((heading) => observer.observe(heading));

      cleanup = () => observer.disconnect();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      cleanup?.();
    };
  }, [contentHtml]);

  if (!contentHtml || toc.length === 0) return null;

  return (
    <aside className="hidden lg:block lg:col-span-2">
      <div className="sticky top-24 space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wider">
            Dans cet article
          </h3>
          <nav className="space-y-1">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`block text-sm transition py-1.5 border-l-2 pl-3 -ml-3 ${
                  item.level === 3 ? "pl-6" : ""
                } ${
                  activeId === item.id
                    ? "text-secondary border-secondary font-medium"
                    : "text-gray-600 border-transparent hover:text-secondary hover:border-secondary"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(item.id);
                  if (element) {
                    const headerOffset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default ArticleTableOfContentsSection;
