import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { problem, prenom, telephone, arrondissement, description } = body;

    // Validation basique
    if (!problem || !prenom || !telephone || !arrondissement) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // Ici vous pouvez :
    // 1. Envoyer vers Strapi
    // 2. Envoyer un email
    // 3. Enregistrer dans une base de données
    // 4. Envoyer vers un CRM

    // Exemple d'envoi vers Strapi (à adapter selon votre configuration)
    const strapiUrl = process.env.STRAPI_API_URL || "http://localhost:1337";
    
    try {
      const strapiResponse = await fetch(`${strapiUrl}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            problem,
            prenom,
            telephone,
            arrondissement,
            description,
            status: "nouveau",
            createdAt: new Date().toISOString(),
          },
        }),
      });

      if (!strapiResponse.ok) {
        console.error("Erreur Strapi:", await strapiResponse.text());
      }
    } catch (strapiError) {
      console.error("Erreur lors de l'envoi vers Strapi:", strapiError);
      // Continue même si Strapi échoue
    }

    // Retourner une réponse de succès
    return NextResponse.json(
      { 
        success: true, 
        message: "Demande envoyée avec succès" 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur API leads:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
