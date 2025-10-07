import {
  Package,
  DollarSign,
  TrendingUp,
  Briefcase,
  Wallet,
  Eye,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import useSellerAnalytics from "../../hooks/useSellerAnalytics";
import service_box from "../../assets/images/service_box.svg";

export default function SellerOverview() {
  const { analytics, loading } = useSellerAnalytics();
  console.log(analytics, "analytics");

  const EmptyStateIllustration = () => (
    <div className="flex justify-center items-center">
      <img
        src={service_box}
        alt="No items"
        className="w-32 h-32 mx-auto mb-4"
      />
    </div>
  );

  const activeOrders = analytics?.service_and_active_orders;

  const services = analytics?.service_list;

  const stats = {
    totalBookings: analytics?.total_bookings || 0,
    income: analytics?.this_month_income || 0,
    totalSales: analytics?.total_income || 0,
    totalServices: analytics?.total_services || 0,
    totalBalance: analytics?.this_month_income || 0, // Assuming totalBalance maps to this_month_income
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto mt-16 md:mt-0 p-4 sm:p-6 lg:p-8">
      <div>
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                Hey {analytics?.full_name || "Seller"} 👋
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Welcome back to your dashboard!
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src={
                    analytics?.photo ||
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={analytics?.full_name || "Seller"}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                {analytics?.full_name || "Seller"}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mb-4">
                {analytics?.email_address || "Not set"}
              </p>
              <Link
                to={`/seller-profile/${analytics.user_id}`}
                className="w-full py-2 sm:py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition inline-block"
              >
                View profile
              </Link>
            </div>

            {/* Active Orders */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  Active Orders
                </h3>
                <Link
                  to="/manage-orders"
                  className="text-purple-600 text-xs sm:text-sm hover:text-purple-800"
                >
                  See All
                </Link>
              </div>

              {activeOrders.length > 0 ? (
                <div className="space-y-4">
                  {activeOrders.map((order, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={
                            order.cover_photo ||
                            "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"
                          }
                          alt={order.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 text-sm font-medium truncate">
                          {order.title || "Untitled Order"}
                        </p>
                        <p className="text-gray-500 text-xs">Total order number: {order?.total_orders}</p>
                      </div>
                      <div
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0`}
                      >
                        <span className="text-white text-[10px] sm:text-xs font-bold">
                          {order.total_orders}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <EmptyStateIllustration />
                  <p className="text-gray-500 text-sm mt-4">
                    No active orders yet
                  </p>
                </div>
              )}

              <Link
                to="/manage-orders"
                className="w-full mt-6 py-2 sm:py-3 border border-purple-300 text-purple-600 rounded-full hover:bg-purple-50 transition flex items-center justify-center space-x-2 text-sm"
              >
                <Eye className="w-4 h-4" />
                <span>Manage Orders</span>
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <StatCard
                icon={<Package className="w-5 h-5 text-gray-400" />}
                label="Total Bookings"
                value={stats.totalBookings.toLocaleString()}
              />
              <StatCard
                icon={<DollarSign className="w-5 h-5 text-gray-400" />}
                label="This Month's Income"
                value={`$${stats.income.toFixed(2)} USD`}
              />
              <StatCard
                icon={<TrendingUp className="w-5 h-5 text-gray-400" />}
                label="Total Sales"
                value={`$${stats.totalSales.toFixed(2)} USD`}
              />
              <StatCard
                icon={<Briefcase className="w-5 h-5 text-gray-400" />}
                label="Total Services"
                value={stats.totalServices.toLocaleString()}
              />
            </div>

            {/* Balance */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Wallet className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 text-sm">Total Balance</span>
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold text-purple-600">
                    ${stats?.totalBalance?.toFixed(2)} USD
                  </p>
                </div>
                <Link
                  to="/withdraw"
                  className="px-4 sm:px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm"
                >
                  Balance withdraw
                </Link>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  {analytics?.full_name
                    ? `${analytics?.full_name}'s Services`
                    : "Your Services"}
                </h3>
                <Link
                  to="/my-services"
                  className="text-purple-600 text-xs sm:text-sm hover:text-purple-800"
                >
                  See All
                </Link>
              </div>

              {services.length > 0 ? (
                <div className="space-y-4">
                  {services.slice(0, 3).map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden">
                          <img
                            src={
                              service?.cover_photo ||
                              "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80"
                            }
                            alt={service?.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                            {service?.title || "Untitled Service"}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {service?.category?.title || "Uncategorized"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800 text-sm sm:text-base">
                          ${service.price || 0}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <EmptyStateIllustration />
                  <p className="text-gray-500 text-sm mt-4">
                    You don&apos;t have any service yet
                  </p>
                  <Link
                    to="/create-service"
                    className="mt-1 px-4 py-2 text-purple-600 transition flex items-center justify-center space-x-2 mx-auto text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create service</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small reusable card for stats */
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <div className="flex items-center space-x-2 mb-3">
      {icon}
      <span className="text-gray-600 text-sm">{label}</span>
    </div>
    <p className="text-2xl sm:text-3xl font-bold text-gray-800">{value}</p>
  </div>
);
