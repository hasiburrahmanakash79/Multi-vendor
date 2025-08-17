import { Link } from "react-router-dom";
import location from "../../../assets/icons/location.svg";
import image1 from "../../../assets/images/cardImage1.png";
import image2 from "../../../assets/images/cardImage2.png";
import image3 from "../../../assets/images/cardImage3.png";
import image4 from "../../../assets/images/cardImage4.png";
import image5 from "../../../assets/images/cardImage5.png";
import image6 from "../../../assets/images/cardImage6.png";
import image7 from "../../../assets/images/cardImage7.png";
import image8 from "../../../assets/images/cardImage8.png";
import { RiStarFill } from "react-icons/ri";
import { Heart } from "lucide-react";

const PopularServices = () => {
  const services = [
  {
    id: 1,
    thumbnail: image1,
    title: "Wedding Photography",
    rating: 4.8,
    image: image1,
    name: "Robart Carlose",
    price: 19.99,
    distance: "4 km",
  },
  {
    id: 2,
    thumbnail: image2,
    title: "Event Decoration",
    rating: 4.6,
    image: image2,
    name: "Samantha Ray",
    price: 25.0,
    distance: "2.5 km",
  },
  {
    id: 3,
    thumbnail: image3,
    title: "DJ Party Setup",
    rating: 4.7,
    image: image3,
    name: "John Mixwell",
    price: 30.0,
    distance: "3 km",
  },
  {
    id: 4,
    thumbnail: image4,
    title: "Catering Service",
    rating: 4.9,
    image: image4,
    name: "Emily Foods",
    price: 15.5,
    distance: "1.8 km",
  },
  {
    id: 5,
    thumbnail: image5,
    title: "Luxury Wedding Car",
    rating: 4.5,
    image: image5,
    name: "CarZone",
    price: 45.0,
    distance: "5.2 km",
  },
  {
    id: 6,
    thumbnail: image6,
    title: "Makeup Artist",
    rating: 4.4,
    image: image6,
    name: "GlamUp Studio",
    price: 18.0,
    distance: "2 km",
  },
  {
    id: 7,
    thumbnail: image7,
    title: "Stage Lighting",
    rating: 4.6,
    image: image7,
    name: "Bright Lights Co.",
    price: 20.0,
    distance: "3.7 km",
  },
  {
    id: 8,
    thumbnail: image8,
    title: "Live Music Band",
    rating: 4.9,
    image: image8,
    name: "The Rockers",
    price: 55.0,
    distance: "6 km",
  },
];


  return (
    <div className="py-7 px-4">
      <div className="py-5 flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl font-bold text-left">
          Popular Services
        </h1>
        <Link
          to="/services"
          className="text-[#1E40AF] underline text-base"
        >
          See All
        </Link>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
                to={`/serviceDetails/${service.id}`}
              key={service.id}
              className="relative border border-gray-200 rounded-lg p-3"
            >
              <div className="absolute top-3 left-3 bg-white/40 text-black text-sm font-semibold px-3 py-2 rounded-br-xl flex items-center gap-1">
                <RiStarFill className="inline text-yellow-400" />{" "}
                {service.rating}
              </div>
              <img
                src={service.thumbnail}
                alt={service.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="flex items-center justify-between mt-2 border-b pb-2 border-gray-200">
                <div className="flex items-center gap-2">
                  <img
                    src={image1}
                    className="w-5 h-5 rounded-full object-cover"
                    alt=""
                  />
                  <p>{service.name}</p>
                </div>
                <span className="flex items-center gap-2">
                  <img src={location} alt="" />
                  <p className="text-sm md:text-base">{service.distance}</p>
                </span>
              </div>
              <div className="mt-2">
                <p className="font-semibold">{service.title}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="flex items-baseline">
                  <p className="font-semibold">${service.price}</p>
                  <span className="text-gray-400 text-xs font-light">/hr</span>
                </span>
                <span className="bg-gray-100 p-2 rounded-full hover:shadow transition-shadow duration-300">
                    <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-300" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularServices;
