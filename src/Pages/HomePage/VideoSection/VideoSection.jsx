import { Play } from "lucide-react";
import { useState, useRef } from "react";
import event from "../../../assets/videos/event.mp4";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="py-7 px-4">
      <div className="">
        <div className="relative md:rounded-3xl rounded-xl overflow-hidden shadow-xl">
          <div className="relative h-64 sm:h-80 lg:h-96">
            {!isPlaying && (
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                alt="Event celebration"
                className="w-full h-full object-cover"
              />
            )}
            
            <video
              ref={videoRef}
              className={`w-full h-full object-cover ${!isPlaying ? 'hidden' : ''}`}
              controls={isPlaying}
            >
              <source src={event} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {!isPlaying && <div className="absolute inset-0 bg-black/20"></div>}
            
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handlePlayClick}
                  className="w-20 h-20 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 group"
                >
                  <Play className="w-8 h-8 text-purple-600 ml-1 group-hover:text-purple-700" fill="currentColor" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;