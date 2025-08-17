
import success from '../../assets/images/success.png'

export default function PaymentSuccess() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        {/* Thank you message */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">
          Thank you!
        </h1>
        
        {/* Success illustration with stars */}
        <div className="w-1/2 mx-auto mb-12">
        <img src={success} alt="" />
        </div>
        
        {/* Success message */}
        <h2 className="text-xl font-medium text-gray-800 mb-8 leading-relaxed">
          Your payment is<br />
          successful
        </h2>
        
        {/* Order page button */}
        <button className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-8 py-3 rounded-full transition duration-200 hover:shadow-lg">
          Order page
        </button>
      </div>
    </div>
  );
}