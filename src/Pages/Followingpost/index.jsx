import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import { SlLike } from "react-icons/sl";

const FollowingPost = () => {
    const [dataFollowingPost, setDataFollowingPost] = useState([]);
    const [dataFollowingStories, setDataFollowingStories] = useState([]);
    const token = localStorage.getItem("access_token");
    const apiKey = localStorage.getItem("apiKey");

    // Get Following Posts
    const getDataFollowingPost = () => {
        axios
            .get(
                "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/following-post?size=300&page=1",
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

    // Get Following Stories
    const getMyFollowingStories = () => {
        axios
            .get(
                "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/following-story?size=100&page=1",
                {
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                const uniqueStories = Array.from(
                    new Map(
                        res?.data?.data?.stories.map((item) => [item.user.id, item])
                    ).values()
                );
                setDataFollowingStories(uniqueStories);
            });
    };

    useEffect(() => {
        getMyFollowingStories();
        getDataFollowingPost();
    }, []);

    return (
        <div>
            {/* Story Section */}
            <div className="flex overflow-x-auto gap-5 py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md">
                {dataFollowingStories.map((item, index) => (
                    <Link
                        key={index}
                        to={`/detailstory/${item.id}`}
                        className="text-center"
                    >
                        <div className="relative group">
                            {/* Profile Picture */}
                            <img
                                className="w-16 h-16 rounded-full border-4 border-pink-400 object-cover transition-transform transform group-hover:scale-110"
                                src={
                                    item.user.profilePictureUrl ||
                                    "https://via.placeholder.com/150"
                                }
                                alt="Profile"
                            />
                            {/* Glow Effect */}
                            <div className="absolute inset-0 rounded-full bg-pink-400 opacity-0 group-hover:opacity-30 transition-opacity"></div>
                        </div>
                        {/* Username */}
                        <p className="text-sm mt-2 text-white truncate w-16">
                            {item.user.username}
                        </p>
                    </Link>
                ))}
            </div>

            {/* Posts Section */}
            <div className="bg-gradient-to-b from-gray-900 to-black pt-6 pb-10 px-6 min-h-screen">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {dataFollowingPost.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 overflow-hidden"
                        >
                            <Link to={`/detailpostbyid/${item?.id}`}>
                                {/* Post Image */}
                                <div className="relative">
                                    <img
                                        className="w-full h-40 object-cover"
                                        src={item.imageUrl}
                                        alt="Post"
                                    />
                                    <img
                                        src={item?.user?.profilePictureUrl}
                                        alt="User"
                                        className="absolute top-2 left-2 w-10 h-10 rounded-full border-2 border-white shadow-md hover:ring-2 hover:ring-pink-400"
                                    />
                                </div>
                            </Link>

                            {/* Post Info */}
                            <div className="p-4">
                                <h2 className="text-base font-semibold text-gray-800 truncate">
                                    {item?.user?.username}
                                </h2>
                                <p className="text-sm text-gray-600 truncate">
                                    {item?.caption}
                                </p>
                                {/* Like Section */}
                                <div className="flex items-center gap-2 mt-3 text-gray-700">
                                    <SlLike className="text-red-500 hover:scale-110 transition-transform" />
                                    <span>{item?.totalLikes} Likes</span>
                                </div>
                                {/* Comments Section */}
                                <div className="mt-2 text-sm text-gray-700">
                                    <h3 className="font-semibold">Comments:</h3>
                                    {item?.comments?.slice(0, 2).map((comment, idx) => (
                                        <p key={idx} className="truncate">
                                            <span className="font-semibold text-gray-800">
                                                {comment.username}:
                                            </span>{" "}
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

export default FollowingPost;
