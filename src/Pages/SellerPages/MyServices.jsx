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
  <div className="sm:grid sm:grid-cols-12 sm:gap-2 sm:p-3 sm:items-center sm:hover:bg-gray-50 sm:transition-colors sm:duration-300 flex flex-col bg-white rounded-xl shadow-md border border-gray-100 p-4 m-3 sm:m-0 sm:shadow-none sm:border-0 sm:bg-transparent transition-all duration-200">
    {/* Service Info (Image, Title, Location) */}
    <div className="sm:col-span-4 flex items-start space-x-3 sm:items-center">
      <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-800 text-sm sm:text-base line-clamp-3">
          {service.title}
        </h3>
        <div className="flex items-center text-gray-500 mt-1.5">
          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs sm:text-sm line-clamp-1">{service.location}</span>
        </div>
      </div>
    </div>

    {/* Orders */}
    <div className="sm:col-span-2 mt-4 sm:mt-0 sm:text-center">
      <span className="text-gray-600 text-xs sm:text-sm md:hidden flex font-semibold">Orders</span>
      <div className="text-gray-600 text-xs sm:text-sm">{service.orders}</div>
    </div>

    {/* Available Time */}
    <div className="sm:col-span-2 mt-4 sm:mt-0 sm:text-center">
      <span className="text-gray-600 text-xs sm:text-sm md:hidden flex font-semibold">Available Time</span>
      <div className="text-gray-600 text-xs sm:text-sm">{service.time}</div>
    </div>

    {/* Price */}
    <div className="sm:col-span-2 mt-4 sm:mt-0 sm:text-center">
      <span className="text-gray-600 text-xs sm:text-sm md:hidden flex font-semibold">Price</span>
      <div className="text-gray-600 text-xs sm:text-sm">{service.price}</div>
    </div>

    {/* Actions */}
    <div className="sm:col-span-2 mt-4 sm:mt-0 sm:text-center">
      <div className="flex items-center justify-start sm:justify-center space-x-3">
        <button
          onClick={() => onEdit(service)}
          className="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors duration-300 cursor-pointer"
        >
          <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={() => onDelete(service)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-300 cursor-pointer"
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
    className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <div
      className={`bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-2 transform transition-all duration-300 ease-in-out border border-gray-100 shadow-lg ${
        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Edit Service</h3>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
            <input
              type="text"
              name="title"
              value={service.title}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-600 focus:border-purple-600 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={service.location}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-600 focus:border-purple-600 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Available Time</label>
            <input
              type="text"
              name="time"
              value={service.time}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-600 focus:border-purple-600 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="text"
              name="price"
              value={service.price}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-600 focus:border-purple-600 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={service.status}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-600 focus:border-purple-600 text-sm"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2 mt-6">
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
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
    className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <div
      className={`bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-2 transform transition-all duration-300 ease-in-out border border-gray-100 shadow-lg ${
        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Delete Service</h3>
        <button
          onClick={closeModal}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Are you sure you want to delete {service?.title}? This action cannot be undone.
        </p>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
        >
          Cancel
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
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
        image: s.cover_photo || "https://via.placeholder.com/150",
      }))
    : [];

  // Filter services and compute counts
  const filteredServices = services.filter((s) => s.status === activeTab);
  const activeCount = services.filter((s) => s.status === "Active").length;
  const pendingCount = services.filter((s) => s.status === "Pending").length;
  const suspendedCount = services.filter((s) => s.status === "Suspended").length;
  const totalOrders = services.reduce((sum, s) => sum + s.orders, 0);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle edit input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedService((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save edit with API call
  const handleSaveEdit = async () => {
    if (!editedService) return;
    try {
      await apiClient.patch(`/service/update/${editedService.id}`, {
        title: editedService.title,
        location: editedService.location,
        time_from: editedService.time.split("-")[0],
        time_to: editedService.time.split("-")[1],
        price: parseFloat(editedService.price.replace("$", "")),
        status: editedService.status,
      });
      editModal.closeModal();
      setErrorMessage("");
      // Optionally, refresh services or update local state
      alert("Service updated successfully!");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to update service. Please try again."
      );
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  // Handle delete with API call
  const handleDelete = async () => {
    if (!selectedService) return;
    try {
      await apiClient.delete(`/service/delete/${selectedService.id}`);
      deleteModal.closeModal();
      setErrorMessage("");
      // Optionally, refresh services or update local state
      alert("Service deleted successfully!");
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
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 sm:px-6 py-4 sm:py-8 mt-16 md:mt-0">
      <main>
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6 gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">My Services</h1>
          <Link
            to="/create-service"
            className="px-3 py-1.5 bg-purple-50 text-purple-600 rounded-md hover:bg-purple-100 transition-colors duration-300 text-xs sm:text-sm font-medium"
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
        <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 border-b border-gray-200">
          {[
            { label: `Active (${activeCount})`, value: "Active" },
            { label: `Pending (${pendingCount})`, value: "Pending" },
            { label: `Suspended (${suspendedCount})`, value: "Suspended" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                setActiveTab(tab.value);
                setCurrentPage(1);
              }}
              className={`pb-2 font-medium text-xs sm:text-sm ${
                activeTab === tab.value
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-lg shadow-md sm:bg-transparent sm:shadow-none sm:border-0">
          {/* Table Header */}
          <div className="hidden sm:grid sm:grid-cols-12 sm:gap-2 sm:p-3 sm:border-b sm:border-gray-100 sm:bg-gray-50 sm:text-sm sm:font-semibold sm:text-gray-600">
            <div className="sm:col-span-4">Service</div>
            <div className="sm:col-span-2 sm:text-center">Orders ({totalOrders})</div>
            <div className="sm:col-span-2 sm:text-center">Available Time</div>
            <div className="sm:col-span-2 sm:text-center">Price</div>
            <div className="sm:col-span-2 sm:text-center">Action</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100 sm:divide-y-0">
            {currentServices.length > 0 ? (
              currentServices.map((service) => (
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
              <div className="p-6 text-center text-gray-500 text-sm">
                No {activeTab.toLowerCase()} services found
              </div>
            )}
          </div>
        </div>

        {/* Pagination (only shown if filteredServices.length > 10) */}
        {filteredServices.length > 10 && (
          <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 h-9 w-9 sm:px-3 sm:py-2 rounded-full bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-purple-100 transition-colors duration-200 text-xs sm:text-sm"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-2 py-1 h-9 w-9 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 ${
                  currentPage === page
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-purple-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 h-9 w-9 sm:px-3 sm:py-2 rounded-full bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-purple-100 transition-colors duration-200 text-xs sm:text-sm"
            >
              &gt;
            </button>
          </div>
        )}

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