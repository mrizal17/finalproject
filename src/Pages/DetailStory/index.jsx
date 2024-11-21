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

  useEffect(() => {
    handleStoryById();

    const timer = setTimeout(() => {
      setIsStoryVisible(false);
      toast("Story has ended!");
    }, 10000);

    return () => clearTimeout(timer);
  }, [storyId]);

  if (!dataStoryById) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      {isStoryVisible ? (
        <img
          src={dataStoryById.imageUrl}
          alt="Story"
          className="max-w-full max-h-full object-contain"
        />
      ) : (
        <p className="text-white text-xl">Story has disappeared!</p>
      )}

      <ToastContainer />
    </div>
  );
};

export default DetailStory;
