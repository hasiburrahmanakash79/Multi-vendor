import { Search } from "lucide-react";
import banner from "../../../assets/images/banner.png";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Header Text */}
        <div className="mb-8">
          <p className="text-white text-lg sm:text-xl mb-4">
            Present up Event Management Specialists
          </p>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            Choose Your nearby Event
            <br />
            Management Services
          </h1>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-full shadow-2xl max-w-5xl mx-auto overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            {/* Where Input */}
            <div className="flex-1 px-6 py-4 border-b sm:border-b-0 sm:border-r border-gray-200">
              <p className="block text-start text-sm font-medium text-gray-700 mb-1">
                Where
              </p>
              <input
                type="text"
                placeholder="Select Location"
                className="w-full text-gray-600 bg-transparent border-0 focus:outline-none placeholder-gray-400 text-sm"
              />
            </div>

            {/* Services Input */}
            <div className="flex-1 px-6 py-4 border-b sm:border-b-0 sm:border-r border-gray-200">
              <label className="block text-start text-sm font-medium text-gray-700 mb-1">
                Services
              </label>
              <input
                type="text"
                placeholder="Select services"
                className="w-full text-gray-600 bg-transparent border-0 focus:outline-none placeholder-gray-400 text-sm"
              />
            </div>

            {/* Date Input */}
            <div className="flex-1 px-6 py-4 border-b sm:border-b-0 border-gray-200">
              <label className="block text-start text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="text"
                placeholder="Select Date"
                className="w-full text-gray-600 bg-transparent border-0 focus:outline-none placeholder-gray-400 text-sm"
              />
            </div>

            {/* Search Button */}
            <div className="flex items-center justify-center p-2">
              <button className="bg-[#C8C1F5] text-black w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
