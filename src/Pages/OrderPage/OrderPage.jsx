import { useState } from "react";
import useUserOrder from "../../hooks/useUserOrder";

export default function OrderPage() {
  const { orders, isLoading } = useUserOrder();
  const [activeTab, setActiveTab] = useState("Active");

  // Filter orders based on active tab
  const filteredOrders = orders?.filter((order) => order.status === activeTab) || [];
  const activeCount = orders?.filter((order) => order.status === "Active").length || 0;
  const pendingCount = orders?.filter((order) => order.status === "Pending").length || 0;

  // Convert 24-hour time to 12-hour format with AM/PM
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen container mx-auto   mt-16 md:mt-0">
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
          onClick={() => setActiveTab("Pending")}
          className={`pb-2 font-medium ${
            activeTab === "Pending"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Pending ({pendingCount})
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
              <div key={order.id} className="grid grid-cols-12 gap-4 p-4 items-center">
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
                    <h3 className="font-medium text-gray-900">{order.service.title}</h3>
                    <div className="text-xs text-gray-500">
                      <p>Category: {order.service.category}</p>
                      <p>Order ID: {order.order_id}</p>
                    </div>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="col-span-2">
                  <p className="text-gray-900">{order.seller.full_name}</p>
                  <p className="text-xs text-gray-500">{order.seller.email_address}</p>
                  <p className="text-xs text-gray-500">{order.seller.phone_number}</p>
                </div>

                {/* Event Date & Time */}
                <div className="col-span-2">
                  <p className="text-gray-600">
                    {new Date(order.event_date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-gray-600">{formatTime(order.event_time)}</p>
                </div>

                {/* Location */}
                <div className="col-span-2 text-center">
                  <span className="text-gray-600">{order.location}</span>
                </div>

                {/* Amount */}
                <div className="col-span-1 text-center">
                  <div className="text-gray-900 font-medium">${parseFloat(order.amount).toFixed(2)}</div>
                </div>

                {/* Status */}
                <div className="col-span-2 flex justify-center">
                  <span
                    className={`px-2 py-1 text-sm font-medium text-white rounded-full ${
                      order.status === "Active" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  >
                    {order.status}
                  </span>
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
    </div>
  );
}