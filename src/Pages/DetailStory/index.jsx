import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import CSS untuk toast

const DetailStory = () => {
  const { storyId } = useParams();
  const apiKey = localStorage.getItem("apiKey");
  const token = localStorage.getItem("access_token");
  const [dataStoryById, setDataStoryById] = useState(null);
  const [isStoryVisible, setIsStoryVisible] = useState(true); // Untuk mengontrol apakah story masih terlihat

  // Fungsi untuk mengambil data story berdasarkan ID
  const handleStoryById = () => {
    axios
      .get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/story/${storyId}`, {
        headers: {
          "Content-Type": "application/json",
          apiKey: apiKey,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataStoryById(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching story:", error);
      });
  };

  useEffect(() => {
    // Ambil data story saat komponen pertama kali dimuat
    handleStoryById();

    // Menunggu 10 detik sebelum menyembunyikan story
    const timer = setTimeout(() => {
      setIsStoryVisible(false); // Story menghilang setelah 10 detik
      toast("Story has ended!"); // Menampilkan toast notification setelah story selesai
    }, 10000); // 10000 ms = 10 detik

    // Membersihkan timer jika komponen di-unmount
    return () => clearTimeout(timer);
  }, [storyId]); // Pastikan ini hanya dijalankan sekali setelah pertama kali render

  // Jika data story belum tersedia, tampilkan loading atau placeholder
  if (!dataStoryById) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Detail Story Page</h1>

      {/* Menampilkan story hanya jika `isStoryVisible` bernilai true */}
      {isStoryVisible ? (
        <img src={dataStoryById.imageUrl} alt="Story" />
      ) : (
        <p>Story has disappeared!</p> // Pesan setelah story menghilang
      )}

      {/* Tempat untuk menampilkan toast notification */}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default DetailStory;
