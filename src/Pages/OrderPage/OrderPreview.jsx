import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import useModal from '../../components/modal/useModal';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderPreview = () => {
  const { isOpen: showPaymentModal, openModal: openPaymentModal, closeModal: closePaymentModal } = useModal();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const { service, bookingDetails } = state || {};
  
  // Format date and time for display
  const formattedDate = bookingDetails?.date 
    ? new Date(bookingDetails.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) 
    : 'N/A';
  const formattedTime = bookingDetails?.time 
    ? new Date(bookingDetails.time).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }) 
    : 'N/A';

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handleContinue = () => {
    if (selectedPayment) {
      navigate('/successful', { 
        state: { 
          service, 
          bookingDetails, 
          paymentMethod: selectedPayment 
        } 
      });
      console.log(`Proceeding with ${selectedPayment} payment`);
      closePaymentModal();
    } else {
      alert('Please select a payment method');
    }
  };

  const handleNext = () => {
    openPaymentModal();
  };

  // Fallback if no service data is available
  if (!service || !bookingDetails) {
    return (
      <div className="min-h-screen py-8 container mx-auto mt-30 md:mt-15">
        <div className="px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Order Preview
          </h1>
          <p className="text-gray-600">No booking details available. Please return to the service page to make a booking.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 container mx-auto mt-316 md:mt-0">
      <div className="px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Order Preview
        </h1>

        <div className="">
          <div className="relative h-[500px] bg-gradient-to-r from-orange-200 to-orange-300 rounded-2xl">
            <img
              src={service.coverPhoto || "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"}
              alt={service.title || "Service image"}
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-black/20 bg-opacity-20 rounded-2xl"></div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {service.title}
            </h2>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-700 mb-3">
                Descriptions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-gray-700 mb-4">
                  Booking Info
                </h3>

                <div className="bg-gray-50 p-4 rounded-2xl shadow-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium text-gray-800">{formattedDate}</p>
                      <p className="text-gray-600">{formattedTime}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl shadow-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">
                        Event Location
                      </h4>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{bookingDetails.location || "No location provided"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-700 mb-4">
                  Price Breakdown
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{service.title}</span>
                    <span className="font-medium text-gray-800">${service.basePrice}</span>
                  </div>

                  {bookingDetails.additionals?.map((add) => (
                    <div key={add.id} className="flex justify-between">
                      <span className="text-gray-600">{add.title}</span>
                      <span className="font-medium text-gray-800">${add.price}</span>
                    </div>
                  ))}

                  <hr className="border-gray-300 my-4" />

                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-800">Total</span>
                    <span className="font-bold text-gray-800">${bookingDetails.totalPrice}</span>
                  </div>
                </div>

                <div className="mt-8 w-full">
                  <button
                    className="w-full rounded-full bg-gray-800 hover:bg-gray-900 text-white font-medium px-12 py-3 hover:shadow-xl transition duration-200"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment method</h2>
            <p className="text-gray-500 mb-6">Choose the type of payment you are looking for.</p>
            
            <div className="space-y-4 mb-8">
              <div 
                className={`flex items-center justify-between p-4 border rounded-2xl hover:border-gray-300 cursor-pointer ${selectedPayment === 'Stripe' ? 'border-purple-600' : 'border-gray-200'}`}
                onClick={() => handlePaymentSelect('Stripe')}
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
                  checked={selectedPayment === 'Stripe'} 
                  onChange={() => handlePaymentSelect('Stripe')} 
                  className="text-purple-600 focus:ring-purple-600" 
                />
              </div>
              
              <div 
                className={`flex items-center justify-between p-4 border rounded-2xl hover:border-gray-300 cursor-pointer ${selectedPayment === 'Paypal' ? 'border-blue-600' : 'border-gray-200'}`}
                onClick={() => handlePaymentSelect('Paypal')}
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
                  checked={selectedPayment === 'Paypal'} 
                  onChange={() => handlePaymentSelect('Paypal')} 
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
};

export default OrderPreview;