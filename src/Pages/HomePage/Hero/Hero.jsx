import { Search } from "lucide-react";
import banner from "../../../assets/images/banner.png";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
        {/* Header Text */}
        <div className="mb-10">
          <p className="text-white text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
            Present up Event Management Specialists
          </p>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug sm:leading-tight mb-6 sm:mb-10">
            Choose Your Nearby Event <br className="hidden sm:block" />
            Management Services
          </h1>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-3xl md:rounded-full shadow-2xl mx-auto overflow-hidden w-full">
          <div className="flex flex-col md:flex-row flex-wrap">
            {/* Where Dropdown */}
            <div className="flex-1 px-4 sm:px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200">
              <p className="text-left text-sm font-medium text-gray-700 mb-1">
                Where
              </p>
              <select
                className="w-full bg-transparent border-0 text-gray-700 focus:outline-none text-sm"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Location
                </option>
                <option value="dhaka">Dhaka</option>
                <option value="chattogram">Chattogram</option>
                <option value="rajshahi">Rajshahi</option>
                <option value="khulna">Khulna</option>
              </select>
            </div>

            {/* Services Dropdown */}
            <div className="flex-1 px-4 sm:px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200">
              <label className="text-left text-sm font-medium text-gray-700 mb-1 block">
                Services
              </label>
              <select
                className="w-full bg-transparent border-0 text-gray-700 focus:outline-none text-sm"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Services
                </option>
                <option value="wedding">Wedding Planning</option>
                <option value="corporate">Corporate Events</option>
                <option value="birthday">Birthday Parties</option>
                <option value="concert">Concerts</option>
              </select>
            </div>

            {/* Date Picker */}
            <div className="flex-1 px-4 sm:px-6 py-4 border-b md:border-b-0 border-gray-200">
              <label className="text-left text-sm font-medium text-gray-700 mb-1 block">
                Date
              </label>
              <input
                type="date"
                className="w-full bg-transparent border-0 text-gray-700 focus:outline-none text-sm"
              />
            </div>

            {/* Search Button */}
            <div className="flex items-center justify-center p-3 sm:p-4 w-full md:w-auto">
  <button className="bg-[#C8C1F5] text-black w-full md:w-14 h-12 sm:h-14 rounded-2xl md:rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg">
    <Search className="w-5 h-5 sm:w-6 sm:h-6" />
    <span className="block md:hidden text-sm font-medium">Search</span>
  </button>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
