import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailStory = () => {
  const { storyId } = useParams();
  const apiKey = localStorage.getItem("apiKey");
  const token = localStorage.getItem("access_token");
  const [dataStoryById, setDataStoryById] = useState(null);
  const [storyViews, setStoryViews] = useState([]);
  const [isStoryVisible, setIsStoryVisible] = useState(true);

  // Fetch story data by ID
  const handleStoryById = () => {
    axios
      .get(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/story/${storyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setDataStoryById(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching story:", error);
      });
  };

  // Fetch story views by ID
  const handleStoryViews = () => {
    axios
      .get(
        `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/story-views/${storyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setStoryViews(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching story views:", error);
      });
  };

  useEffect(() => {
    handleStoryById();
    handleStoryViews();

    // Set a timer to hide the story after 15 seconds
    const timer = setTimeout(() => {
      setIsStoryVisible(false);
      toast("Story has ended!");
    }, 15000); // 15 seconds

    return () => clearTimeout(timer);
  }, [storyId]);

  if (!dataStoryById) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      {isStoryVisible ? (
        <img
          src={dataStoryById.imageUrl}
          alt="Story"
          className="max-w-full max-h-full object-contain"
        />
      ) : (
        <p className="text-white text-xl">Story has disappeared!</p>
      )}

      {/* Display users who have viewed the story */}
      {storyViews.length > 0 && (
        <div className="mt-4 w-full max-w-md text-white text-center">
          <h2 className="text-lg font-semibold mb-2">Viewers</h2>
          <div className="flex flex-wrap justify-center">
            {storyViews.map((viewer, index) => (
              <div key={index} className="flex items-center m-1">
                <img
                  src={viewer.profilePictureUrl}
                  alt={viewer.username}
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <p className="ml-2">{viewer.username}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default DetailStory;
