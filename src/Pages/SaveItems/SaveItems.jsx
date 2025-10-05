import { Link } from "react-router-dom";
import { RiHeartFill, RiStarFill } from "react-icons/ri";
import { useState } from "react";
import useSavedList from "../../hooks/useSavedList";

const SaveItems = () => {
  
  const { savedServices, loading } = useSavedList();
  console.log(savedServices , "savedServices");


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = savedServices.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(savedServices.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center min-h-screen items-center h-40">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="py-7 px-4 container mx-auto mt-30 md:mt-15">
      <div className="py-5 flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl font-bold text-left">
          Saved Items
        </h1>
      </div>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((service) => (
            <Link
              to={`/serviceDetails/${service.service?.id}`}
              key={service.id}
              className="relative border border-gray-200 rounded-xl hover:shadow-2xl transform duration-500 p-3"
            >
              <div className="absolute top-3 left-3 bg-white/40 text-black text-sm font-semibold px-3 py-2 rounded-br-xl flex items-center gap-1">
                <RiStarFill className="inline text-yellow-400" />{" "}
                {service.average_rating}
              </div>
              <img
                src={service.service?.cover_photo}
                alt={service.service?.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="flex items-center justify-between mt-2 border-b pb-2 border-gray-200">
                <div className="flex items-center gap-2">
                  <img
                    src={service?.service?.seller?.photo}
                    className="w-5 h-5 rounded-full object-cover"
                    alt=""
                  />
                  <p>{service?.service?.seller?.full_name}</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="font-semibold">{service.service?.title}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="flex items-baseline">
                  <p className="font-semibold">${service.service?.price}</p>
                  <span className="text-gray-400 text-xs font-light">/hr</span>
                </span>
                <span className="bg-gray-100 p-2 rounded-full hover:shadow transition-shadow duration-300">
                  <RiHeartFill className="w-5 h-5 text-red-500 cursor-pointer transition-colors duration-300" />
                </span>
              </div>
            </Link>
          ))}
        </div>

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
              className={`mx-1 px-3 py-2 w-10 h-10 rounded-full ${currentPage === page ? "bg-purple-200" : "bg-gray-200 text-gray-700"}`}
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
      </div>
    </div>
  );
};

export default SaveItems;