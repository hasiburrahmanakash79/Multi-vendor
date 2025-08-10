import { useState } from 'react';
import logo from '../../assets/logo/logo.png';
import { Search, Bell, Heart, ShoppingCart, User, Menu, X, MessageCircleMore } from 'lucide-react';
import { Link } from 'react-router-dom';

// Navbar Component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm relative z-50">
      <div className="container mx-auto px-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className='h-8 w-32'>
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for any services or categories..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C8C1F5] focus:border-transparent"
              />
              <div className='absolute right-1 top-1  rounded-full p-2'>
                <Search className=" w-5 h-5 text-black" />
              </div>
            </div>
          </div>

          {/* Desktop Navigation Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <Link to="/conversation" className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
              <MessageCircleMore className="w-5 h-5" />
            </Link>
            <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
              <ShoppingCart className="w-5 h-5" /> 
            </button>
            <div className="relative">
              <button className="flex items-center space-x-1 p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <User className="w-5 h-5" />
                <span className="text-sm">Account</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for any services or categories..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <button className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </button>
              <button className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors">
                <Heart className="w-5 h-5" />
                <span>Favorites</span>
              </button>
              <button className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors">
                <MessageCircleMore className="w-5 h-5" />
                <span>Messages</span>
              </button>
              <button className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
              </button>
              <button className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors">
                <User className="w-5 h-5" />
                <span>Account</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
