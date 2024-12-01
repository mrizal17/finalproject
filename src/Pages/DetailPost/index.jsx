import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { toast } from "react-toastify";
import Footer from "../../Components/Footer";
import usePhotoDefault from "../../hooks/usePhotoDefault";


const DetailPost = () => {
    const [dataDetailPost, setDataDetailPost] = useState([]);
    const [newComment, setNewComment] = useState("");
    const apiKey = localStorage.getItem("apiKey");
    const token = localStorage.getItem("access_token");
    const { postId } = useParams();
    const photodefault = usePhotoDefault()

    const getDetailPost = () => {
        axios
            .get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/post/${postId}`, {
                headers: {
                    "Content-Type": "application/json",
                    apiKey: apiKey,
                    Authorization: `Bearer ${token}`,
                },
            })
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
                setDataDetailPost((prev) => ({
                    ...prev,
                    totalLikes: prev.totalLikes + 1,
                }));
            } else {
                toast.error("Gagal memberi like.");
            }
        } catch (err) {
            console.error("Error giving like:", err);
            toast.error("Terjadi kesalahan saat memberi like.");
        }
    };

    const handleCreateComment = async () => {
        if (!newComment.trim()) {
            toast.error("Komentar tidak boleh kosong!");
            return;
        }

        if (!token) {
            toast.error("Harap login terlebih dahulu!");
            return;
        }

        try {
            const res = await axios.post(
                "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/create-comment",
                { postId, comment: newComment },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        apiKey: apiKey,
                    },
                }
            );

            if (res.status === 200) {
                toast.success("Komentar berhasil!");
                setDataDetailPost((prev) => ({
                    ...prev,
                    comments: [...prev.comments, res.data.data],
                }));
                setNewComment("");
            } else {
                toast.error("Gagal menambahkan komentar.");
            }
        } catch (err) {
            console.error("Error creating comment:", err);
            toast.error("Terjadi kesalahan saat menambahkan komentar.");
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!token) {
            toast.error("Harap login terlebih dahulu!");
            return;
        }

        try {
            const res = await axios.delete(
                `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/delete-comment/${commentId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        apiKey: apiKey,
                    },
                }
            );

            if (res.status === 200) {
                toast.success("Komentar berhasil dihapus!");
                setDataDetailPost((prev) => ({
                    ...prev,
                    comments: prev.comments.filter(
                        (comment) => comment.id !== commentId
                    ),
                }));
            } else {
                toast.error("Gagal menghapus komentar.");
            }
        } catch (err) {
            console.error("Error deleting comment:", err);
            toast.error("Terjadi kesalahan saat menghapus komentar.");
        }
    };

    useEffect(() => {
        getDetailPost();
    }, []);

    if (!dataDetailPost) return <div>Loading...</div>;

    console.log('ini data detailPOST COY', dataDetailPost)

    return (
        <div className="bg-gradient-to-b from-purple-400 to-pink-300 min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Post Image */}
                <div className="w-full">
                    <img
                        src={dataDetailPost.imageUrl || photodefault } onError={(e)=> {
                            e.target.src = photodefault
                        }}
                        alt="Post"
                        className="w-full h-auto object-contain"
                    />
                </div>

                {/* Post Details */}
                <div className="p-6">
                    <div className="flex items-center gap-4">
                        <Link to={`/detailuserbyid/${dataDetailPost?.user?.id}`}>
                            <img
                                src={dataDetailPost?.user?.profilePictureUrl}
                                alt="User Avatar"
                                className="w-16 h-16 rounded-full border-2 border-pink-400"
                            />
                        </Link>
                        <div>
                            <h1 className="text-lg font-bold text-gray-800">{dataDetailPost?.user?.username}</h1>
                            <p className="text-sm text-gray-500">{dataDetailPost?.createdAt}</p>
                        </div>
                    </div>

                    <p className="mt-4 text-gray-700">{dataDetailPost.caption}</p>

                    {/* Like Section */}
                    <div className="mt-6 flex items-center gap-4">
                        <button
                            onClick={handleLike}
                            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            <AiOutlineLike size={20} />
                            Like
                        </button>
                        <p className="text-gray-700">{dataDetailPost.totalLikes} Likes</p>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-800">Comments</h2>
                        <div className="mt-4 space-y-4">
                            {dataDetailPost?.comments?.map((comment, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-4 bg-gray-100 rounded-lg shadow-sm"
                                >
                                    <img
                                        src={comment?.user?.profilePictureUrl}
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full border border-gray-300"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            {comment?.user?.username}
                                        </h3>
                                        <p className="text-gray-600">{comment?.comment}</p>
                                    </div>
                                    {comment?.user?.id === dataDetailPost?.user?.id && (
                                        <button
                                            onClick={() => handleDeleteComment(comment.id)}
                                            className="ml-auto text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Add New Comment */}
                    <div className="mt-6">
                        <textarea
                            className="w-full p-3 border rounded-md"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button
                            onClick={handleCreateComment}
                            className="mt-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
                        >
                            Post Comment
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DetailPost;
