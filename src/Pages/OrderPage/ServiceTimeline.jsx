import { MapPin, MessageCircle, Phone } from 'lucide-react';

export default function ServiceTimeline() {
  return (
    <div className="min-h-screen py-8">
      <div className=" px-4">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Service Timeline
        </h1>
        
        {/* Hero Image */}
        <div className="relative h-64 mb-8">
          <img 
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Wedding venue with elegant floral decorations and warm lighting"
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-black/20 bg-opacity-20 rounded-2xl"></div>
        </div>
        
        {/* Venue Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Destination engagement and wedding hall, california
        </h2>
        
        {/* Description */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Descriptions</h3>
          <p className="text-gray-600 leading-relaxed">
            California offers stunning destination engagement and wedding venues, from oceanfront resorts and lush vineyards to historic estates 
            and garden courtyards. Couples can enjoy picturesque backdrops, luxury amenities, and customizable packages for an unforgettable 
            celebration.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Included Services */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-6">Included Services</h3>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-start space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Dining area"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Dinning Area and location</h4>
                    <p className="text-gray-600 text-sm">200+ People capacity • Photography</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Booking Info */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-6">Booking info</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Event Location</h4>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>775 Rolling Green Rd.</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Event Start</h4>
                  <p className="text-gray-600">19/04/2025</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Event End</h4>
                  <p className="text-gray-600">19/04/2025</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Price Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Price</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Event Location</span>
                  <span className="font-medium text-gray-800">$5,500</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Photographer x2</span>
                  <span className="font-medium text-gray-800">$289</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Catering Package</span>
                  <span className="font-medium text-gray-800">$1,522</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Catering Package</span>
                  <span className="font-medium text-gray-800">$1,522</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Catering Package</span>
                  <span className="font-medium text-gray-800">$1,522</span>
                </div>
                
                <hr className="border-gray-300 my-4" />
                
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">Total</span>
                  <span className="font-bold text-gray-800">$6,785</span>
                </div>
              </div>
            </div>
            
            {/* Time Left */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4 bg-amber-50 p-4">
                <span className="text-gray-700 font-medium">Time Left</span>
                <span className="text-orange-500 font-semibold">20 Days</span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-[#C8C1F5] font-medium py-3 px-4 rounded-full flex items-center justify-center space-x-2 transition hover:shadow-lg duration-300">
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
                
                <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition duration-200">
                  <Phone className="w-6 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}