const BlogCategoriesFilter = () => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">
        Tous
      </button>
      <button className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
        Conseils
      </button>
      <button className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
        Actualités
      </button>
      <button className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
        Guides
      </button>
    </div>
  );
};

export default BlogCategoriesFilter;
