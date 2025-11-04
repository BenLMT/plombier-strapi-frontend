import type { Metadata } from "next";
import "./globals.css";
import LivePreview from "@/components/LivePreview";

export const metadata: Metadata = {
  title: "Plombier Paris Urgence 24h/7j - Intervention 15min Garantie | Devis Gratuit",
  description: "⚡ URGENCE PLOMBERIE PARIS ⚡ Intervention GARANTIE sous 15 minutes ⚡ Fuite, débouchage, chaudière ⚡ +1000 clients satisfaits ⚡ Devis gratuit immédiat",
  keywords: "plombier paris urgence, dépannage plomberie paris 24h, fuite eau paris, débouchage paris, plombier paris pas cher, intervention rapide",
  openGraph: {
    title: "Plombier Paris Urgence - Intervention 15min Garantie",
    description: "Plombier d'urgence à Paris. Intervention garantie sous 15 minutes. Fuite, débouchage, chaudière. Devis gratuit.",
    type: "website",
    url: "https://plombier-paris-urgence.fr",
  },
  alternates: {
    canonical: "https://plombier-paris-urgence.fr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-sans bg-gray-50">
        <LivePreview />
        {children}
      </body>
    </html>
  );
}
