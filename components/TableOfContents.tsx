'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Parser le HTML pour extraire les titres H2 et H3
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');
    
    const items: TOCItem[] = [];
    headings.forEach((heading, index) => {
      const text = heading.textContent || '';
      const level = parseInt(heading.tagName.substring(1));
      const id = `heading-${index}`;
      
      items.push({ id, text, level });
    });
    
    setToc(items);

    // Attendre que le DOM soit prêt avant d'ajouter les IDs et l'observer
    const timer = setTimeout(() => {
      const articleHeadings = document.querySelectorAll('.article-content h2, .article-content h3');
      
      // Ajouter les IDs aux titres
      articleHeadings.forEach((heading, index) => {
        heading.id = `heading-${index}`;
      });

      // Observer pour détecter quel titre est visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: '-100px 0px -80% 0px' }
      );

      // Observer tous les titres
      articleHeadings.forEach((heading) => {
        observer.observe(heading);
      });

      // Cleanup
      return () => observer.disconnect();
    }, 200);

    return () => clearTimeout(timer);
  }, [content]);

  if (toc.length === 0) {
    return null;
  }

  return (
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
              item.level === 3 ? 'pl-6' : ''
            } ${
              activeId === item.id
                ? 'text-secondary border-secondary font-medium'
                : 'text-gray-600 border-transparent hover:text-secondary hover:border-secondary'
            }`}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(item.id);
              if (element) {
                const headerOffset = 100; // Hauteur du header sticky
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
