import { useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import { marked } from 'marked';
import apiClient from "../../../lib/api-client";
import Swal from "sweetalert2";

const Advertisement = () => {
  const [formData, setFormData] = useState({
    target_audience: "All",
    subject: "",
    body: "", // This will store Markdown
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const USER_CHOICES = [
    { value: "All", label: "All" },
    { value: "Sellers", label: "Sellers" },
    { value: "Buyers", label: "Buyers" },
    { value: "Subscribers", label: "Subscribers" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error on change
  };

  const handleBodyChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      body: value || "",
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // === Validation ===
    if (!formData.subject.trim()) {
      setError("Subject is required");
      return;
    }
    if (!formData.body.trim()) {
      setError("Email body is required");
      return;
    }

    // Convert Markdown to HTML
    const htmlBody = marked(formData.body);

    console.log({ ...formData, body: htmlBody });
    setLoading(true);

    try {
      await apiClient.post("/administration/marketing/send-emails", {
        target_audience: formData.target_audience,
        subject: formData.subject.trim(),
        body: htmlBody,
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Advertisement email sent successfully!",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });

      // Reset form
      setFormData({
        target_audience: "All",
        subject: "",
        body: "",
      });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        Object.values(err?.response?.data || {})
          .flat()
          .join(", ") ||
        err.message ||
        "Failed to send email";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Create Advertisement Email
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Target Audience */}
        <div>
          <label
            htmlFor="target_audience"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Target Audience <span className="text-red-600">*</span>
          </label>
          <select
            id="target_audience"
            name="target_audience"
            value={formData.target_audience}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm disabled:bg-gray-50"
          >
            {USER_CHOICES.map((choice) => (
              <option key={choice.value} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Subject <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter email subject"
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm disabled:bg-gray-50"
            required
          />
        </div>

        {/* Body (Markdown Editor) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Body <span className="text-red-600">*</span>
          </label>
          <div className="rounded-md" data-color-mode="light">
            <MDEditor
              value={formData.body}
              onChange={handleBodyChange}
              preview="live"
              height={256} // Equivalent to h-64 (64*4=256px, assuming tailwind's rem=16px)
              readonly={loading}
              placeholder="Write your email content in Markdown..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`py-2.5 px-6 rounded-lg font-medium transition-all flex items-center gap-2 ${
              loading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-xl"
            }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              "Send Email Advertisement"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Advertisement;