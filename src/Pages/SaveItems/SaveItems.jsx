// import { Link } from "react-router-dom";
// import { RiHeartFill, RiStarFill } from "react-icons/ri";
// import { useState } from "react";
// import useSavedList from "../../hooks/useSavedList";
// import Swal from "sweetalert2";

// const SaveItems = () => {
//   const { savedServices, loading, error, saveService } = useSavedList();
//   console.log(savedServices, "savedServices");

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = savedServices.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(savedServices.length / itemsPerPage);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleUnsaveService = async (serviceId) => {
//     console.log(`Unsaving service ID: ${serviceId}`);
//     const success = await saveService(serviceId, true); // true indicates the service is saved, so unsave it
//     if (success) {
//       console.log("Service unsaved successfully");
//       Swal.fire({
//         position: "top-end",
//         icon: "success",
//         title: "Service unsaved successfully",
//         showConfirmButton: false,
//         timer: 1500,
//         toast: true,
//       });
//     } else {
//       console.error("Failed to unsave service");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center min-h-screen items-center h-40">
//         <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-red-500 text-center py-5">
//         Error: {error}
//       </div>
//     );
//   }

//   if (savedServices.length === 0) {
//     return (
//       <div className="text-gray-600 text-center min-h-screen flex flex-col items-center justify-center py-5">
//        <h1> No saved services found.</h1>
//         <Link

//           to="/services"
//           className="mt-4 py-2 px-6 bg-[#c8c1f5]  text-gray-600 rounded-full hover:bg-[#b0a8e2] transition-colors duration-300"
//         >
//           Browse Services
//         </Link>
//       </div>
//     );
//   }

//   console.log(currentItems);
//   return (
//     <div className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">
//           Saved Items
//         </h1>
//       </div>

//       <div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {currentItems.map((service) => (
//             <Link
//               to={`/serviceDetails/${service.service?.id}`}
//               key={service.id}
//               className="relative border border-gray-200 rounded-xl hover:shadow-2xl transform duration-500 p-3"
//             >
//               <div className="absolute top-3 left-3 bg-white/40 text-black text-sm font-semibold px-3 py-2 rounded-br-xl flex items-center gap-1">
//                 <RiStarFill className="inline text-yellow-400" />{" "}
//                 {service.average_rating}
//               </div>
//               <img
//                 src={service.service?.cover_photo}
//                 alt={service.service?.title || "Service"}
//                 className="w-full h-48 object-cover rounded-lg"
//                 crossOrigin="anonymous"
//               />
//               <div className="flex items-center justify-between mt-2 border-b pb-2 border-gray-200">
//                 <div className="flex items-center gap-2">
//                   <img
//                     src={service.service?.seller?.photo}
//                     className="w-5 h-5 rounded-full object-cover"
//                     alt={service.service?.seller?.full_name || "Seller"}
//                   />
//                   <p>{service.service?.seller?.full_name || "Unknown Seller"}</p>
//                 </div>
//               </div>
//               <div className="mt-2">
//                 <p className="font-semibold">{service.service?.title || "Untitled Service"}</p>
//               </div>
//               <div className="flex items-center justify-between mt-2">
//                 <span className="flex items-baseline">
//                   <p className="font-semibold">${service.service?.price || "N/A"}</p>
//                 </span>
//                 <span className="bg-gray-100 p-2 rounded-full hover:shadow transition-shadow duration-300">
//                   <RiHeartFill
//                     className={`w-5 h-5 cursor-pointer transition-colors duration-300 ${
//                       loading ? "text-gray-400 animate-pulse" : "text-red-500 fill-red-500"
//                     }`}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleUnsaveService(service?.id);
//                     }}
//                   />
//                 </span>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {totalPages > 1 && (
//           <div className="flex justify-center mt-8">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="mx-1 px-3 py-2 w-10 h-10 rounded-full bg-gray-200 text-gray-700 disabled:opacity-50"
//             >
//               &lt;
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={page}
//                 onClick={() => handlePageChange(page)}
//                 className={`mx-1 px-3 py-2 w-10 h-10 rounded-full ${
//                   currentPage === page ? "bg-purple-200" : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="mx-1 px-3 py-2 w-10 h-10 rounded-full bg-gray-200 text-gray-700 disabled:opacity-50"
//             >
//               &gt;
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SaveItems;

import { Link } from "react-router-dom";
import { RiHeartFill, RiStarFill } from "react-icons/ri";
import { useState } from "react";
import useSavedList from "../../hooks/useSavedList";
import Swal from "sweetalert2";
import { ChevronDown, ChevronUp } from "lucide-react";

const SaveItems = () => {
  const { savedServices, loading, error, saveService } = useSavedList();
  console.log(savedServices, "savedServices");

  const [currentPage, setCurrentPage] = useState(1);
  const [openCategories, setOpenCategories] = useState({}); // Track open/closed state of categories
  const itemsPerPage = 10;

  // Define category mapping based on service titles
  const getCategory = (title) => {
    const categoryMap = {
      "Photography": "Photography",
      "Drone Photography": "Photography",
      "Khanapina": "Catering",
      "Catering Service": "Catering",
      "Buffet Setup": "Catering",
      "Event Planners": "Event Planning",
      "Wedding Car": "Transportation",
    };
    return categoryMap[title] || "Other";
  };

  // Group services by category
  const groupedServices = savedServices.reduce((acc, service) => {
    const category = getCategory(service.service?.title);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {});

  // Convert grouped services to an array for pagination
  const categories = Object.keys(groupedServices).sort();
  const paginatedServices = categories
    .flatMap(category => groupedServices[category])
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(savedServices.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUnsaveService = async (serviceId) => {
    console.log(`Unsaving service ID: ${serviceId}`);
    const success = await saveService(serviceId, true);
    if (success) {
      console.log("Service unsaved successfully");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Service unsaved successfully",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
    } else {
      console.error("Failed to unsave service");
    }
  };

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center min-h-screen items-center h-40">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-5">
        Error: {error}
      </div>
    );
  }

  if (savedServices.length === 0) {
    return (
      <div className="text-gray-600 text-center min-h-screen flex flex-col items-center justify-center py-5">
        <h1>No saved services found.</h1>
        <Link
          to="/services"
          className="mt-4 py-2 px-6 bg-[#c8c1f5] text-gray-600 rounded-full hover:bg-[#b0a8e2] transition-colors duration-300"
        >
          Browse Services
        </Link>
      </div>
    );
  }

  console.log("Grouped services:", groupedServices);
  console.log("Current items:", paginatedServices);

  return (
    <div className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Saved Items</h1>
      </div>

      <div>
        {categories.map((category) => (
          <div key={category} className="mb-4">
            <div
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => toggleCategory(category)}
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {category} ({groupedServices[category].length})
              </h2>
              {openCategories[category] ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </div>
            {openCategories[category] && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                {groupedServices[category].map((service) => (
                  <Link
                    to={`/serviceDetails/${service.service?.id}`}
                    key={service.id}
                    className="relative border border-gray-200 rounded-xl hover:shadow-2xl transform duration-500 p-3"
                  >
                    <div className="absolute top-3 left-3 bg-white/40 text-black text-sm font-semibold px-3 py-2 rounded-br-xl flex items-center gap-1">
                      <RiStarFill className="inline text-yellow-400" />
                      {service.average_rating}
                    </div>
                    <img
                      src={service.service?.cover_photo}
                      alt={service.service?.title || "Service"}
                      className="w-full h-48 object-cover rounded-lg"
                      crossOrigin="anonymous"
                    />
                    <div className="flex items-center justify-between mt-2 border-b pb-2 border-gray-200">
                      <div className="flex items-center gap-2">
                        <img
                          src={service.service?.seller?.photo}
                          className="w-5 h-5 rounded-full object-cover"
                          alt={service.service?.seller?.full_name || "Seller"}
                        />
                        <p>{service.service?.seller?.full_name || "Unknown Seller"}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="font-semibold">{service.service?.title || "Untitled Service"}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="flex items-baseline">
                        <p className="font-semibold">${service.service?.price || "N/A"}</p>
                      </span>
                      <span className="bg-gray-100 p-2 rounded-full hover:shadow transition-shadow duration-300">
                        <RiHeartFill
                          className={`w-5 h-5 cursor-pointer transition-colors duration-300 ${
                            loading ? "text-gray-400 animate-pulse" : "text-red-500 fill-red-500"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleUnsaveService(service?.id);
                          }}
                        />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mx-1 px-3 py-2 w-10 h-10 rounded-full bg-gray-200 text-gray-700 disabled:opacity-50"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 px-3 py-2 w-10 h-10 rounded-full ${
                  currentPage === page ? "bg-purple-200" : "bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="mx-1 px-3 py-2 w-10 h-10 rounded-full bg-gray-200 text-gray-700 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveItems;