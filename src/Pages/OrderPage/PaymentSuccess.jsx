import { useEffect, useState, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import success from '../../assets/images/success.png';
import apiClient from "../../lib/api-client"; // Assuming this is your API client
import Swal from "sweetalert2";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("confirming"); // confirming | success | error
  const [message, setMessage] = useState("");
  const hasConfirmed = useRef(false); // Prevent double calls in dev mode

  useEffect(() => {
    const token = searchParams.get("token"); // This is PayPal Order ID
    const payerId = searchParams.get("PayerID");

    if (!token || !payerId) {
      setStatus("error");
      setMessage("Missing payment information. Please try again.");
      return;
    }

    const confirmPayment = async () => {
      if (hasConfirmed.current) return; // Skip if already confirmed
      hasConfirmed.current = true; // Mark as confirmed

      try {
        setStatus("confirming");

        const response = await apiClient.post("/payment/paypal/confirm", {
          order_id: token, // token from URL is the PayPal order ID
        });

        if (response.status === 200 || response.data.success) {
          setStatus("success");
        } else {
          throw new Error(response.data.message || "Confirmation failed");
        }
      } catch (err) {
        console.error("Payment confirmation error:", err);
        setStatus("error");
        setMessage(
          err.response?.data?.message ||
            err.message ||
            "Failed to confirm payment. Please contact support."
        );

        // Optional: Show SweetAlert
        Swal.fire({
          icon: "error",
          title: "Payment Confirmation Failed",
          text: message,
          confirmButtonText: "Go Back",
        }).then(() => {
          navigate(-2); // or redirect to appropriate page
        });
      }
    };

    confirmPayment();
  }, [searchParams, navigate]);

  // Loading / Confirming State
  if (status === "confirming") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 container mx-auto">
        <div className="text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Confirming Your Payment...
          </h2>
          <p className="text-gray-600">Please wait while we verify your transaction.</p>
        </div>
      </div>
    );
  }

  // Error State
  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 container mx-auto">
        <div className="text-center max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Payment Confirmation Failed
          </h2>
          <p className="text-gray-600 mb-8">{message}</p>
          <Link
            to="/"
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3 rounded-full transition duration-200 hover:shadow-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Success State
  return (
    <div className="min-h-screen flex items-center justify-center px-4 container mx-auto ">
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
        <Link to='/orders' className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-8 py-3 rounded-full transition duration-200 hover:shadow-lg">
          Order page
        </Link>
      </div>
    </div>
  );
}