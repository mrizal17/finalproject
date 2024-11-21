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

    // Get Following Stories
    const getMyFollowingStories = () => {
        axios
            .get(
                "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/following-story?size=10&page=1",
                {
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                // Filter to get unique stories by user
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
            <div className="flex overflow-x-auto gap-5 p-4 bg-white border-b">
                {dataFollowingStories.map((item, index) => (
                    <Link
                        key={index}
                        to={`/detailstory/${item.id}`}
                        className="text-center"
                    >
                        <div className="relative group">
                            {/* Profile Picture */}
                            <img
                                className="w-16 h-16 rounded-full border-2 border-pink-500 object-cover transition-transform transform group-hover:scale-110"
                                src={
                                    item.user.profilePictureUrl ||
                                    "https://via.placeholder.com/150"
                                }
                                alt="Profile"
                            />
                        </div>
                        {/* Username */}
                        <p className="text-sm mt-2 truncate w-16">
                            {item.user.username}
                        </p>
                    </Link>
                ))}
            </div>

            {/* Posts Section */}
            <div className="bg-black pt-4 px-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {dataFollowingPost.map((item, index) => (
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
                                        alt="Post"
                                    />
                                    <img
                                        src={item?.user?.profilePictureUrl}
                                        alt="User"
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
                                            <span className="font-semibold">
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
