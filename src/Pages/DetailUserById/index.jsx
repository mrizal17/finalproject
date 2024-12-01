import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import { toast } from "react-toastify";
import usePhotoDefault from "../../hooks/usePhotoDefault";

const DetailUserById = () => {
    const { userId } = useParams();
    const token = localStorage.getItem("access_token");
    const apiKey = localStorage.getItem("apiKey");
    const [dataUserById, setDataUserById] = useState([]);
    const [dataPostById, setDataPostById] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const photodefault = usePhotoDefault ()

    const getDetailUserById = () => {
        axios
            .get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/user/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    apiKey: apiKey,
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setDataUserById(res?.data?.data);
                setIsFollowing(res?.data?.data.isFollowing || false);
            })
            .catch((err) => {
                console.error("Error fetching user details:", err.response?.data || err.message);
            });
    };

    const getPostById = () => {
        axios
            .get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/users-post/${userId}?size=10&page=1`, {
                headers: {
                    "Content-Type": "application/json",
                    apiKey: apiKey,
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setDataPostById(res?.data?.data?.posts);
            })
            .catch((err) => {
                console.error("Error fetching posts:", err.response?.data || err.message);
            });
    };

    const handleFollow = () => {
        axios
            .post(
                `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/follow`,
                { userIdFollow: userId },
                {
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                setIsFollowing(true);
                setDataUserById((prev) => ({
                    ...prev,
                    totalFollowers: prev.totalFollowers + 1,
                }));
            })
            .catch((err) => {
                console.error("Error following user:", err.response?.data || err.message);
            });
    };

    const handleUnfollow = () => {
        axios
            .delete(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/unfollow/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    apiKey: apiKey,
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                setIsFollowing(false);
                setDataUserById((prev) => ({
                    ...prev,
                    totalFollowers: prev.totalFollowers - 1,
                }));
            })
            .catch((err) => {
                console.error("Error unfollowing user:", err.response?.data || err.message);
            });
    };

    const handleLike = async (postId) => {
        if (!token) {
            toast.error("Harap login terlebih dahulu!");
            return;
        }

        try {
            const res = await axios.post(
                'https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/like',
                { postId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'apiKey': apiKey,
                    },
                }
            );

            if (res.status === 200) {
                toast.success("Like berhasil!");
                setDataPostById((prevPosts) =>
                    prevPosts.map((post) =>
                        post.id === postId
                            ? { ...post, totalLikes: post.totalLikes + 1 }
                            : post
                    )
                );
            } else {
                toast.error("Gagal memberi like.");
            }
        } catch (err) {
            console.error("Error giving like:", err);
            toast.error("Terjadi kesalahan saat memberi like.");
        }
    };

    useEffect(() => {
        getDetailUserById();
        getPostById();
    }, []);

    return (
        <>
            <div className="text-center text-3xl font-bold text-white bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 py-6 shadow-lg">
                <h1>Profile</h1>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center mt-8 gap-4">
                <img
                    src={dataUserById.profilePictureUrl}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-purple-400 shadow-md"
                />
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-800">{dataUserById.username}</h1>
                    <h2 className="text-gray-500">{dataUserById.name}</h2>
                    <p className="text-sm text-gray-600">{dataUserById.phoneNumber}</p>
                    <p className="text-sm text-gray-600 italic">{dataUserById.bio}</p>
                    <a
                        href={dataUserById.website}
                        className="text-blue-500 underline hover:text-blue-700 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {dataUserById.website}
                    </a>
                </div>
            </div>

            {/* Followers and Following Section */}
            <div className="flex justify-center gap-8 mt-6">
                <Link to={`/getfollowerbyid/${dataUserById.id}`}>
                    <div className="text-center bg-gradient-to-r from-blue-300 to-purple-300 text-white rounded-lg px-6 py-4 shadow-md hover:scale-105 transition transform duration-200">
                        <h1 className="text-lg font-bold">Followers</h1>
                        <p>{dataUserById.totalFollowers}</p>
                    </div>
                </Link>
                <Link to={`/getfollowingbyid/${dataUserById.id}`}>
                    <div className="text-center bg-gradient-to-r from-purple-300 to-pink-300 text-white rounded-lg px-6 py-4 shadow-md hover:scale-105 transition transform duration-200">
                        <h1 className="text-lg font-bold">Following</h1>
                        <p>{dataUserById.totalFollowing}</p>
                    </div>
                </Link>
            </div>

            {/* Follow/Unfollow Button */}
            <div className="flex justify-center mt-4">
                <button
                    className={`rounded-md w-96 h-14 mt-1 mb-1 md:w-[900px] lg:w-[2000px] ${isFollowing ? "bg-red-500 hover:bg-red-600" : "bg-lime-500 hover:bg-lime-600"
                        } text-white font-semibold shadow-lg transition transform duration-200`}
                    onClick={isFollowing ? handleUnfollow : handleFollow}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </button>
            </div>

            {/* Posts Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mx-6">
                {dataPostById.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-200">
                        <Link to={`/detailpostbyid/${item.id}`}>
                            <img
                                src={item.imageUrl || photodefault } onError={(e)=> {
                                    e.target.src = photodefault
                                }}
                                alt="Post"
                                className="w-full h-40 object-cover rounded-t-lg"
                            />
                        </Link>
                        <div className="p-4">
                            <p className="text-gray-700 font-semibold">{item.user.username}</p>
                            <p className="text-sm text-gray-600">{item.caption}</p>
                            <p className="text-xs text-gray-400">{new Date(item.updatedAt).toLocaleDateString()}</p>
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    onClick={() => handleLike(item.id)}
                                    className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                                >
                                    <AiOutlineLike /> <span>Like</span>
                                </button>
                                <span className="text-gray-600">{item.totalLikes} Likes</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </>
    );
};

export default DetailUserById;
