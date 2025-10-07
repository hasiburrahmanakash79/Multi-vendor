import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import signinImage from "../../assets/images/signin.png";
import apiClient from "../../lib/api-client";
import { setAuthTokens } from "../../lib/cookie-utils";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        email_address: data.email,
        password: data.password,
      };

      const response = await apiClient.post("/auth/sign-in", payload);

      if (response.status === 200 || response.status === 201) {
        const { access_token, refresh_token } = response.data;

        const accessTokenMaxAge = data.remember
          ? 30 * 24 * 60 * 60
          : 1 * 60 * 60;

        setAuthTokens(access_token, refresh_token, {
          maxAge: accessTokenMaxAge,
        });
        if (response?.data?.role === "Seller") {
          navigate("/seller-overview");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      console.error("Sign-in failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 min-h-screen bg-base-200">
      <div className="hidden md:flex md:col-span-1 ">
        <img
          src={signinImage}
          className="w-full h-full object-cover"
          alt="Sign-in background"
        />
      </div>
      <div className="flex items-center justify-center p-4 sm:p-6 md:col-span-1">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl p-4 sm:p-6 md:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-4">
            Welcome Back!
          </h2>
          <p className="text-center text-xs sm:text-sm md:text-base mb-4 sm:mb-6 text-[#747086]">
            Enter your email and password to access your account.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter your email"
                  className="w-full border border-base-300 bg-base-200 rounded-full px-3 py-2 sm:py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#C8C1F5]"
                />
                <FaUser className="absolute inset-y-2 sm:inset-y-3 right-3 h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  placeholder="********"
                  className="w-full border border-base-300 bg-base-200 rounded-full px-3 py-2 sm:py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#C8C1F5]"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 sm:h-6 sm:w-6" />
                  ) : (
                    <FaEye className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.password.message}
                </p>
              )}

              <div className="flex justify-end items-center mt-2 text-xs sm:text-sm gap-2 sm:gap-0">
                {/* <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register("remember")}
                    className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                  />
                  <span className="opacity-75">Remember for 30 Days</span>
                </div> */}
                <Link
                  to="/forgot-password"
                  className="text-[#b6acf7] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-xs sm:text-sm text-center">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#C8C1F5] hover:bg-[#b6acf7] text-black py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-colors"
            >
              Login
            </button>
          </form>

          <div className="divider text-xs sm:text-sm my-4 sm:my-6">
            Or Login with
          </div>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button className="flex-1 flex items-center justify-center border border-base-300 rounded-md py-2 sm:py-3 text-xs sm:text-sm hover:bg-gray-100 hover:shadow-lg transition-all">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
              />
              Google
            </button>
            <button className="flex-1 flex items-center justify-center border border-base-300 rounded-md py-2 sm:py-3 text-xs sm:text-sm hover:bg-gray-100 hover:shadow-lg transition-all">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple"
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
              />
              Apple
            </button>
          </div>
          <p className="text-center text-xs sm:text-sm mt-4 sm:mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#b6acf7] hover:underline">
              Sign Up Free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;