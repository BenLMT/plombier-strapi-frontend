import { draftMode } from "next/headers";
import qs from "qs";

const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

/**
 * Récupère des données depuis Strapi avec support du mode draft
 */
export async function fetchContentType(
  contentType: string,
  params: Record<string, any> = {}
): Promise<any> {
  // Vérifier si le draft mode est activé
  const { isEnabled: isDraftMode } = await draftMode();
  
  try {
    const queryParams = { ...params };
    
    // Strapi v5 : Utiliser publicationState au lieu de status
    if (isDraftMode) {
      queryParams.publicationState = "preview"; // preview = draft + published
    } else {
      queryParams.publicationState = "live"; // live = published only
    }
    
    const url = `${baseURL}/api/${contentType}?${qs.stringify(queryParams)}`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        // Activer les content source maps en mode preview pour Live Preview
        "strapi-encode-source-maps": isDraftMode ? "true" : "false",
      },
      // Désactiver le cache en mode preview, revalider toutes les 60 secondes en production
      next: isDraftMode ? { revalidate: 0 } : { revalidate: 60 },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Strapi API Error: ${response.status} - ${errorText}`);
      throw new Error(
        `Failed to fetch data from Strapi (url=${url}, status=${response.status})`
      );
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
}

/**
 * Récupère un seul document par son ID
 */
export async function fetchDocument(
  contentType: string,
  documentId: string,
  params: Record<string, any> = {}
): Promise<any> {
  const { isEnabled: isDraftMode } = await draftMode();
  
  try {
    const queryParams = { ...params };
    
    // Strapi v5 : Utiliser publicationState
    if (isDraftMode) {
      queryParams.publicationState = "preview";
    } else {
      queryParams.publicationState = "live";
    }
    
    const url = `${baseURL}/api/${contentType}/${documentId}?${qs.stringify(queryParams)}`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        "strapi-encode-source-maps": isDraftMode ? "true" : "false",
      },
      next: isDraftMode ? { revalidate: 0 } : { revalidate: 60 },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Strapi API Error: ${response.status} - ${errorText}`);
      throw new Error(
        `Failed to fetch document from Strapi (url=${url}, status=${response.status})`
      );
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
}
