import { useState } from "react";
import useUserOrder from "../../hooks/useUserOrder";
import useModal from "../../components/modal/useModal";
import apiClient from "../../lib/api-client";
import Swal from "sweetalert2";

export default function OrderPage() {
  const { orders, isLoading } = useUserOrder();
  const [activeTab, setActiveTab] = useState("Active");
  const {
    isOpen: showPaymentModal,
    openModal: openPaymentModal,
    closeModal: closePaymentModal,
  } = useModal();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Filter orders based on active tab
  const filteredOrders =
    orders?.filter((order) => order.status === activeTab) || [];
  const activeCount =
    orders?.filter((order) => order.status === "Active").length || 0;
  const acceptedCount =
    orders?.filter((order) => order.status === "Accepted").length || 0;
  const cancelledCount =
    orders?.filter((order) => order.status === "Cancelled").length || 0;
  const pendingCount =
    orders?.filter((order) => order.status === "Pending").length || 0;

  // Convert 24-hour time to 12-hour format with AM/PM
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  };

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handlePayNow = (orderId) => {
    setSelectedOrderId(orderId);
    setSelectedPayment(null); // Reset payment selection
    openPaymentModal();
  };

  const handleContinue = async () => {
    closePaymentModal();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Payment successful!",
      showConfirmButton: false,
      timer: 1500,
      toast: true,
    });

    // try {
    //   const payload = { payment_method: selectedPayment };
    //   await apiClient.post(`/user/pay-order/${selectedOrderId}`, payload);

    //   // Update the order's status and paid state locally
    //   const updatedOrders = orders.map((order) =>
    //     order.id === selectedOrderId
    //       ? { ...order, status: "Active", paid: true }
    //       : order
    //   );
    //   // Note: Since `orders` is managed by useUserOrder, we can't directly update it.
    //   // Assuming the hook will refetch or update orders, we rely on that for now.
    //   // If needed, add a refetch function in useUserOrder to refresh orders.

    //   closePaymentModal();
    //   Swal.fire({
    //     position: "top-end",
    //     icon: "success",
    //     title: "Payment successful!",
    //     showConfirmButton: false,
    //     timer: 1500,
    //     toast: true,
    //   });
    // } catch (error) {
    //   console.error("Failed to process payment:", error);
    //   Swal.fire({
    //     position: "top-end",
    //     icon: "error",
    //     title: "Failed to process payment",
    //     showConfirmButton: false,
    //     timer: 1500,
    //     toast: true,
    //   });
    // }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen container mx-auto mt-16 md:mt-0">
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 mb-6">
        <button
          onClick={() => setActiveTab("Active")}
          className={`pb-2 font-medium ${
            activeTab === "Active"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Active ({activeCount})
        </button>
        <button
          onClick={() => setActiveTab("Accepted")}
          className={`pb-2 font-medium ${
            activeTab === "Accepted"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Accepted ({acceptedCount})
        </button>
        <button
          onClick={() => setActiveTab("Pending")}
          className={`pb-2 font-medium ${
            activeTab === "Pending"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Pending ({pendingCount})
        </button>
        <button
          onClick={() => setActiveTab("Cancelled")}
          className={`pb-2 font-medium ${
            activeTab === "Cancelled"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Cancelled ({cancelledCount})
        </button>
      </div>

      {/* Order Table */}
      <div className="bg-white rounded-lg shadow">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-600">
          <div className="col-span-3">Service Info</div>
          <div className="col-span-2">Seller Info</div>
          <div className="col-span-2">Event Date & Time</div>
          <div className="col-span-2 text-center">Location</div>
          <div className="col-span-1 text-center">Amount</div>
          <div className="col-span-2 text-center">Status</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-12 gap-4 p-4 items-center"
              >
                {/* Service Info */}
                <div className="col-span-3 flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={order.service.cover_photo}
                      alt={order.service.title}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.src = "/placeholder-image.jpg")} // Fallback image
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {order.service.title}
                    </h3>
                    <div className="text-xs text-gray-500">
                      <p>Category: {order.service.category}</p>
                      <p>Order ID: {order.order_id}</p>
                    </div>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="col-span-2">
                  <p className="text-gray-900">{order.seller.full_name}</p>
                  <p className="text-xs text-gray-500">
                    {order.seller.email_address}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.seller.phone_number}
                  </p>
                </div>

                {/* Event Date & Time */}
                <div className="col-span-2">
                  <p className="text-gray-600">
                    {new Date(order.event_date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-gray-600">
                    {formatTime(order.event_time)}
                  </p>
                </div>

                {/* Location */}
                <div className="col-span-2 text-center">
                  <span className="text-gray-600">{order.location}</span>
                </div>

                {/* Amount */}
                <div className="col-span-1 text-center">
                  <div className="text-gray-900 font-medium">
                    ${parseFloat(order.amount).toFixed(2)}
                  </div>
                </div>

                {/* Status and Pay Now */}
                <div className="col-span-2 flex justify-center items-center gap-2">
                  <span
                    className={`px-3 py-2 text-sm font-medium  rounded-full ${
                      order.status === "Active"
                        ? "bg-green-500 text-white"
                        : order.status === "Accepted"
                        ? "text-green-500"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-500"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                  {activeTab === "Accepted" && !order.paid && (
                    <button
                      onClick={() => handlePayNow(order.id)}
                      className="px-3 py-2 bg-[#c8c1f5] text-gray-600 font-medium rounded-full hover:bg-[#b0a8e2] transition duration-200"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              No {activeTab.toLowerCase()} orders found
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Method
            </h2>
            <p className="text-gray-500 mb-6">
              Choose the type of payment you are looking for.
            </p>

            <div className="space-y-4 mb-8">
              <div
                className={`flex items-center justify-between p-4 border rounded-2xl hover:border-gray-300 cursor-pointer ${
                  selectedPayment === "Stripe"
                    ? "border-purple-600"
                    : "border-gray-200"
                }`}
                onClick={() => handlePaymentSelect("Stripe")}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <span className="font-medium text-gray-800">Stripe</span>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === "Stripe"}
                  onChange={() => handlePaymentSelect("Stripe")}
                  className="text-purple-600 focus:ring-purple-600"
                />
              </div>

              <div
                className={`flex items-center justify-between p-4 border rounded-2xl hover:border-gray-300 cursor-pointer ${
                  selectedPayment === "Paypal"
                    ? "border-blue-600"
                    : "border-gray-200"
                }`}
                onClick={() => handlePaymentSelect("Paypal")}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">P</span>
                  </div>
                  <span className="font-medium text-gray-800">Paypal</span>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === "Paypal"}
                  onChange={() => handlePaymentSelect("Paypal")}
                  className="text-blue-600 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                className="flex-1 py-3 px-6 border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition duration-200"
                onClick={closePaymentModal}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-3 px-6 bg-gray-800 hover:bg-gray-900 text-white rounded-full font-medium transition duration-200"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
