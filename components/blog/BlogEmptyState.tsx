import Link from "next/link";
import { Tag } from "lucide-react";

const BlogEmptyState = () => {
  return (
    <div className="text-center py-16 bg-white rounded-lg shadow-sm">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Tag className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Aucun article pour le moment</h2>
        <p className="text-gray-600 mb-6">
          Nos experts préparent du contenu de qualité pour vous. Revenez bientôt !
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default BlogEmptyState;
