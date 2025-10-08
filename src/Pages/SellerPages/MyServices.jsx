import { useState, useEffect } from "react";
import { Edit, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useSellerServices from "../../hooks/useSellerServices";
import apiClient from "../../lib/api-client";

// Modal hook for managing open/close state
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return { isOpen, openModal, closeModal };
};

// Service Row Component
const ServiceRow = ({ service, onEdit, onDelete }) => (
  <div className="grid grid-cols-12 gap-4 p-4 sm:p-5 items-center hover:bg-gray-50 transition-colors duration-300">
    {/* Service Column */}
    <div className="col-span-4 flex items-center space-x-3">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="font-medium text-gray-800 text-sm sm:text-base">
          {service.title}
        </h3>
        <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {service.location}
        </div>
      </div>
    </div>

    {/* Orders Column */}
    <div className="col-span-2 text-center">
      <span className="text-gray-800 text-sm sm:text-base">{service.orders}</span>
    </div>

    {/* Available Time Column */}
    <div className="col-span-2 text-center">
      <span className="text-gray-600 text-xs sm:text-sm">{service.time}</span>
    </div>

    {/* Price Column */}
    <div className="col-span-2 text-center">
      <span className="text-gray-800 text-sm sm:text-base">{service.price}</span>
    </div>

    {/* Action Column */}
    <div className="col-span-2 text-center">
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={() => onEdit(service)}
          className="p-2 text-purple-500 hover:bg-purple-50 rounded-full transition-colors duration-300"
        >
          <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={() => onDelete(service)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-300"
        >
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  </div>
);

ServiceRow.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    orders: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// Edit Modal Component
const EditModal = ({ isOpen, closeModal, service, onSave, onChange }) => (
  <div
    className={`fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <div
      className={`bg-white rounded-xl p-6 w-full max-w-md mx-4 transform transition-all duration-300 ease-in-out border border-gray-100 shadow-lg ${
        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          Edit Service
        </h3>
        <button
          onClick={closeModal}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {service && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Service Title
            </label>
            <input
              type="text"
              name="title"
              value={service.title}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={service.location}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Available Time
            </label>
            <input
              type="text"
              name="time"
              value={service.time}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={service.price}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={service.status}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3 mt-6">
        <button
          onClick={closeModal}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-300 text-sm"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-300 text-sm"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
);

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  service: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    location: PropTypes.string,
    time: PropTypes.string,
    price: PropTypes.string,
    status: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

// Delete Modal Component
const DeleteModal = ({ isOpen, closeModal, service, onDelete }) => (
  <div
    className={`fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <div
      className={`bg-white rounded-xl p-6 w-full max-w-md mx-4 transform transition-all duration-300 ease-in-out border border-gray-100 shadow-lg ${
        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          Delete Service
        </h3>
        <button
          onClick={closeModal}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 text-sm sm:text-base">
          Are you sure you want to delete {service?.title}? This action cannot be undone.
        </p>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={closeModal}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-300 text-sm"
        >
          Cancel
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300 text-sm"
        >
          Delete Service
        </button>
      </div>
    </div>
  </div>
);

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  service: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  onDelete: PropTypes.func.isRequired,
};

// Main Component
export default function MyServices() {
  const { service: serviceData, loading } = useSellerServices();
  const [activeTab, setActiveTab] = useState("Active");
  const [selectedService, setSelectedService] = useState(null);
  const [editedService, setEditedService] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const editModal = useModal();
  const deleteModal = useModal();

  // Map API data to component structure
  const services = Array.isArray(serviceData)
    ? serviceData.map((s) => ({
        id: s.id,
        title: s.title,
        location: s.location,
        orders: s.complete_orders || 0,
        time: `${s.time_from.slice(0, 5)}-${s.time_to.slice(0, 5)}`,
        price: `$${parseFloat(s.price).toFixed(2)}`,
        status: s.status === "Approved" ? "Active" : s.status,
        image: s.cover_photo,
      }))
    : [];

  // Filter services and compute counts
  const filteredServices = services.filter((s) => s.status === activeTab);
  const activeCount = services.filter((s) => s.status === "Active").length;
  const pendingCount = services.filter((s) => s.status === "Pending").length;
  const suspendedCount = services.filter((s) => s.status === "Suspended").length;
  const totalOrders = services.reduce((sum, s) => sum + s.orders, 0);

  // Handle edit input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedService((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save edit (placeholder for API call)
  const handleSaveEdit = () => {
    // TODO: Implement API call to update service
    console.log("Saving service:", editedService);
    editModal.closeModal();
  };

  // Handle delete with API call
  const handleDelete = async () => {
    if (!selectedService) return;
    try {
      await apiClient.delete(`/service/delete/${selectedService.id}`);
      // Optimistic update: remove service from state
      serviceData.splice(
        serviceData.findIndex((s) => s.id === selectedService.id),
        1
      );
      deleteModal.closeModal();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to delete service. Please try again."
      );
      console.error("Delete failed:", error.response?.data || error.message);
    }
  };

  // Sync editedService with selectedService
  useEffect(() => {
    if (selectedService) {
      setEditedService({ ...selectedService });
    }
  }, [selectedService]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto mt-16 md:mt-0 p-4 sm:p-6 lg:p-8 bg-gray-50">
      <main>
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            My Services
          </h1>
          <Link
            to="/create-service"
            className="px-4 py-2 bg-purple-50 text-purple-600 rounded-full hover:bg-purple-100 transition-colors duration-300 font-medium"
          >
           + Create New Service
          </Link>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
            {errorMessage}
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-6 sm:space-x-8 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("Active")}
            className={`pb-2 font-medium text-sm sm:text-base ${
              activeTab === "Active"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setActiveTab("Pending")}
            className={`pb-2 font-medium text-sm sm:text-base ${
              activeTab === "Pending"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setActiveTab("Suspended")}
            className={`pb-2 font-medium text-sm sm:text-base ${
              activeTab === "Suspended"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Suspended ({suspendedCount})
          </button>
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 sm:p-5 border-b border-gray-100 bg-gray-50 text-xs sm:text-sm font-medium text-gray-600">
            <div className="col-span-4">Service</div>
            <div className="col-span-2 text-center">Orders ({totalOrders})</div>
            <div className="col-span-2 text-center">Available Time</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Action</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <ServiceRow
                  key={service.id}
                  service={service}
                  onEdit={(s) => {
                    setSelectedService(s);
                    editModal.openModal();
                  }}
                  onDelete={(s) => {
                    setSelectedService(s);
                    deleteModal.openModal();
                  }}
                />
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 text-sm sm:text-base">
                No {activeTab.toLowerCase()} services found
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        <EditModal
          isOpen={editModal.isOpen}
          closeModal={editModal.closeModal}
          service={editedService}
          onSave={handleSaveEdit}
          onChange={handleEditChange}
        />
        <DeleteModal
          isOpen={deleteModal.isOpen}
          closeModal={deleteModal.closeModal}
          service={selectedService}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}