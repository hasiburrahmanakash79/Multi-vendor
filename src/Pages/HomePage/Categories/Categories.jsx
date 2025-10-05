import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import useCategoriesData from "../../../hooks/useCategoriesData";

const Categories = () => {
  const { categories, loading, error } = useCategoriesData([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  

  // Predefined color schemes to cycle through for each category
  const colorSchemes = [
    { bgColor: "bg-blue-100" },
    { bgColor: "bg-pink-100" },
    { bgColor: "bg-purple-100" },
    { bgColor: "bg-yellow-100" },
    { bgColor: "bg-green-100" },
    { bgColor: "bg-red-100" },
    // Add more schemes if you have more categories (e.g., { bgColor: "bg-indigo-100" })
  ];

  // Function to get color scheme based on category index
  const getColorScheme = (index) => {
    return colorSchemes[index % colorSchemes.length];
  };

  if (loading) return <div className="text-center text-gray-600">Loading categories...</div>;
  if (error) return <div className="text-center text-red-600">Error loading categories: {error}</div>;

  const visibleCards = 6;
  const maxIndex = Math.max(0, categories.length - visibleCards);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= maxIndex) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return maxIndex;
      }
      return prevIndex - 1;
    });
  };

  return (
    <div className="py-7 container mx-auto md:mt-10">
      <div className="px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Explore Categories
          </h2>

          <div className="flex space-x-2 py-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 bg-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-[#C8C1F5] duration-300"
              disabled={categories.length <= visibleCards}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 bg-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-[#C8C1F5] duration-300"
              disabled={categories.length <= visibleCards}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="text-center text-gray-600">No categories available</div>
        ) : (
          <div className="overflow-hidden py-3">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
                width: `${(categories.length / visibleCards) * 100}%`,
              }}
            >
              {categories.map((category, index) => {
                const { bgColor } = getColorScheme(index);
                return (
                  <div key={category.id} className="flex-shrink-0 w-36 md:w-56 px-2">
                    <div
                      className={`${bgColor} rounded-2xl p-6 h-48 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group`}
                    >
                      <div
                        className={`w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <img
                          src={category.logo || "https://via.placeholder.com/40?text=?"} // Fallback image if logo is null
                          alt={category.title}
                          className="w-10 h-10 object-contain"
                          crossOrigin="anonymous"
                        />
                      </div>
                      <h3 className="text-center text-gray-700 font-medium text-sm">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;