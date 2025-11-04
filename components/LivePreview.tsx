"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LivePreview() {
  const router = useRouter();

  useEffect(() => {
    const handleMessage = async (message: MessageEvent<any>) => {
      const { origin, data } = message;

      // Vérifier l'origine du message
      if (origin !== process.env.NEXT_PUBLIC_STRAPI_API_URL) {
        return;
      }

      // Gérer les différents types de messages
      if (data.type === "strapiUpdate") {
        // Rafraîchir le contenu quand Strapi envoie une mise à jour
        router.refresh();
      } else if (data.type === "strapiScript") {
        // Injecter le script de Live Preview
        const script = window.document.createElement("script");
        script.textContent = data.payload.script;
        window.document.head.appendChild(script);
      }
    };

    // Ajouter l'event listener
    window.addEventListener("message", handleMessage);

    // Informer Strapi que le frontend est prêt
    window.parent?.postMessage({ type: "previewReady" }, "*");

    // Nettoyer l'event listener au démontage
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [router]);

  return null;
}
