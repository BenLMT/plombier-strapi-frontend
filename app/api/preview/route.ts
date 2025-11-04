import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  // Parser les paramètres de l'URL
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const url = searchParams.get("url");
  const status = searchParams.get("status");

  // Vérifier le secret
  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  // Activer ou désactiver le Draft Mode selon le statut
  if (status === "published") {
    draftMode().disable();
  } else {
    draftMode().enable();
  }

  // Rediriger vers l'URL demandée
  redirect(url || "/");
}
