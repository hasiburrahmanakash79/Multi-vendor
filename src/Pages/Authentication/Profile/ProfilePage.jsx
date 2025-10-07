import useMe from "../../../hooks/useMe";

const ProfilePage = () => {
  const { user, loading } = useMe();
 console.log(user);

 if(loading){
  return (
      <div className="flex justify-center min-h-screen items-center h-40">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
 }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 container mx-auto mt-16 md:mt-0">
      <div className="border border-gray-200 p-4 rounded-4xl">
        <div
          className="rounded-xl p-6 flex items-center justify-between h-40 sm:h-52"
          style={{
            backgroundImage: `url(${user?.cover_photo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="flex flex-col sm:flex-row justify-between gap-5 items-center sm:items-end mt-4 sm:mt-0">
          <div className="flex flex-col justify-center items-center ml-0 md:ml-10 -mt-20 sm:-mt-28">
            <img
              src={user?.photo}
              alt={user?.full_name}
              className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover border-4 border-white"
            />
            <h2 className="text-xl sm:text-2xl mt-5 font-semibold break-words text-center">
              {user?.full_name}
            </h2>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 p-4 rounded-4xl my-10">
        <h1 className="text-xl font-semibold pb-4">{user?.full_name}'s Bio</h1>
        <p>
          Amazing service! The team made our wedding day stress-free and truly
          magical. Everything was perfectly organized from the décor to the
          timeline. Highly recommend them.
          <br />
          <br />
          We provided an exceptional level of service that completely removed
          the stress from our wedding day. From the moment planning began, every
          detail was handled with precision and care — the décor was beautifully
          arranged, the timeline ran smoothly, and nothing was left to chance.
          Their professionalism and attention to detail made the entire day feel
          magical, allowing us to simply enjoy each moment. I would confidently
          recommend them to anyone planning a wedding.
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
