import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";


const FollowingPost = () => {
  const [dataFollowingPost, setDataFollowingPost] = useState([]);
  const [dataFollowingStories, setDataFollowingStories] = useState([]);
  const token = localStorage.getItem("access_token");
  const apiKey = localStorage.getItem("apiKey");

  const getDataFollowingPost = () => {
    axios
      .get(
        "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/following-post?size=10&page=1",
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setDataFollowingPost(res?.data?.data?.posts);
      });
  };

  const getMyFollowingStories = () => {
    axios
    .get('https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/following-story?size=10&page=1',
      {
        headers: {
          "Content-Type": "application/json",
          apiKey: apiKey,
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then ((res)=>{
      setDataFollowingStories(res?.data?.data?.stories)
    })
  }
  console.log('ini data stories',dataFollowingStories)
  useEffect(() => {
    getMyFollowingStories();
    getDataFollowingPost();
  }, []);

  console.log("ini data following post", dataFollowingPost);

  return (
    <div>
      <div className="flex gap-10">{dataFollowingStories.map((item, index)=>(
        <div key={index}>
          <Link to={`/detailstory/${item.id}`} >
          <img className="ml-2 rounded-full h-13 w-13 object-cover"
            src={item.user.profilePictureUrl}/>
            <div>
              {/* story */}
              <img src={item.user.imageUrl} alt="" />
            </div>
      </Link>
        </div>
      ))}
      </div>
      <div className="border border-black flex gap-8 flex-cols flex-wrap mt-3 ml-4">
        {dataFollowingPost.map((item, index) => (
          <div key={index}>
            <div className="flex gap-3 border border-black border-collapse bg-slate-500">
              <img
                className="w-16 h-14 rounded-full"
                src={item.user.profilePictureUrl}
                alt=""
              />
              {item.user.username}
            </div>
            <img
              className="w-40 h-40 object-cover"
              src={item.imageUrl}
              alt=""
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default FollowingPost;
