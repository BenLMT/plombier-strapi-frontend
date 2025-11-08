/**
 * Utilitaires pour parser et transformer le contenu Markdown depuis Strapi
 */

const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

/**
 * Convertit le Markdown en HTML avec support des images Strapi
 */
export function parseMarkdownToHTML(markdown?: string | null): string {
  if (!markdown) {
    return "";
  }

  // Convertir les \n littéraux en vrais retours à la ligne
  let html = markdown.replace(/\\n/g, '\n');

  // 1. Gérer les images Strapi
  // Supporte les URLs absolues (http/https) et relatives pointant vers /uploads/
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt, url) => {
      const trimmedUrl = url.trim();

      // Laisser intact si ce n'est pas une ressource Strapi
      if (!trimmedUrl.includes('/uploads/')) {
        return match;
      }

      let finalPath = trimmedUrl;

      try {
        // Si URL absolue, extraire le pathname
        const parsed = new URL(trimmedUrl);
        finalPath = parsed.pathname;
      } catch (error) {
        // Si URL relative, s'assurer qu'elle commence par /
        if (!finalPath.startsWith('/')) {
          finalPath = `/${finalPath}`;
        }
      }

      return `<img src="${baseURL}${finalPath}" alt="${alt}" class="rounded-lg shadow-md my-6 w-full max-w-2xl mx-auto" />`;
    }
  );

  // 2. Gérer les titres
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-4xl font-bold text-primary mt-8 mb-4">$1</h1>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-3xl font-bold text-primary mt-8 mb-4">$1</h2>');
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-2xl font-semibold text-primary mt-6 mb-3">$1</h3>');
  html = html.replace(/^#### (.+)$/gm, '<h4 class="text-xl font-semibold text-gray-900 mt-4 mb-2">$1</h4>');

  // 3. Gérer les séparateurs horizontaux
  html = html.replace(/^---$/gm, '<hr class="my-8 border-gray-300" />');

  // 4. Gérer le gras et l'italique
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');

  // 5. Gérer les listes à puces
  html = html.replace(/^\* (.+)$/gm, '<li class="ml-6 mb-2">$1</li>');
  html = html.replace(/(<li class="ml-6 mb-2">.+<\/li>\n?)+/g, '<ul class="list-disc mb-4">$&</ul>');

  // 6. Gérer les listes numérotées
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-6 mb-2">$1</li>');
  html = html.replace(/(<li class="ml-6 mb-2">.+<\/li>\n?)+/g, (match) => {
    if (match.includes('list-disc')) return match;
    return `<ol class="list-decimal mb-4">${match}</ol>`;
  });

  // 7. Gérer les tableaux (format Markdown)
  html = html.replace(
    /\|(.+)\|\n\|[\s:|-]+\|\n((?:\|.+\|\n?)+)/g,
    (match, header, rows) => {
      const headers = header.split('|').filter(Boolean).map((h: string) => h.trim());
      const rowsArray = rows.trim().split('\n').map((row: string) => 
        row.split('|').filter(Boolean).map((cell: string) => cell.trim())
      );

      let table = '<table class="w-full border-collapse my-6"><thead><tr>';
      headers.forEach((h: string) => {
        table += `<th class="bg-primary text-white p-3 text-left font-semibold">${h}</th>`;
      });
      table += '</tr></thead><tbody>';
      
      rowsArray.forEach((row: string[]) => {
        table += '<tr>';
        row.forEach((cell: string) => {
          table += `<td class="border border-gray-300 p-3">${cell}</td>`;
        });
        table += '</tr>';
      });
      
      table += '</tbody></table>';
      return table;
    }
  );

  // 8. Gérer les paragraphes (tout ce qui n'est pas déjà dans une balise)
  html = html.split('\n').map(line => {
    line = line.trim();
    if (!line) return '';
    if (line.startsWith('<')) return line;
    if (line.match(/^(#{1,6}|\*|\d+\.|-{3,})/)) return line;
    return `<p class="text-gray-700 leading-relaxed mb-4">${line}</p>`;
  }).join('\n');

  return html;
}

/**
 * Nettoie le contenu HTML pour éviter les problèmes d'affichage
 */
export function sanitizeHTML(html: string): string {
  // Supprimer les balises script et style
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  return html;
}
