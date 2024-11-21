import { useState, useContext, useEffect } from "react";
import Footer from "../../Components/Footer";
import axios from "axios";
import { getUserLoginContext } from "../../context/getUserLoginContextProvider";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
    const [dataPostById, setDataPostById] = useState([]);
    const token = localStorage.getItem("access_token");
    const apiKey = localStorage.getItem("apiKey");
    const userId = localStorage.getItem("userId");

    // Ambil data user login dari context
    const { dataUserLogin } = useContext(getUserLoginContext);
    console.log("Ini data user", dataUserLogin);

    // Fungsi untuk mengambil postingan berdasarkan userId
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
                setDataPostById(res.data?.data?.posts);
            })
            .catch((err) => {
                console.error("Error fetching posts:", err);
                toast.error("Terjadi kesalahan saat mengambil postingan.");
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
        getPostById();
    }, []); // Memanggil fungsi untuk mendapatkan postingan hanya sekali saat komponen pertama kali dirender

    return (
        <>
            <div className="text-center text-2xl text-white bg-black">
                <h1>Profile</h1>
            </div>

            {/* Profile Section */}
            <div className="flex mt-2 gap-2">
                <div className="w-32 h-32 mx-2">
                    <img
                        src={dataUserLogin.profilePictureUrl}
                        alt="Profile"
                        className="rounded-full"
                    />
                </div>
                <div className="w-56">
                    <h1 className="p-1 text-3xl">{dataUserLogin.username}</h1>
                    <h1 className="p-1">{dataUserLogin.name}</h1>
                    <h2 className="p-1">{dataUserLogin.phoneNumber}</h2>
                    <h3 className="p-1">{dataUserLogin.bio}</h3>
                    <h3 className="p-1">{dataUserLogin.website}</h3>
                </div>
            </div>

            {/* Followers and Following Section */}
            <div className="flex gap-4 text-center justify-center pt-2">
                <Link to={"/follower"}>
                    <div className="bg-[#B9E5E8] border-black border-2 rounded-md w-44">
                        <h1>Followers</h1>
                        <p>{dataUserLogin.totalFollowers}</p>
                    </div>
                </Link>
                <Link to={"/following"}>
                    <div className="bg-[#B9E5E8] border-black border-2 rounded-md w-44">
                        <h1>Following</h1>
                        <p>{dataUserLogin.totalFollowing}</p>
                    </div>
                </Link>
            </div>

            {/* Posts Section */}
            <div className="grid grid-cols-2 gap-4 mt-4">
                {dataPostById.map((item, index) => (
                    <div key={index} className="m-2 p-2 border border-gray-300 rounded-md bg-[#FEF3E2]">
                        {/* Card Content */}
                        <Link to={`/detailpostbyid/${dataUserLogin.id}`}>
                        <img
                            src={item.imageUrl}
                            alt="Post"
                            className="w-full h-32 object-cover rounded-t-md"
                        />
                        </Link>
                        <div className="p-4 gap-2">
                            <p className="text-sm text-black">{item.user.username}</p>
                            <p className="text-sm">{item.caption}</p>

                            {/* Like Button */}
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

export default Profile;
