import { useEffect, useState } from "react";
import useUserOrder from "../../hooks/useUserOrder";
import useModal from "../../components/modal/useModal";
import Swal from "sweetalert2";
import { useLocation } from "react-router";
import { CloudHail } from "lucide-react";

export default function OrderPage() {
  const { orders, isLoading } = useUserOrder();
  const [activeTab, setActiveTab] = useState("Active");
  const location = useLocation();
  const initialTab = location.state?.activeTab;
  console.log("Initial Tab:", initialTab);
  console.log(orders, "order");

  useEffect(()=>{
    if (initialTab) {
      setActiveTab(initialTab);
    }
  },[initialTab])

  const {
    isOpen: showPaymentModal,
    openModal: openPaymentModal,
    closeModal: closePaymentModal,
  } = useModal();

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  /* ---------- FILTERS & COUNTS ---------- */
  const filteredOrders = orders?.filter((o) => o.status === activeTab) || [];
  const counts = {
    Active: orders?.filter((o) => o.status === "Active").length || 0,
    Accepted: orders?.filter((o) => o.status === "Accepted").length || 0,
    Pending: orders?.filter((o) => o.status === "Pending").length || 0,
    Completed: orders?.filter((o) => o.status === "Completed").length || 0,
    Cancelled: orders?.filter((o) => o.status === "Cancelled").length || 0,
  };

  /* ---------- HELPERS ---------- */
  const formatTime = (time) => {
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")} ${period}`;
  };

  const handlePayNow = (orderId) => {
    setSelectedOrderId(orderId);
    setSelectedPayment(null);
    openPaymentModal();
  };

  const handleContinue = async () => {
    closePaymentModal();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Payment successful!",
      toast: true,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  /* ---------- LOADING ---------- */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
        My Orders
      </h1>

      {/* Tabs – scrollable on mobile */}
      <div className="mb-6 -mx-4 overflow-x-auto whitespace-nowrap px-4 sm:mx-0 sm:overflow-visible">
        {["Active", "Accepted", "Pending", "Completed", "Cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`inline-block pb-2 mr-6 font-medium transition-colors ${
              activeTab === tab
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab} ({counts[tab]})
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-600 border-b border-gray-300">
          <div className="col-span-3">Service Info</div>
          <div className="col-span-2">Seller Info</div>
          <div className="col-span-2">Event Date & Time</div>
          <div className="col-span-2 text-center">Location</div>
          <div className="col-span-1 text-center">Amount</div>
          <div className="col-span-2 text-center">Status</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-200">
          {filteredOrders.length ? (
            filteredOrders.map((order) => (
              <DesktopRow
                key={order.id}
                order={order}
                formatTime={formatTime}
                onPay={handlePayNow}
                isPayable={activeTab === "Accepted" && !order.paid}
              />
            ))
          ) : (
            <p className="p-8 text-center text-gray-500">
              No {activeTab.toLowerCase()} orders found
            </p>
          )}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredOrders.length ? (
          filteredOrders.map((order) => (
            <MobileCard
              key={order.id}
              order={order}
              formatTime={formatTime}
              onPay={handlePayNow}
              isPayable={activeTab === "Accepted" && !order.paid}
            />
          ))
        ) : (
          <p className="py-8 text-center text-gray-500">
            No {activeTab.toLowerCase()} orders found
          </p>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              Payment Method
            </h2>
            <p className="mb-6 text-gray-500">
              Choose the type of payment you are looking for.
            </p>

            <div className="mb-8 space-y-4">
              {["Stripe", "Paypal"].map((method) => (
                <label
                  key={method}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-colors ${
                    selectedPayment === method
                      ? method === "Stripe"
                        ? "border-purple-600"
                        : "border-blue-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPayment(method)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded text-sm font-bold text-white ${
                        method === "Stripe" ? "bg-purple-600" : "bg-blue-600"
                      }`}
                    >
                      {method[0]}
                    </div>
                    <span className="font-medium text-gray-800">{method}</span>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={selectedPayment === method}
                    onChange={() => setSelectedPayment(method)}
                    className={`${
                      method === "Stripe"
                        ? "text-purple-600 focus:ring-purple-600"
                        : "text-blue-600 focus:ring-blue-600"
                    }`}
                  />
                </label>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                className="flex-1 rounded-full border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                onClick={closePaymentModal}
              >
                Cancel
              </button>
              <button
                className="flex-1 rounded-full bg-gray-800 py-3 font-medium text-white transition hover:bg-gray-900 disabled:opacity-50"
                onClick={handleContinue}
                disabled={!selectedPayment}
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

/* Desktop Row */
function DesktopRow({ order, formatTime, onPay, isPayable }) {
  return (
    <div className="grid grid-cols-12 gap-4 p-4 items-center">
      {/* Service */}
      <div className="col-span-3 flex items-center space-x-3">
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
          <img
            src={order.service.cover_photo}
            alt={order.service.title}
            className="h-full w-full object-cover"
            onError={(e) => (e.target.src = "/placeholder-image.jpg")}
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{order.service.title}</h3>
          <p className="text-xs text-gray-500">
            {order.service.category} • Order #{order.order_id}
          </p>
        </div>
      </div>

      {/* Seller */}
      <div className="col-span-2">
        <p className="text-gray-900">{order.seller.full_name}</p>
        <p className="text-xs text-gray-500">{order.seller.email_address}</p>
        <p className="text-xs text-gray-500">{order.seller.phone_number}</p>
      </div>

      {/* Date/Time */}
      <div className="col-span-2">
        <p className="text-gray-600">
          {new Date(order.event_date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
        <p className="text-xs text-gray-600">{formatTime(order.event_time)}</p>
      </div>

      {/* Location */}
      <div className="col-span-2 text-center text-gray-600">{order.location}</div>

      {/* Amount */}
      <div className="col-span-1 text-center font-medium text-gray-900">
        ${parseFloat(order.amount).toFixed(2)}
      </div>

      {/* Status + Pay */}
      <div className="col-span-2 flex items-center justify-center gap-2">
        <StatusBadge status={order.status} />
        {isPayable && (
          <button
            onClick={() => onPay(order.id)}
            className="rounded-full bg-[#c8c1f5] px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-[#b0a8e2]"
          >
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
}

/* Mobile Card */
function MobileCard({ order, formatTime, onPay, isPayable }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
      {/* Service Header */}
      <div className="mb-3 flex items-start gap-3">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
          <img
            src={order.service.cover_photo}
            alt={order.service.title}
            className="h-full w-full object-cover"
            onError={(e) => (e.target.src = "/placeholder-image.jpg")}
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{order.service.title}</h3>
          <p className="mt-0.5 text-xs text-gray-500">
            {order.service.category} • Order #{order.order_id}
          </p>
          <StatusBadge status={order.status} />
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="font-medium text-gray-700">Seller</p>
          <p className="text-gray-600">{order.seller.full_name}</p>
          <p className="text-xs text-gray-500">{order.seller.email_address}</p>
        </div>

        <div>
          <p className="font-medium text-gray-700">Event</p>
          <p className="text-gray-600">
            {new Date(order.event_date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p className="text-xs text-gray-600">{formatTime(order.event_time)}</p>
        </div>

        <div>
          <p className="font-medium text-gray-700">Location</p>
          <p className="text-gray-600">{order.location}</p>
        </div>

        <div>
          <p className="font-medium text-gray-700">Amount</p>
          <p className="font-medium text-gray-900">
            ${parseFloat(order.amount).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4">
        
        {isPayable && (
          <button
            onClick={() => onPay(order.id)}
            className="rounded-full bg-[#c8c1f5] px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-[#b0a8e2]"
          >
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
}

/* Status Badge */
function StatusBadge({ status }) {
  const base = "inline-block rounded-full px-2 py-1 text-xs font-medium";

  const styles = {
    Active: "bg-green-100 text-green-700",
    Accepted: "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Completed: "bg-gray-100 text-gray-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return <span className={`${base} ${styles[status] || ""}`}>{status}</span>;
}