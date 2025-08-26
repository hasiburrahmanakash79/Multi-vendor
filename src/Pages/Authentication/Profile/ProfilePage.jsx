import { FiMessageCircle } from "react-icons/fi";
import backgroundImage from "../../../assets/images/cover.jpg";
import profileImage from "../../../assets/images/cardImage2.png";
import badge from "../../../assets/icons/badge.png";

const ProfilePage = () => {
  const profile = {
    name: "Danial Smith",
    avatar: profileImage,
  };


  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="border border-gray-200 p-4 sm:p-8 rounded-4xl">
        <div
          className="rounded-xl p-6 flex items-center justify-between h-40 sm:h-52"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="flex flex-col sm:flex-row justify-between gap-5 items-center sm:items-end mt-4 sm:mt-0">
          <div className="flex flex-col justify-center items-center ml-0 md:ml-10 -mt-20 sm:-mt-28">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover border-4 border-white"
            />
            <h2 className="text-xl sm:text-2xl font-semibold break-words text-center">
              {profile.name}
            </h2>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 items-center">
            <div className="flex items-center space-x-4 sm:space-x-6 text-sm">
              <div className="text-center px-4 sm:px-10">
                <p className="text-2xl sm:text-3xl font-semibold text-yellow-600">
                  {profile.rating}
                </p>
                <p className="whitespace-nowrap">Avg. Rating</p>
              </div>

              <div className="flex flex-col items-center justify-center border-r border-l px-4 sm:px-10 border-gray-300">
                <div className="w-8 h-8 mb-1.5">
                  <img src={badge} alt="verified badge" />
                </div>
                <p className="flex items-center">Verified</p>
              </div>

              <div className="px-4 sm:px-10">
                <p className="text-2xl sm:text-3xl font-semibold text-purple-400">
                  {profile.reviews}+
                </p>
                <p>Reviews</p>
              </div>
            </div>

            <button className="text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors flex gap-2 bg-gray-100 text-sm sm:text-base">
              <FiMessageCircle className="w-5 h-5 sm:w-6 sm:h-6" /> Message
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
