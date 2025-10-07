import { RiStarFill } from "react-icons/ri";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useServicesList from "../../hooks/useServicesList";
import useSavedList from "../../hooks/useSavedList";
import Swal from "sweetalert2";

const AllServices = () => {
  const {
    services,
    loading: servicesLoading,
    error: servicesError,
  } = useServicesList([]);
  const {
    savedServices,
    saveService,
    loading: saveLoading,
    error: saveError,
  } = useSavedList();

  // State for filters, search, and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: [],
    priceRange: [0, 200],
    rating: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of services per page

  // Get unique categories from services
  const categories = [
    ...new Set(services.map((service) => service.category.title)),
  ];

  // Handle clearing the search field
  const handleClearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1); // Reset to first page on search clear
  };

  // Check if a service is saved
  const isServiceSaved = (serviceId) => {
    return savedServices.some((saved) => saved.service.id === serviceId);
  };

  // Handle saving a service
  const handleSaveService = async (serviceId) => {
    if (isServiceSaved(serviceId)) {
      Swal.fire({
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        text: "You have already saved this service.",
        icon: "info",
      });
      return;
    }

    console.log("Saving service with ID:", serviceId);
    const success = await saveService(serviceId);
    if (success) {
      console.log("Service saved successfully");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Service saved successfully",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
    } else {
      console.error("Failed to save service");
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to save service",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
    }
  };

  // Filter services based on all criteria
  const filteredPackages = services.filter((service) => {
    const matchesSearch = service.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filters.category.length === 0 ||
      filters.category.includes(service.category.title);
    const matchesPrice =
      parseFloat(service.price) >= filters.priceRange[0] &&
      parseFloat(service.price) <= filters.priceRange[1];
    const matchesRating =
      filters.rating === 0 || service.average_rating >= filters.rating;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServices = filteredPackages.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle filter changes
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      category: checked
        ? [...prev.category, value]
        : prev.category.filter((cat) => cat !== value),
    }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value);
    setFilters((prev) => ({
      ...prev,
      priceRange: [
        prev.priceRange[0],
        value <= prev.priceRange[0] ? prev.priceRange[0] : value,
      ],
    }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleMinPriceChange = (e) => {
    const value = parseFloat(e.target.value);
    setFilters((prev) => ({
      ...prev,
      priceRange: [
        value >= prev.priceRange[1] ? prev.priceRange[1] : value,
        prev.priceRange[1],
      ],
    }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleRatingChange = (e) => {
    const value = parseFloat(e.target.value);
    setFilters((prev) => ({ ...prev, rating: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Pagination navigation
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
    }
  };

  if (servicesLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (servicesError)
    return (
      <div className="text-center text-red-600">Error: {servicesError}</div>
    );

  return (
    <div className="py-6 px-4 min-h-screen container mx-auto mt-16 md:mt-0">
      {saveError && (
        <div className="text-red-500 text-center mb-4">{saveError}</div>
      )}
      <div className="flex gap-10">
        {/* Sidebar (Visible only on large screens) */}
        <div className="hidden lg:block lg:w-1/4">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Filters</h2>

          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <input
                    type="checkbox"
                    value={cat}
                    checked={filters.category.includes(cat)}
                    onChange={handleCategoryChange}
                    className="h-4 w-4 text-[#D7D4EE] accent-[#C8C1F5]"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6 border border-gray-200 bg-[#D7D4EE] rounded-xl">
            <div className="px-4 pt-3 pb-1">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Price Range
              </h4>
            </div>
            <div className="flex items-center gap-2 bg-white p-5 border border-gray-200 rounded-xl">
              <input
                type="range"
                min="0"
                max="200"
                value={filters.priceRange[0]}
                onChange={handleMinPriceChange}
                className="w-1/2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C8C1F5]"
              />
              <span className="text-sm text-gray-600">
                ${filters.priceRange[0].toFixed(2)}
              </span>
              <span className="text-sm text-gray-600">-</span>
              <input
                type="range"
                min="0"
                max="200"
                value={filters.priceRange[1]}
                onChange={handlePriceChange}
                className="w-1/2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C8C1F5]"
              />
              <span className="text-sm text-gray-600">
                ${filters.priceRange[1].toFixed(2)}
              </span>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6 border border-gray-200 bg-[#D7D4EE] rounded-xl">
            <div className="px-4 pt-3 pb-1">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Rating</h4>
            </div>
            <div className="flex items-center gap-2 bg-white p-5 border border-gray-200 rounded-xl">
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={filters.rating}
                onChange={handleRatingChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C8C1F5]"
              />
              <span className="text-sm text-gray-600">
                {filters.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search Input */}
          <div className="relative w-fullz-10 bg-white">
            <input
              type="text"
              placeholder="Search services by title..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search change
              }}
              className="w-full px-4 py-4 pl-10 pr-10 text-sm border border-gray-200 outline-none rounded-xl shadow-lg"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            )}
          </div>

          {/* Packages Grid */}
          <div className="pt-6">
            {paginatedServices.length === 0 && (
              <div className="text-center text-gray-600">No services found</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedServices.map((service) => (
                <Link
                  to={`/serviceDetails/${service.id}`}
                  key={service.id}
                  className="relative border border-gray-200 rounded-xl p-3 bg-white shadow-md hover:shadow-2xl transform transition-all duration-300 ease-in-out"
                >
                  <div className="absolute top-3 left-3 bg-white/40 backdrop-blur-2xl text-black text-sm font-semibold px-3 py-2 rounded-br-xl flex items-center gap-1 transition-all duration-300">
                    <RiStarFill className="text-yellow-500" />{" "}
                    {service.average_rating.toFixed(1)}
                  </div>
                  <img
                    src={
                      service.cover_photo ||
                      "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    }
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-lg"
                    crossOrigin="anonymous"
                  />
                  <div className="flex items-center justify-between mt-2 border-b pb-2 border-gray-200">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          service.seller.photo ||
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                        }
                        className="w-5 h-5 rounded-full object-cover"
                        alt={service.seller.full_name}
                      />
                      <p className="text-gray-700 font-medium hover:text-gray-900 transition-colors duration-300">
                        {service.seller.full_name}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="font-semibold text-gray-800 hover:text-[#1E40AF] transition-colors duration-300">
                      {service.title}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="flex items-baseline">
                      <p className="font-semibold text-gray-800">
                        ${parseFloat(service.price).toFixed(2)}
                      </p>
                    </span>
                    <span className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors duration-300">
                      <Heart
                        className={`w-5 h-5 cursor-pointer transition-colors duration-300 ${
                          saveLoading
                            ? "text-gray-400 animate-pulse"
                            : isServiceSaved(service.id)
                            ? "text-red-500 fill-red-500"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSaveService(service.id);
                        }}
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-100"
                >
                  Previous
                </button>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${
                      currentPage === page
                        ? "bg-[#C8C1F5] text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-100"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllServices;
