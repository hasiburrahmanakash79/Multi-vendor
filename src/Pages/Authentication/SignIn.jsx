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
        const { access_token, refresh_token } = response.data; // Assuming API returns tokens

        // Adjust access_token maxAge based on "Remember for 30 Days"
        const accessTokenMaxAge = data.remember
          ? 30 * 24 * 60 * 60
          : 1 * 60 * 60; // 30 days or 1 hour

        // Use setAuthTokens with custom access_token expiration
        setAuthTokens(access_token, refresh_token, {
          maxAge: accessTokenMaxAge,
        });
        if (response?.data?.role === "Seller") {
          navigate("/seller-overview"); // Redirect to admin dashboard
        } else {
          navigate("/"); // Redirect to user dashboard
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
    <div className="grid grid-cols-2 min-h-screen bg-base-200">
      <div className="col-span-1 bg-blue-500 flex items-center">
        <img src={signinImage} className="object-cover h-full" alt="" />
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <div className="max-w-xl w-full p-10">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Welcome Back!
          </h2>
          <p className="text-center text-sm mb-6 text-[#747086]">
            Enter your email and password to access your account.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
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
                  className="w-full border border-base-300 bg-base-200 rounded-full p-2 outline-none"
                />
                <FaUser className="absolute inset-y-3 right-3 flex items-center text-gray-500" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
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
                  className="w-full border border-base-300 bg-base-200 rounded-full p-2 outline-none"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}

              <div className="flex justify-between items-center mt-2 text-sm">
                <div className="flex items-center opacity-75">
                  <input
                    type="checkbox"
                    {...register("remember")}
                    className="mr-2"
                  />
                  Remember for 30 Days
                </div>
                <Link
                  to="/forgot-password"
                  className="text-[#b6acf7] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#C8C1F5] hover:bg-[#b6acf7] text-black py-2 rounded-full"
            >
              Login
            </button>
          </form>

          <div className="divider">Or Login with</div>
          <div className="flex space-x-4">
            <button className="flex-1 flex items-center justify-center border border-base-300 rounded-md py-2 hover:bg-gray-100 hover:shadow-lg">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Google
            </button>
            <button className="flex-1 flex items-center justify-center border border-base-300 rounded-md py-2 hover:bg-gray-100 hover:shadow-lg">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple"
                className="w-5 mr-2"
              />
              Apple
            </button>
          </div>
          <p className="text-center text-sm mt-6">
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
