import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Play, Heart } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MobileAppSection from "../HomePage/MobileAppSection/MobileAppSection";
import ServicesPackages from "../HomePage/ServicesPackages/ServicesPackages";
import event from "../../assets/videos/event.mp4";
import apiClient from "../../lib/api-client";
import Swal from "sweetalert2";
import useSavedList from "../../hooks/useSavedList";

const ServiceDetailPage = () => {
  const { id } = useParams(); // Get the service ID from the URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingDate, setBookingDate] = useState(new Date("2025-09-05"));
  const [bookingTime, setBookingTime] = useState(new Date("2025-09-05T09:00"));
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const { savedServices, saveService, loading: saveLoading, error: saveError } = useSavedList();

  // Fetch service details when component mounts
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/site/service/details/${id}`);
        setService(response.data); // Set the API response data
        console.log(response.data, "service details-------------------");
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch service details");
        setLoading(false);
      }
    };
    fetchServiceDetails();
  }, [id]);

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

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-screen">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error) return <div>{error}</div>;
  if (!service) return <div>No service found</div>;

  console.log(service, "service details");

  return (
    <div className="min-h-screen">
      <div className="container mx-auto mt-16 md:mt-0">
        <div className="px-4 py-8">
          {saveError && (
            <div className="text-red-500 text-center mb-4">{saveError}</div>
          )}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {service.title}
            </h1>
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600"
                onClick={() => handleSaveService(service.id)}
              >
                <Heart
                  className={`w-4 h-4 cursor-pointer transition-colors duration-300 ${
                    saveLoading
                      ? "text-gray-400 animate-pulse"
                      : isServiceSaved(service.id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-400 hover:text-red-500"
                  }`}
                />
                <span className="text-sm">Save</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-96">
              <div className="lg:col-span-2 rounded-xl overflow-hidden relative group cursor-pointer">
                {!isPlaying && (
                  <img
                    src={
                      service.cover_photo ||
                      "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    }
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <video
                  ref={videoRef}
                  className={`w-full h-full object-cover ${
                    !isPlaying ? "hidden" : ""
                  }`}
                  controls={isPlaying}
                >
                  <source
                    src={service.overview_video || event}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                {!isPlaying && (
                  <>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
                      <button
                        onClick={handlePlayClick}
                        className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                      >
                        <Play
                          className="w-6 h-6 text-purple-600 ml-1"
                          fill="currentColor"
                        />
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="grid grid-cols-2 gap-4">
                  {service.portfolio_photos?.slice(0, 2).map((photo, index) => (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden group cursor-pointer"
                    >
                      <img
                        src={
                          photo.image ||
                          "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        }
                        alt={`${service.title} ${index + 1}`}
                        className="w-full object-cover rounded-lg h-20 sm:h-44"
                      />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {service.portfolio_photos?.slice(2, 4).map((photo, index) => (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden group cursor-pointer"
                    >
                      <img
                        src={
                          photo.image ||
                          "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        }
                        alt={`${service.title} ${index + 1}`}
                        className="w-full object-cover rounded-lg h-20 sm:h-44"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-7">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {service.reviews?.length > 0 && (
                <>
                  <div className="divider"></div>
                  <h2 className="text-xl font-semibold my-6">Reviews</h2>
                  <div className="space-y-6">
                    {service.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg p-6 border border-gray-200"
                      >
                        <div className="space-y-6">
                          <div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <img
                                  src={
                                    review.user.photo ||
                                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                                  }
                                  alt={review.user.full_name}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                  <h4 className="font-medium text-gray-900">
                                    {review.user.full_name}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    {service.location}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">
                                  {review.rating}
                                </span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-600 mb-3">
                                {review.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <img
                    src={
                      service.seller?.photo ||
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                    }
                    alt={service.seller?.full_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <Link
                      to={`/seller-profile/${service.seller?.id}`}
                      className="font-medium text-gray-900"
                    >
                      {service.seller?.full_name}
                    </Link>
                    <p className="text-sm text-gray-500">
                      Available {service.time_from} - {service.time_to}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">
                      {service.average_rating}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-2xl font-bold text-gray-900">
                    ${service.price}
                  </span>
                  <span className="text-sm text-gray-500">/hr</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booking Date
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Select Date
                        </label>
                        <DatePicker
                          selected={bookingDate}
                          onChange={(date) => setBookingDate(date)}
                          dateFormat="MM/dd/yyyy"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8C1F5] text-sm"
                          placeholderText="Select a date"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Select Time
                        </label>
                        <DatePicker
                          selected={bookingTime}
                          onChange={(time) => setBookingTime(time)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8C1F5] text-sm"
                          placeholderText="Select a time"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <p className="text-sm text-gray-600">{service.location}</p>
                  </div>
                  <div className="w-full">
                    <Link
                      to="/order-preview"
                      className="block w-full bg-[#C8C1F5] hover:shadow-md hover:bg-[#b0a6f3] duration-500 text-white py-3 rounded-lg font-medium transition-colors text-center"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-10">
          <ServicesPackages />
        </div>
      </div>

      <MobileAppSection />
    </div>
  );
};

export default ServiceDetailPage;