import { useState, useEffect } from "react";

const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState("descriptions");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 56,
    seconds: 3,
  });

  const images = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/lush-mango-tree-sjRuIVqAJ29SsGx2tyhYH7p7b2b1sW.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/yellow-mangoes-EtBj8iNv0kHYYIKQ8rQB1ZAwfef4LE.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/lush-mango-tree-sjRuIVqAJ29SsGx2tyhYH7p7b2b1sW.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/vitamin-capsules-A80qB0LwOuaRG2pMF00N2Ct7wezGal.jpg",
  ];

  const participants = [
    {
      name: "MD Rakkibul Islam Prottoy",
      phone: "+088 190*********",
      initial: "M",
    },
    { name: "Shihab Uddin", phone: "+088 170*********", initial: "S" },
    { name: "Nusrat Jahan", phone: "+088 180*********", initial: "N" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = "Check out this amazing deal on Fresh mangoes!";

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
        break;
    }
  };

  const totalPrice = quantity * 40;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            {/* Left Side - Image Gallery */}
            <div className="space-y-4 grid grid-cols-5">
              <div className="">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-32 h-32 mb-5 object-cover rounded-lg cursor-pointer border-2 transition ${
                      selectedImage === index
                        ? "border-green-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
              <div className="relative rounded-lg overflow-hidden col-span-4">
                <img
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt="Fresh mangoes"
                  className="w-full h-[570px] object-cover rounded-xl"
                />
                <div className="absolute top-4 left-4 flex justify-between gap-2">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    37% OFF
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Trending
                  </span>
                  <button className="bg-white flex items-center justify-center p-2 rounded-full shadow-md hover:bg-gray-50 transition">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* Tabs Section */}
            <div className=" bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  className={`flex-1 py-4 px-6 font-semibold transition ${
                    activeTab === "descriptions"
                      ? "text-gray-900 border-b-2 border-green-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("descriptions")}
                >
                  Descriptions
                </button>
                <button
                  className={`flex-1 py-4 px-6 font-semibold transition ${
                    activeTab === "additional"
                      ? "text-gray-900 border-b-2 border-green-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("additional")}
                >
                  Additional Information
                </button>
                <button
                  className={`flex-1 py-4 px-6 font-semibold transition ${
                    activeTab === "feedback"
                      ? "text-gray-900 border-b-2 border-green-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("feedback")}
                >
                  Customer Feedback
                </button>
              </div>

              <div className="p-6">
                {activeTab === "descriptions" && (
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Sed commodo aliquam dui ac porta. Fusce ipsum felis,
                      imperdiet at posuere ac, viverra at mauris. Maecenas
                      tincidunt ligula a sem vestibulum pharetra. Maecenas
                      auctor tortor lacus, nec laoreet nisi porttitor vel. Etiam
                      tincidunt urna nec orci volutpat, in vestibulum nec orci
                      vitae, aliquam mollis lacus. Sed et condimentum arcu, id
                      molestie tellus. Nulla facilisi. Nam scelerisque vitae
                      justo a convallis. Morbi urna ipsum, placerat quis commodo
                      quis, egestas elementum leo. Donec convallis mollis enim.
                      Aliquam id mi quam. Phasellus nec fringilla elit.
                    </p>

                    <p>
                      Nulla mauris tellus, feugiat quis pharetra sed, gravida ac
                      dui. Sed iaculis, metus faucibus elementum tincidunt,
                      turpis mi viverra velit, pellentesque tristique neque mi
                      eget nulla. Proin luctus elementum neque et pharetra.
                    </p>

                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>100 g of fresh leaves provides.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Aliquam ac est at augue volutpat elementum.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Quisque nec enim eget sapien molestie.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>
                          Proin convallis odio volutpat finibus posuere.
                        </span>
                      </li>
                    </ul>

                    <p>
                      Cras et diam maximus, accumsan sapien et, sollicitudin
                      velit. Nulla blandit eros non turpis lobortis iaculis at
                      ut massa.
                    </p>
                  </div>
                )}

                {activeTab === "additional" && (
                  <div>
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="py-3 text-gray-600 font-semibold w-1/3">
                            Weight
                          </td>
                          <td className="py-3 text-gray-900">
                            1 Kg, 2 Kg, 5 Kg
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 text-gray-600 font-semibold">
                            Origin
                          </td>
                          <td className="py-3 text-gray-900">Bangladesh</td>
                        </tr>
                        <tr>
                          <td className="py-3 text-gray-600 font-semibold">
                            Quality
                          </td>
                          <td className="py-3 text-gray-900">Organic</td>
                        </tr>
                        <tr>
                          <td className="py-3 text-gray-600 font-semibold">
                            Check
                          </td>
                          <td className="py-3 text-gray-900">Healthy</td>
                        </tr>
                        <tr>
                          <td className="py-3 text-gray-600 font-semibold">
                            Min Weight
                          </td>
                          <td className="py-3 text-gray-900">250 Kg</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === "feedback" && (
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                          A
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Ahmed Hassan
                          </div>
                          <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
                        </div>
                      </div>
                      <p className="text-gray-700 ml-15">
                        Excellent quality mangoes! Very fresh and sweet. The
                        group buying made it very affordable. Highly
                        recommended!
                      </p>
                    </div>

                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-lg">
                          F
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Fatima Rahman
                          </div>
                          <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
                        </div>
                      </div>
                      <p className="text-gray-700 ml-15">
                        Best mangoes I've bought online. Delivery was fast and
                        the packaging was perfect. Will definitely order again!
                      </p>
                    </div>

                    <div>
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-lg">
                          K
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Karim Ali
                          </div>
                          <div className="text-yellow-500">⭐⭐⭐⭐</div>
                        </div>
                      </div>
                      <p className="text-gray-700 ml-15">
                        Good quality and great price. Only 4 stars because
                        delivery took a bit longer than expected, but overall
                        satisfied.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900 clear-both">
                Fresh mangoes
              </h1>
              <div className="bg-red-500 text-white px-4 py-2 rounded-lg inline-flex items-center gap-3 float-right">
                <div className="text-xs">Time Left</div>
                <div className="text-lg font-bold">
                  {String(timeLeft.hours).padStart(2, "0")}:
                  {String(timeLeft.minutes).padStart(2, "0")}:
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sodales,
              risus elit varius enim...{" "}
              <span className="text-green-600 font-semibold cursor-pointer hover:underline">
                See More
              </span>
            </p>

            <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
              <span className="text-2xl text-yellow-400">★</span>
              <span className="text-lg font-semibold text-gray-900">5.0</span>
              <span className="text-gray-500 text-sm">20 Reviews</span>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-gray-400 line-through text-lg">Tk 500</span>
              <span className="text-green-600 text-3xl font-bold">Tk 299</span>
            </div>
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              you save Tk 200
            </span>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3 my-5">
              <div className="flex items-center justify-center gap-2 text-gray-900 font-semibold">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>Join Progress</span>
              </div>

              <div className="flex justify-between text-sm text-gray-700">
                <span>25kg / 50Kg</span>
                <span className="text-red-500 font-semibold">25kg Left</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "50%" }}
                ></div>
              </div>

              <p className="text-xs text-gray-600">
                50% of capacity filled • 13 more can join
              </p>
              <p className="text-sm text-orange-600 font-semibold">
                When 100 quantity is ordered Everyone pays only Tk 250
              </p>
            </div>

            <div className="space-y-2 border-b border-gray-200 pb-4">
              <label className="text-gray-900 font-semibold mb-5">
                Quantity :
              </label>
              <div className="flex items-center gap-4">
                <button
                  className="w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center text-xl font-bold transition"
                  onClick={() => handleQuantityChange(-1)}
                >
                  −
                </button>
                <span className="text-lg font-semibold min-w-[60px] text-center">
                  {quantity} Kg
                </span>
                <button
                  className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center text-xl font-semibold transition"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
                <span className="text-xl font-semibold text-gray-900">
                  Total : TK {totalPrice}
                </span>
              </div>
            </div>

            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              Join Deal
            </button>

            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              <span>Share This Deal</span>
            </div>

            <p className="text-sm text-gray-600">
              Invite friends to unlock even better prices!
            </p>

            <div className="flex gap-3">
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                onClick={() => handleShare("facebook")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
              <button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                onClick={() => handleShare("whatsapp")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </button>
              <button
                className="flex-1 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                onClick={() => handleShare("copy")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="flex items-center gap-2 text-gray-900 font-semibold">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>Recent Participants</span>
              </div>

              <div className="space-y-3">
                {participants.map((participant, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
                      {participant.initial}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {participant.name}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {participant.phone}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-700 pt-3 border-t border-gray-200">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span className="font-semibold">
                  56 people joined this deal
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Names are masked for privacy protection
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center space-y-2">
            <svg
              className="w-12 h-12 text-blue-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <div className="font-bold text-gray-900">Group Buying</div>
            <div className="text-sm text-gray-600">
              More people = better price
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-2">
            <svg
              className="w-12 h-12 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <div className="font-bold text-gray-900">Secure Payment</div>
            <div className="text-sm text-gray-600">Protected transaction</div>
          </div>

          <div className="flex flex-col items-center text-center space-y-2">
            <svg
              className="w-12 h-12 text-blue-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            <div className="font-bold text-gray-900">Fast Shipping</div>
            <div className="text-sm text-gray-600">Quick delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
