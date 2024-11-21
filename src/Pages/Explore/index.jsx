import { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import { SlLike } from "react-icons/sl";
import axios from "axios";
import { Link } from "react-router-dom";

const Explore = () => {
    const [dataExplore, setDataExplore] = useState([]);
    const token = localStorage.getItem("access_token");
    const apiKey = localStorage.getItem("apiKey");

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

    console.log("ini data explore", dataExplore);

    useEffect(() => {
        getDataExplore();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="bg-black pt-20 pb-4 px-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {dataExplore.map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#FEF3E2] border border-gray-200 rounded-xl shadow-md overflow-hidden"
                        >
                            <Link to={`/detailpostbyid/${item?.id}`}>
                                {/* Post Image */}
                                <div className="relative">
                                    <img
                                        className="w-full h-40 object-cover"
                                        src={item.imageUrl}
                                        alt=""
                                    />
                                    <img
                                        src={item?.user?.profilePictureUrl}
                                        alt=""
                                        className="absolute top-2 left-2 w-10 h-10 rounded-full border-2 border-white shadow-md"
                                    />
                                </div>
                            </Link>

                            {/* Post Info */}
                            <div className="p-4">
                                <h2 className="text-sm font-semibold text-gray-700">
                                    {item?.user?.username}
                                </h2>
                                <p className="text-xs text-gray-500 truncate">
                                    {item?.caption}
                                </p>
                                {/* Like Section */}
                                <div className="flex items-center gap-2 mt-2 text-gray-600">
                                    <SlLike className="text-red-500" />
                                    <span>{item?.totalLikes} Likes</span>
                                </div>
                                {/* Comments Section */}
                                <div className="mt-2 text-sm text-gray-700">
                                    <h3 className="font-semibold">Comments:</h3>
                                    {item?.comments?.slice(0, 2).map((comment, idx) => (
                                        <p key={idx} className="truncate">
                                            <span className="font-semibold">{comment.username}:</span>{" "}
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
