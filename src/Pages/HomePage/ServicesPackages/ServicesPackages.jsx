import { Link } from "react-router-dom";
import location from "../../../assets/icons/location.svg";
import image1 from "../../../assets/images/cardImage1.png";
import image2 from "../../../assets/images/cardImage2.png";
import image3 from "../../../assets/images/cardImage3.png";
import image4 from "../../../assets/images/cardImage4.png";
import { RiStarFill } from "react-icons/ri";
import { Heart } from "lucide-react";

const ServicesPackages = () => {
  const packages = [
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
];


  return (
    <div className="py-5 px-4" >
      <div className="pb-5 flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl font-bold text-left">
          Services Packages
        </h1>
        <Link
          to="/"
          className="text-[#1E40AF] underline text-base"
        >
          See All
        </Link>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {packages.map((pack) => (
            <div
              key={pack.id}
              className="relative border border-gray-200 rounded-lg p-3"
            >
              <div className="absolute top-3 left-3 bg-white/40 text-black text-sm font-semibold px-3 py-2 rounded-br-xl flex items-center gap-1">
                <RiStarFill className="inline text-yellow-400" />{" "}
                {pack.rating}
              </div>
              <img
                src={pack.thumbnail}
                alt={pack.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="flex items-center justify-between mt-2 border-b pb-2 border-gray-200">
                <div className="flex items-center gap-2">
                  <img
                    src={image1}
                    className="w-5 h-5 rounded-full object-cover"
                    alt=""
                  />
                  <p>{pack.name}</p>
                </div>
                <span className="flex items-center gap-2">
                  <img src={location} alt="" />
                  <p className="text-sm md:text-base">{pack.distance}</p>
                </span>
              </div>
              <div className="mt-2">
                <p className="font-semibold">{pack.title}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="flex items-baseline">
                  <p className="text-xl font-bold">${pack.price}</p>
                  <span className="text-gray-400 text-xs font-light">/hr</span>
                </span>
                <span className="bg-gray-100 p-2 rounded-full hover:shadow transition-shadow duration-300">
                    <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-300" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPackages;
