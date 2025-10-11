import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Edit,
  X,
  Calendar,
  MapPin,
  Mail,
  User,
  DollarSign,
  Clock,
} from "lucide-react";
import useSellerOrderList from "../../hooks/userSellerOrderList";
import apiClient from "../../lib/api-client";
import Swal from "sweetalert2";

const ManageOrder = () => {
  const { orders, refetch } = useSellerOrderList();
  const [activeTab, setActiveTab] = useState("Active");
  const [currentPage, setCurrentPage] = useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const itemsPerPage = 5;

  // Map the API response to match the structure expected by the component
  const formattedOrders = orders.map((order) => ({
    id: order.id,
    bannerImage: order.service.cover_photo || "https://via.placeholder.com/150",
    service: order.service.title,
    location: order.location,
    order_id: order.order_id,
    client: order.user.full_name,
    email: order.user.email_address,
    avatar:
      order.user.photo ||
      `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70) + 1}`,
    deadline: order.event_time,
    price: `$${parseFloat(order.amount).toFixed(2)}`,
    status: order.status,
  }));

  // Filter orders based on status
  const filteredOrders =
    activeTab === "All Orders"
      ? formattedOrders
      : formattedOrders.filter((order) => order.status === activeTab);

  // Calculate counts for each status
  const activeCount = formattedOrders.filter(
    (order) => order.status === "Active"
  ).length;
  const pendingCount = formattedOrders.filter(
    (order) => order.status === "Pending"
  ).length;
  const acceptedCount = formattedOrders.filter(
    (order) => order.status === "Accepted"
  ).length;
  const completedCount = formattedOrders.filter(
    (order) => order.status === "Completed"
  ).length;
  const cancelledCount = formattedOrders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Status color logic
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Active":
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Accepted":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColorForModal = (status) => {
    const colors = {
      Active: "bg-blue-100 text-blue-700 border-blue-200",
      Completed: "bg-green-100 text-green-700 border-green-200",
      Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      Cancelled: "bg-red-100 text-red-700 border-red-200",
      Accepted: "bg-purple-100 text-purple-700 border-purple-200",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  // Open edit modal
  const openEditModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setEditModalOpen(true);
  };

  // Open details modal
  const openDetailsModal = (order) => {
    setSelectedOrder(order);
    setDetailsModalOpen(true);
  };

  // Update status via API
  const handleStatusUpdate = async () => {
    if (!newStatus || newStatus === selectedOrder.status) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please select a different status",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
      return;
    }

    try {
      await apiClient.patch(`/seller/order/update-status/${selectedOrder.id}`, {
        status: newStatus,
      });
      setEditModalOpen(false);
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Status updated successfully!",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to update status. Please try again.",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
    }
  };

  // Determine allowed status options based on current status
  const getAllowedStatuses = (currentStatus) => {
    if (currentStatus === "Pending") {
      return ["Accepted", "Cancelled"];
    } else if (currentStatus === "Accepted") {
      return ["Pending", "Cancelled"];
    } else if (currentStatus === "Active") {
      return ["Completed"];
    }
    return [];
  };

  return (
    <div className="p-4 container mx-auto mt-16 md:mt-0 min-h-screen">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
        Manage Orders
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 border-b border-gray-200">
        {[
          { label: `All Orders`, value: "All Orders" },
          { label: `Active (${activeCount})`, value: "Active" },
          { label: `Pending (${pendingCount})`, value: "Pending" },
          { label: `Accepted (${acceptedCount})`, value: "Accepted" },
          { label: `Completed (${completedCount})`, value: "Completed" },
          { label: `Cancelled (${cancelledCount})`, value: "Cancelled" },
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

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr className="text-gray-600 font-semibold">
              <th className="px-4 py-3 sm:px-6 sm:py-4">Service</th>
              <th className="px-4 py-3 sm:px-6 sm:py-4">Client</th>
              <th className="px-4 py-3 sm:px-6 sm:py-4">Deadline</th>
              <th className="px-4 py-3 sm:px-6 sm:py-4">Price</th>
              <th className="px-4 py-3 sm:px-6 sm:py-4">Status</th>
              <th className="px-4 py-3 sm:px-6 sm:py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-6 sm:px-6 text-center text-gray-500 text-sm"
                >
                  No orders found for the selected filter.
                </td>
              </tr>
            ) : (
              currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => openDetailsModal(order)}
                >
                  <td className="px-4 py-3 sm:px-6 sm:py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={order.bannerImage}
                        alt={order.service}
                        className="w-16 h-12 sm:w-20 sm:h-14 object-cover rounded-lg hidden sm:block"
                        onError={(e) =>
                          (e.target.src = "https://via.placeholder.com/150")
                        }
                      />
                      <div>
                        <Link
                          to={`/timeline/${order.id}`}
                          className="text-purple-600 font-medium hover:underline text-sm sm:text-base"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {order.service}
                        </Link>
                        <p className="text-gray-500 text-xs sm:text-sm truncate max-w-[150px] sm:max-w-[200px]">
                          {order.location}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Order ID: {order.order_id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={order.avatar}
                        alt={order.client}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                        onError={(e) =>
                          (e.target.src = "https://i.pravatar.cc/40")
                        }
                      />
                      <div>
                        <p className="text-gray-700 text-sm truncate max-w-[100px] sm:max-w-[150px]">
                          {order.client}
                        </p>
                        <p className="text-gray-500 text-xs">{order.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">
                    {order.deadline}
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">
                    {order.price}
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4">
                    {order.status === "Completed" ? (
                      <span className="text-green-600 text-xs sm:text-sm">
                        Order has been completed
                      </span>
                    ) : order.status === "Cancelled" ? (
                      <span className="text-red-600 text-xs sm:text-sm">
                        Order has been cancelled
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(order);
                        }}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        <Edit size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg sm:text-xl font-bold mb-4">
              Edit Order Status
            </h3>
            <div className="space-y-4">
              <div>
                <img
                  src={selectedOrder.bannerImage}
                  alt={selectedOrder.service}
                  className="w-full h-40 object-cover rounded-lg"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/150")
                  }
                />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Order ID:</span>{" "}
                  {selectedOrder.order_id}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Event Name:</span>{" "}
                  {selectedOrder.service}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Client Name:</span>{" "}
                  {selectedOrder.client}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span>{" "}
                  {selectedOrder.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="mt-1 block w-full rounded-md p-2 border border-gray-200 outline-none text-sm"
                >
                  <option value={selectedOrder.status} disabled>
                    {selectedOrder.status} (Current)
                  </option>
                  {getAllowedStatuses(selectedOrder.status).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal - MODERN DESIGN */}
      {detailsModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
            {/* Header with Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={selectedOrder.bannerImage}
                alt={selectedOrder.service}
                className="w-full h-full object-cover"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/800x300")
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button
                onClick={() => setDetailsModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-lg"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
              <div className="absolute bottom-4 left-6">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {selectedOrder.service}
                </h3>
                <p className="text-white/90 text-sm font-medium">
                  Order ID: {selectedOrder.order_id}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Status Badge */}
              <div className="mb-6">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColorForModal(
                    selectedOrder.status
                  )}`}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  {selectedOrder.status}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Client Name */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                      Client Name
                    </p>
                    <p className="text-gray-900 font-medium">
                      {selectedOrder.client}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                      Email
                    </p>
                    <p className="text-gray-900 font-medium break-all">
                      {selectedOrder.email}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                      Location
                    </p>
                    <p className="text-gray-900 font-medium">
                      {selectedOrder.location}
                    </p>
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                      Deadline
                    </p>
                    <p className="text-gray-900 font-medium">
                      {selectedOrder.deadline}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                      Price
                    </p>
                    <p className="text-gray-900 font-bold text-lg">
                      {selectedOrder.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setDetailsModalOpen(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Close
                </button>
                <Link
                  to={`/timeline/${selectedOrder.id}`}
                  className="flex-1 px-6 py-3 bg-[#c8c1f5] text-black rounded-lg transition-all font-medium shadow-lg shadow-purple-300/30 text-center"
                >
                  View Timeline
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination (only shown if filteredOrders.length > 10) */}
      {filteredOrders.length > 10 && (
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
    </div>
  );
};

export default ManageOrder;
