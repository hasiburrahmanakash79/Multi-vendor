// import { useEffect, useRef, useState } from "react";
// import {
//   Search,
//   Bell,
//   MessageCircleMore,
//   User,
//   Menu,
//   X,
//   Heart,
//   ShoppingCart,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo/logo.png";
// import useMe from "../../hooks/useMe";
// import { removeAuthTokens } from "../../lib/cookie-utils";

// const Navbar = () => {
//   const { user, loading, error } = useMe();
//   console.log(user);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//   const notificationRef = useRef(null);
//   const userDropdownRef = useRef(null);
//   const navigate = useNavigate();

//   const notifications = [
//     {
//       id: 1,
//       type: "Wedding Photography",
//       location: "Overland Park, KS",
//       fullLocation: "Overland Park, KS",
//       time: "5m",
//       avatar: "WP",
//       isOnline: true,
//     },
//     {
//       id: 2,
//       type: "Wedding Photography",
//       location: "Overland Park, KS",
//       fullLocation: "Overland Park, KS",
//       time: "5m",
//       avatar: "WP",
//       isOnline: true,
//     },
//     {
//       id: 3,
//       type: "Wedding Photography",
//       location: "Overland Park, KS",
//       fullLocation: "Overland Park, KS",
//       time: "5m",
//       avatar: "WP",
//       isOnline: true,
//     },
//     {
//       id: 4,
//       type: "Wedding Photography",
//       location: "Overland Park, KS",
//       fullLocation: "Overland Park, KS",
//       time: "5m",
//       avatar: "WP",
//       isOnline: true,
//     },
//     {
//       id: 5,
//       type: "Wedding Photography",
//       location: "Overland Park, KS",
//       fullLocation: "Overland Park, KS",
//       time: "5m",
//       avatar: "WP",
//       isOnline: true,
//     },
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (notificationRef.current && !notificationRef.current.contains(event.target)) {
//         setIsNotificationOpen(false);
//       }
//       if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
//         setIsUserDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const closeMobileMenu = () => setIsMenuOpen(false);

//   const handleLogout = () => {
//     removeAuthTokens();
//     localStorage.removeItem("userRole");
//     setIsUserDropdownOpen(false);
//     navigate("/signin");
//   };

//   return (
//     <>
//       <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16 sm:h-20">
//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <Link to={user?.role === "Seller" ? "/seller-overview" : "/"}>
//                 <img src={logo} alt="Logo" className="h-8 sm:h-10 w-auto" />
//               </Link>
//             </div>

//             {/* Search Bar (Desktop) */}
//             <div className="hidden md:flex flex-1 max-w-xs sm:max-w-md lg:max-w-lg mx-4 sm:mx-6">
//               <div className="relative w-full">
//                 <input
//                   type="text"
//                   placeholder="Search for services or categories..."
//                   className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm"
//                   aria-label="Search for services or categories"
//                 />
//                 <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
//               </div>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
//               {user && !loading && !error ? (
//                 <>
//                   {(user.role === "Buyer" || user.role === "Seller") && (
//                     <>
//                       {/* Notifications */}
//                       <div className="relative" ref={notificationRef}>
//                         <button
//                           onClick={() => setIsNotificationOpen(!isNotificationOpen)}
//                           className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
//                           aria-label="Notifications"
//                         >
//                           <Bell className="w-5 h-5" />
//                           {notifications.length > 0 && (
//                             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                               {notifications.length}
//                             </span>
//                           )}
//                         </button>
//                         {isNotificationOpen && (
//                           <div className="absolute right-0 mt-2 w-72 sm:w-80 max-h-96 overflow-y-auto bg-white rounded-lg shadow-lg border border-gray-200">
//                             <div className="p-4 border-b border-gray-100">
//                               <h3 className="text-sm font-medium text-gray-900">
//                                 Notifications ({notifications.length})
//                               </h3>
//                             </div>
//                             <div className="py-2">
//                               {notifications.map((notification) => (
//                                 <div
//                                   key={notification.id}
//                                   className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
//                                 >
//                                   <div className="flex items-start space-x-3">
//                                     <div className="relative flex-shrink-0">
//                                       <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
//                                         {notification.avatar}
//                                       </div>
//                                       {notification.isOnline && (
//                                         <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
//                                       )}
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                       <p className="text-sm font-medium text-gray-900 mb-1">
//                                         {notification.type}
//                                       </p>
//                                       <p className="text-xs text-gray-500 truncate">
//                                         {notification.fullLocation}
//                                       </p>
//                                       <span className="text-xs text-gray-400 mt-1 inline-block">
//                                         {notification.time}
//                                       </span>
//                                     </div>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                             <div className="p-3 border-t border-gray-100 text-center">
//                               <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
//                                 View All Notifications
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                       <Link
//                         to="/conversation"
//                         className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
//                         aria-label="Messages"
//                       >
//                         <MessageCircleMore className="w-5 h-5" />
//                       </Link>
//                     </>
//                   )}
//                   {user.role === "Buyer" && (
//                     <>
//                       <Link
//                         to="/saved"
//                         className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
//                         aria-label="Favorites"
//                       >
//                         <Heart className="w-5 h-5" />
//                       </Link>
//                       <Link
//                         to="/orders"
//                         className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
//                         aria-label="Orders"
//                       >
//                         <ShoppingCart className="w-5 h-5" />
//                       </Link>
//                     </>
//                   )}
//                   {user.role === "Seller" && (
//                     <Link
//                       to="/manage-orders"
//                       className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
//                       aria-label="Manage Orders"
//                     >
//                       <ShoppingCart className="w-5 h-5" />
//                     </Link>
//                   )}
//                   {/* User Dropdown */}
//                   <div className="relative" ref={userDropdownRef}>
//                     <button
//                       onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
//                       className="p-2 text-gray-600 hover:text-purple-600 transition-colors flex items-center space-x-2"
//                       aria-label="User menu"
//                     >
//                       <User className="w-5 h-5" />
//                       <span className="text-sm truncate max-w-[120px]">
//                         {user.full_name || "User"}
//                       </span>
//                     </button>
//                     {isUserDropdownOpen && (
//                       <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
//                         <Link
//                           to={user.role === "Buyer" ? "/buyer-profile" : user.role === "Seller" ? "/seller-profile" : "/"}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           onClick={() => setIsUserDropdownOpen(false)}
//                         >
//                           Profile
//                         </Link>
//                         {user.role === "Seller" && (
//                           <Link
//                             to="/seller-overview"
//                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                             onClick={() => setIsUserDropdownOpen(false)}
//                           >
//                             Dashboard
//                           </Link>
//                         )}
//                         <Link
//                           to="/settings"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           onClick={() => setIsUserDropdownOpen(false)}
//                         >
//                           Settings
//                         </Link>
//                         <button
//                           onClick={handleLogout}
//                           className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         >
//                           Logout
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               ) : (
//                 <Link
//                   to="/signin"
//                   className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-gray-800 rounded-full text-sm font-medium"
//                   aria-label="Log In"
//                 >
//                   Log In
//                 </Link>
//               )}
//             </div>

//             {/* Mobile Menu Toggle */}
//             <div className="md:hidden">
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
//                 aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//               >
//                 {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Search Bar */}
//           <div className="md:hidden py-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search for services or categories..."
//                 className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm"
//                 aria-label="Search for services or categories"
//               />
//               <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           {isMenuOpen && (
//             <div className="md:hidden border-t border-gray-200 py-4">
//               <div className="flex flex-col space-y-3 px-2">
//                 {user && !loading && !error ? (
//                   <>
//                     {(user.role === "Buyer" || user.role === "Seller") && (
//                       <>
//                         <Link
//                           to="/notification"
//                           onClick={closeMobileMenu}
//                           className="flex items-center justify-between text-gray-600 hover:text-purple-600 transition-colors py-2"
//                           aria-label="Notifications"
//                         >
//                           <div className="flex items-center space-x-3">
//                             <Bell className="w-5 h-5" />
//                             <span>Notifications</span>
//                           </div>
//                           {notifications.length > 0 && (
//                             <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                               {notifications.length}
//                             </span>
//                           )}
//                         </Link>
//                         <Link
//                           to="/conversation"
//                           onClick={closeMobileMenu}
//                           className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors py-2"
//                           aria-label="Messages"
//                         >
//                           <MessageCircleMore className="w-5 h-5" />
//                           <span>Messages</span>
//                         </Link>
//                       </>
//                     )}
//                     {user.role === "Buyer" && (
//                       <>
//                         <Link
//                           to="/saved"
//                           onClick={closeMobileMenu}
//                           className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors py-2"
//                           aria-label="Favorites"
//                         >
//                           <Heart className="w-5 h-5" />
//                           <span>Favorites</span>
//                         </Link>
//                         <Link
//                           to="/orders"
//                           onClick={closeMobileMenu}
//                           className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors py-2"
//                           aria-label="Orders"
//                         >
//                           <ShoppingCart className="w-5 h-5" />
//                           <span>Orders</span>
//                         </Link>
//                       </>
//                     )}
//                     {user.role === "Seller" && (
//                       <Link
//                         to="/manage-orders"
//                         onClick={closeMobileMenu}
//                         className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors py-2"
//                         aria-label="Manage Orders"
//                       >
//                         <ShoppingCart className="w-5 h-5" />
//                         <span>Manage Orders</span>
//                       </Link>
//                     )}
//                     <Link
//                       to={user.role === "Buyer" ? "/buyer-profile" : user.role === "Seller" ? "/seller-profile" : "/"}
//                       onClick={closeMobileMenu}
//                       className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors py-2"
//                       aria-label="Profile"
//                     >
//                       <User className="w-5 h-5" />
//                       <span>Profile</span>
//                     </Link>
//                     {user.role === "Seller" && (
//                       <Link
//                         to="/seller-overview"
//                         onClick={closeMobileMenu}
//                         className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors py-2"
//                         aria-label="Dashboard"
//                       >
//                         <span>Dashboard</span>
//                       </Link>
//                     )}
//                     <Link
//                       to="/settings"
//                       onClick={closeMobileMenu}
//                       className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors py-2"
//                       aria-label="Settings"
//                     >
//                       <span>Settings</span>
//                     </Link>
//                     <button
//                       onClick={() => {
//                         handleLogout();
//                         closeMobileMenu();
//                       }}
//                       className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors py-2"
//                       aria-label="Logout"
//                     >
//                       <span>Logout</span>
//                     </button>
//                   </>
//                 ) : (
//                   <Link
//                     to="/signin"
//                     onClick={closeMobileMenu}
//                     className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors py-2"
//                     aria-label="Log In"
//                   >
//                     <span>Log In</span>
//                   </Link>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>
//       {/* Spacer to prevent content overlap with fixed navbar */}
//       <div className="h-16 sm:h-20 md:h-20"></div>
//     </>
//   );
// };

// export default Navbar;

import { useEffect, useRef, useState } from "react";
import {
  Search,
  Bell,
  MessageCircleMore,
  User,
  Heart,
  ShoppingCart,
  Home,
  LogIn,
} from "lucide-react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import useMe from "../../hooks/useMe";
import { removeAuthTokens } from "../../lib/cookie-utils";

const Navbar = () => {
  const { user, loading, error } = useMe();
  const navigate = useNavigate();
  const location = useLocation();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileUserDropdownOpen, setIsMobileUserDropdownOpen] = useState(false);

  const notificationRef = useRef(null);
  const userDropdownRef = useRef(null);
  const mobileUserDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setIsNotificationOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setIsUserDropdownOpen(false);
      }
      if (mobileUserDropdownRef.current && !mobileUserDropdownRef.current.contains(e.target)) {
        setIsMobileUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    removeAuthTokens();
    localStorage.removeItem("userRole");
    setIsUserDropdownOpen(false);
    setIsMobileUserDropdownOpen(false);
    navigate("/signin");
  };

  const notifications = [
    { id: 1, type: "Wedding Photography", location: "Overland Park, KS", time: "5m", avatar: "WP", isOnline: true },
    { id: 2, type: "Wedding Photography", location: "Overland Park, KS", time: "5m", avatar: "WP", isOnline: true },
    { id: 3, type: "Wedding Photography", location: "Overland Park, KS", time: "5m", avatar: "WP", isOnline: true },
    { id: 4, type: "Wedding Photography", location: "Overland Park, KS", time: "5m", avatar: "WP", isOnline: true },
    { id: 5, type: "Wedding Photography", location: "Overland Park, KS", time: "5m", avatar: "WP", isOnline: true },
  ];

  const activeClass = "text-purple-600";
  const inactiveClass = "text-gray-600 hover:text-purple-600";

  const DesktopIconLink = ({ to, icon: Icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `p-2 transition-colors ${isActive ? activeClass : inactiveClass}`
      }
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
    </NavLink>
  );

  const MobileBottomBar = () => {
    const isBuyer = user?.role === "Buyer";
    const isSeller = user?.role === "Seller";
    const isLoggedIn = user && !loading && !error;

    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="flex justify-around items-center py-2">
          <NavLink
            to={isSeller ? "/seller-overview" : "/"}
            className={({ isActive }) =>
              `flex flex-col items-center p-2 transition-colors ${isActive ? activeClass : inactiveClass}`
            }
          >
            <Home className="w-6 h-6" />
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/conversation"
              className={({ isActive }) =>
                `flex flex-col items-center p-2 transition-colors ${isActive ? activeClass : inactiveClass}`
              }
            >
              <MessageCircleMore className="w-6 h-6" />
            </NavLink>
          )}

          {isBuyer && (
            <NavLink
              to="/saved"
              className={({ isActive }) =>
                `flex flex-col items-center p-2 transition-colors ${isActive ? activeClass : inactiveClass}`
              }
            >
              <Heart className="w-6 h-6" />
            </NavLink>
          )}

          <NavLink
            to={isBuyer ? "/orders" : isSeller ? "/manage-orders" : "/orders"}
            className={({ isActive }) =>
              `flex flex-col items-center p-2 transition-colors ${isActive ? activeClass : inactiveClass}`
            }
          >
            <ShoppingCart className="w-6 h-6" />
          </NavLink>

          <div className="relative" ref={mobileUserDropdownRef}>
            {isLoggedIn ? (
              <button
                onClick={() => setIsMobileUserDropdownOpen(!isMobileUserDropdownOpen)}
                className={`flex flex-col items-center p-2 transition-colors ${inactiveClass}`}
              >
                <User className="w-6 h-6" />
              </button>
            ) : (
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  `flex flex-col items-center p-2 transition-colors ${isActive ? activeClass : inactiveClass}`
                }
              >
                <LogIn className="w-6 h-6" />
              </NavLink>
            )}

            {isLoggedIn && isMobileUserDropdownOpen && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <Link
                  to={isBuyer ? "/buyer-profile" : "/seller-profile"}
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 rounded-t-lg"
                  onClick={() => setIsMobileUserDropdownOpen(false)}
                >
                  Profile
                </Link>
                {isSeller && (
                  <Link
                    to="/seller-overview"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50"
                    onClick={() => setIsMobileUserDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  to="/settings"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50"
                  onClick={() => setIsMobileUserDropdownOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-b-lg font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const MobileTopBar = () => {
    const isLoggedIn = user && !loading && !error;

    return (
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-50 shadow-md px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search ..."
              className="w-full pl-10 pr-4 py-3 bg-purple-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500"
              aria-label="Search"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-600" />
          </div>

          {isLoggedIn && (
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className={`p-2 rounded-full transition-colors ${inactiveClass}`}
                aria-label="Notifications"
              >
                <Bell className="w-6 h-6" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-72 max-h-96 overflow-y-auto bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900">
                      Notifications ({notifications.length})
                    </h3>
                  </div>
                  <div className="py-2">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {n.avatar}
                            </div>
                            {n.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 mb-1">{n.type}</p>
                            <p className="text-xs text-gray-500 truncate">{n.location}</p>
                            <span className="text-xs text-gray-400 mt-1 inline-block">{n.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-100 text-center">
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                      View All
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className="hidden md:block fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <Link to={user?.role === "Seller" ? "/seller-overview" : "/"}>
                <img src={logo} alt="Logo" className="h-10 w-auto" />
              </Link>
            </div>

            <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg mx-4 sm:mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for services or categories..."
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                  aria-label="Search"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
            </div>

            <div className="flex items-center space-x-3 lg:space-x-4">
              {user && !loading && !error ? (
                <>
                  <div className="relative" ref={notificationRef}>
                    <button
                      onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                      className={`p-2 transition-colors ${inactiveClass}`}
                    >
                      <Bell className="w-5 h-5" />
                      {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {notifications.length}
                        </span>
                      )}
                    </button>
                    {isNotificationOpen && (
                      <div className="absolute right-0 mt-2 w-72 sm:w-80 max-h-96 overflow-y-auto bg-white rounded-lg shadow-lg border border-gray-200">
                        <div className="p-4 border-b border-gray-100">
                          <h3 className="text-sm font-medium text-gray-900">
                            Notifications ({notifications.length})
                          </h3>
                        </div>
                        <div className="py-2">
                          {notifications.map((n) => (
                            <div key={n.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0">
                              <div className="flex items-start space-x-3">
                                <div className="relative flex-shrink-0">
                                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                    {n.avatar}
                                  </div>
                                  {n.isOnline && (
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 mb-1">{n.type}</p>
                                  <p className="text-xs text-gray-500 truncate">{n.location}</p>
                                  <span className="text-xs text-gray-400 mt-1 inline-block">{n.time}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-3 border-t border-gray-100 text-center">
                          <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                            View All
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <DesktopIconLink to="/conversation" icon={MessageCircleMore} label="Messages" />
                  {user.role === "Buyer" && (
                    <>
                      <DesktopIconLink to="/saved" icon={Heart} label="Saved" />
                      <DesktopIconLink to="/orders" icon={ShoppingCart} label="Orders" />
                    </>
                  )}
                  {user.role === "Seller" && (
                    <DesktopIconLink to="/manage-orders" icon={ShoppingCart} label="Manage Orders" />
                  )}

                  <div className="relative" ref={userDropdownRef}>
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className={`p-2 flex items-center space-x-2 transition-colors ${inactiveClass}`}
                    >
                      <User className="w-5 h-5" />
                      <span className="text-sm truncate max-w-[120px]">{user.full_name || "User"}</span>
                    </button>
                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                        <Link
 election                         to={user.role === "Buyer" ? "/buyer-profile" : "/seller-profile"}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                        {user.role === "Seller" && (
                          <Link
                            to="/seller-overview"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            Dashboard
                          </Link>
                        )}
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link
                  to="/signin"
                  className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-gray-800 rounded-full text-sm font-medium"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE TOP BAR: Search + Notification */}
      <MobileTopBar />

      {/* MOBILE BOTTOM BAR */}
      <MobileBottomBar />

      {/* SPACER */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Navbar;