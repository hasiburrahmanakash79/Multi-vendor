import { Link } from "react-router-dom";
import { RiStarFill } from "react-icons/ri";
import { Heart } from "lucide-react";
import useServicesList from "../../../hooks/useServicesList";
import useSavedList from "../../../hooks/useSavedList";
import Swal from "sweetalert2";

const ServicesPackages = () => {
  const { services, loading: servicesLoading } = useServicesList([]);
  const { savedServices, saveService, loading: saveLoading, error: saveError } = useSavedList();
  const displayedServices = services.slice(-8);

  if (servicesLoading) {
      return (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }
  
    // Check if a service is saved by comparing service.id with saved.service.id
    const isServiceSaved = (serviceId) => {
      return savedServices.some((saved) => saved.service.id === serviceId);
    };
  
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
  
    return (
      <div className="py-7 px-4 container mx-auto">
        {saveError && (
          <div className="text-red-500 text-center mb-4">{saveError}</div>
        )}
        <div className="py-5 flex justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-bold text-left text-gray-800">
            Popular Services
          </h1>
          <Link
            to="/services"
            className="text-[#1E40AF] underline text-base font-medium hover:text-[#1E3A8A] transition-colors duration-300"
          >
            See All
          </Link>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedServices.map((service) => (
              <Link
                to={`/serviceDetails/${service.id}`}
                key={service.id}
                className="relative border border-gray-200 rounded-xl p-3 bg-white shadow-md hover:shadow-2xl transform transition-all duration-300 ease-in-out"
              >
                <div className="absolute top-3 left-3 bg-white/40 backdrop-blur-2xl text-black text-sm font-semibold px-3 py-2 rounded-br-xl flex items-center gap-1 transition-all duration-300">
                  <RiStarFill className="text-yellow-500" />{" "}
                  {service.average_rating}
                </div>
                <img
                  src={service.cover_photo}
                  alt={service?.title}
                  className="w-full h-48 object-cover rounded-lg"
                  crossOrigin="anonymous"
                />
                <div className="flex items-center justify-between mt-2 border-b pb-2 border-gray-200">
                  <div className="flex items-center gap-2">
                    <img
                      src={service?.seller?.photo}
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
                      ${service.price}
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
        </div>
      </div>
    );
  };

export default ServicesPackages;