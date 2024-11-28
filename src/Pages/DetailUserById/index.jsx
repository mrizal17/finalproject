import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";

const DetailUserById = () => {
    const { userId } = useParams();
    const token = localStorage.getItem("access_token");
    const apiKey = localStorage.getItem("apiKey");
    const [dataUserById, setDataUserById] = useState([]);
    const [dataPostById, setDataPostById] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);

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
                { userIdFollow: userId }, // Sesuaikan dengan requirement API
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

    // Fungsi untuk memberikan like pada postingan
    const handleLike = async (postId) => {
        if (!token) {
            toast.error("Harap login terlebih dahulu!");
            return;
        }

        try {
            // Kirim permintaan LIKE ke API
            const res = await axios.post(
                'https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/like',
                { postId }, // Mengirimkan ID postingan
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
                // Memperbarui jumlah like secara lokal
                setDataPostById((prevPosts) =>
                    prevPosts.map((post) =>
                        post.id === postId
                            ? { ...post, totalLikes: post.totalLikes + 1 } // Update jumlah like
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
            <div className="text-center text-2xl text-white bg-black">
                <h1>Profile</h1>
            </div>
            <div className="flex mt-2 gap-2">
                <div className="w-32 h-32 mx-2">
                    <img
                        src={dataUserById.profilePictureUrl}
                        alt=""
                        className="rounded-full w-32 h-32 object-cover" />
                </div>
                <div className="w-56">
                    <h1 className="p-1 text-3xl">{dataUserById.username}</h1>
                    <h1 className="p-1">{dataUserById.name}</h1>
                    <h2 className="p-1">{dataUserById.phoneNumber}</h2>
                    <h3 className="p-1">{dataUserById.bio}</h3>
                    <h3 className="p-1">{dataUserById.website}</h3>
                </div>
            </div>
            <div className="flex gap-4 text-center justify-center pt-2">
                <Link to={`/getfollowerbyid/${dataUserById.id}`}>
                    <div className="bg-[#B9E5E8] border-black border-2 rounded-md w-44">
                        <h1>Followers</h1>
                        <p>{dataUserById.totalFollowers}</p>
                    </div>
                </Link>
                <Link to={`/getfollowingbyid/${dataUserById.id}`}>
                    <div className="bg-[#B9E5E8] border-black border-2 rounded-md w-44">
                        <h1>Following</h1>
                        <p>{dataUserById.totalFollowing}</p>
                    </div>
                </Link>
            </div>
            <div className="flex justify-center">
                <button
                    className={`rounded-md w-96 h-14 mt-1 mb-1 md:w-[900px] lg:w-[2000px] ${isFollowing ? "bg-red-500" : "bg-lime-500"
                        }`}
                    onClick={isFollowing ? handleUnfollow : handleFollow}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </button>
            </div>


            <div className="grid grid-cols-2 gap-1">
                {dataPostById.map((item, index) => (
                    <div key={index} className="m-2 p-2 border border-gray-300 rounded-md bg-[#FEF3E2]">
                        <Link to={`/detailpostbyid/${item.id}`}>
                            <img src={item.imageUrl} 
                            className="w-full h-32 object-cover rounded-t-md" />
                        </Link>
                        <div className="p-4 gap-2">
                        <p className="text-sm text-black">{item.user.username}</p>
                            <p className="text-sm">{item.caption}</p>
                            <p>{item.updatedAt}</p>

                            {/* Like */}
                            <div className="flex gap-2 items-center mt-4">
                            <button
                                    onClick={() => handleLike(item.id)}
                                    className="bg-[#133E87] text-white px-3 rounded-md"
                                >
                                    <AiOutlineLike /> Like
                                </button>
                                <span>{item.totalLikes} Likes</span>   
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
