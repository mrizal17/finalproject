import { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import { SlLike } from "react-icons/sl";
import axios from "axios";
import { Link } from "react-router-dom";
import usePhotoDefault from "../../hooks/usePhotoDefault";


const Explore = () => {
    const [dataExplore, setDataExplore] = useState([]);
    const token = localStorage.getItem("access_token");
    const apiKey = localStorage.getItem("apiKey");
    const photodefault = usePhotoDefault()

    const getDataExplore = () => {
        axios
            .get(
                "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/explore-post?size=300&page=1",
                {
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                setDataExplore(res.data.data.posts);
            });
    };

    useEffect(() => {
        getDataExplore();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 pt-20 pb-4 px-4 min-h-screen">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {dataExplore.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 overflow-hidden"
                        >
                            <Link to={`/detailpostbyid/${item?.id}`}>
                                {/* Post Image */}
                                <div className="relative">
                                    <img
                                        className="w-full h-40 object-cover"
                                        src={item.imageUrl || photodefault } onError={(e)=> {
                                            e.target.src = photodefault
                                        }}
                                        alt=""
                                    />
                                    <img
                                        src={item?.user?.profilePictureUrl || photodefault } onError={(e)=> {
                                            e.target.src = photodefault
                                        }}
                                        alt=""
                                        className="absolute top-2 left-2 w-10 h-10 rounded-full border-2 border-white shadow-md hover:ring-2 hover:ring-purple-400"
                                    />
                                </div>
                            </Link>

                            {/* Post Info */}
                            <div className="p-4">
                                <h2 className="text-base font-semibold text-gray-800">
                                    {item?.user?.username}
                                </h2>
                                <p className="text-sm text-gray-600 truncate">
                                    {item?.caption}
                                </p>
                                {/* Like Section */}
                                <div className="flex items-center gap-2 mt-2 text-gray-700">
                                    <SlLike className="text-red-500 hover:scale-110 transition-transform duration-200" />
                                    <span>{item?.totalLikes} Likes</span>
                                </div>
                                {/* Comments Section */}
                                <div className="mt-2 text-sm text-gray-700">
                                    <h3 className="font-semibold">Comments:</h3>
                                    {item?.comments?.slice(0, 2).map((comment, idx) => (
                                        <p key={idx} className="truncate">
                                            <span className="font-semibold text-gray-800">{comment.username}:</span>{" "}
                                            {comment.comment}
                                        </p>
                                    ))}
                                    {item?.comments?.length > 2 && (
                                        <Link
                                            to={`/detailpostbyid/${item?.id}`}
                                            className="text-blue-500 text-xs"
                                        >
                                            View all comments
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Explore;
