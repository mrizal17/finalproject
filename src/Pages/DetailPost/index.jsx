import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { toast } from "react-toastify";
import Footer from "../../Components/Footer";

const DetailPost = () => {
    const [dataDetailPost, setDataDetailPost] = useState(null);
    const apiKey = localStorage.getItem("apiKey");
    const token = localStorage.getItem("access_token");
    const { postId } = useParams();

    const getDetailPost = () => {
        axios
            .get(
                `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/post/${postId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                setDataDetailPost(res?.data?.data);
            })
            .catch((err) => {
                console.error("Error fetching post details:", err);
            });
    };

    const handleLike = async () => {
        if (!token) {
            toast.error("Harap login terlebih dahulu!");
            return;
        }

        try {
            // Kirim permintaan LIKE ke API
            const res = await axios.post(
                "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/like",
                { postId },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        apiKey: apiKey,
                    },
                }
            );

            if (res.status === 200) {
                toast.success("Like berhasil!");
                // Memperbarui jumlah like secara lokal
                setDataDetailPost((prev) => ({
                    ...prev,
                    totalLikes: prev.totalLikes + 1, // Update jumlah like
                }));
            } else {
                toast.error("Gagal memberi like.");
            }
        } catch (err) {
            console.error("Error giving like:", err);
            toast.error("Terjadi kesalahan saat memberi like.");
        }
    };

    useEffect(() => {
        getDetailPost();
    }, []);

    if (!dataDetailPost) return <div>Loading...</div>;

    return (
        <div className="flex justify-center items-center py-10 px-4 md:px-10">
            <div className="bg-white shadow-md rounded-lg max-w-lg w-full md:max-w-2xl">
                {/* Post Image */}
                <img
                    src={dataDetailPost.imageUrl}
                    alt="Post"
                    className="rounded-t-lg w-full h-60 object-cover md:h-96"
                />

                {/* Post Details */}
                <div className="p-4 md:flex md:flex-col md:gap-6">
                    <div className="flex items-center gap-4 mb-4">
                        <img
                            src={dataDetailPost?.user?.profilePictureUrl}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full border border-gray-300 md:w-16 md:h-16"
                        />
                        <div>
                            <h1 className="font-semibold text-lg md:text-xl">
                                {dataDetailPost?.user?.username}
                            </h1>
                            <p className="text-gray-500 text-sm md:text-base">
                                {dataDetailPost?.createdAt}
                            </p>
                        </div>
                    </div>

                    <h1 className="text-gray-800 mb-4 md:text-lg">{dataDetailPost.caption}</h1>

                    {/* Like Section */}
                    <div className="flex items-center gap-2 mb-4 md:gap-4">
                        <button
                            onClick={handleLike}
                            className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
                        >
                            <AiOutlineLike size={20} />
                            <span className="text-sm md:text-base">Like</span>
                        </button>
                        <p className="text-sm md:text-base">{dataDetailPost.totalLikes} Likes</p>
                    </div>

                    {/* Comments Section */}
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-2 md:text-lg">
                            Comments
                        </h2>
                        <div className="space-y-2 md:space-y-4">
                            {dataDetailPost?.comments?.map((comment, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 bg-gray-100 p-2 rounded-md md:gap-4 md:p-4"
                                >
                                    <img
                                        src={comment?.user?.profilePictureUrl}
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full border md:w-10 md:h-10"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-sm md:text-base">
                                            {comment?.user?.username}
                                        </h3>
                                        <p className="text-sm text-gray-700 md:text-base">
                                            {comment?.comment}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DetailPost;
