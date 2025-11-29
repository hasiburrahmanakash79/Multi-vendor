import { useEffect, useState, useRef } from "react";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import apiClient from "../../lib/api-client"; // your axios instance
import Swal from "sweetalert2";

export function BoostPaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("confirming"); // confirming | success | error
  const [message, setMessage] = useState("");
  const hasConfirmed = useRef(false); // NEW: Prevent double calls

  useEffect(() => {
    const token = searchParams.get("token"); // This is PayPal Order ID
    const payerId = searchParams.get("PayerID");

    if (!token || !payerId) {
      setStatus("error");
      setMessage("Missing payment information. Please try again.");
      return;
    }

    const confirmPayment = async () => {
      if (hasConfirmed.current) return; // NEW: Skip if already confirmed
      hasConfirmed.current = true; // NEW: Mark as confirmed

      try {
        setStatus("confirming");

        const response = await apiClient.post("/payment/paypal/boosting/confirm", {
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
          navigate(-2); // or redirect to service page
        });
      }
    };

    confirmPayment();
  }, [searchParams, navigate]);

  // Loading / Confirming State
  if (status === "confirming") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Confirming Your Payment...
          </h2>
          <p className="text-slate-600">Please wait while we verify your transaction.</p>
        </div>
      </div>
    );
  }

  // Error State
  if (status === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Payment Confirmation Failed
          </h2>
          <p className="text-slate-600 mb-8">{message}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-2xl transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Success State (Final)
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-green-100 text-lg">
              Your service has been successfully boosted and is now live with premium visibility!
            </p>
          </div>

          <div className="p-8 text-center">
            <p className="text-slate-700 mb-6">
              Thank you for your purchase. You will see increased traffic and inquiries soon.
            </p>
            <button
              onClick={() => navigate("/my-services")} // or wherever you want
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-10 rounded-2xl transition transform hover:scale-105 shadow-lg"
            >
              Go to Dashboard
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}