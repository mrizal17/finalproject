import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [error, setError] = useState("");
    const apiKey = import.meta.env.VITE_API_KEY; // Ambil API key dari .env
    console.log("API Key:", apiKey); // Debug untuk memastikan API key sudah terbaca dengan benar

    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        passwordRepeat: "",
        profilePictureUrl: "https://photo-sharing-api-bootcamp.do.dibimbing.id/images/1731636825081-nophoto2.png", // Link gambar profil default
        phoneNumber: "",
        bio: "",
        website: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi form
        if (!form.email || !form.password) {
            setError("Email dan Password Tidak Boleh Kosong");
            return;
        }

        if (form.password !== form.passwordRepeat) {
            setError("Password dan Konfirmasi Password Tidak Cocok");
            return;
        }

        setError(""); // Reset error message jika validasi berhasil

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("username", form.username);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("passwordRepeat", form.passwordRepeat);
        formData.append("profilePictureUrl", form.profilePictureUrl); // Tetap pakai URL default untuk profile picture
        formData.append("phoneNumber", form.phoneNumber);
        formData.append("bio", form.bio);
        formData.append("website", form.website);

        // Kirim permintaan registrasi
        try {
            const response = await axios.post(
                'https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/register',
                formData,
                {
                    headers: {
                        apiKey: apiKey, // Format header yang benar untuk API key
                    }
                }
            );

            console.log(response); // Debug untuk melihat respon dari API
            setError(""); // Reset error jika registrasi berhasil
            navigate("/login"); // Redirect ke halaman login setelah registrasi berhasil
        } catch (err) {
            console.log(err);
            // Jika ada pesan kesalahan dari API, tampilkan pesan tersebut
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message); 
            } else {
                setError("Pendaftaran Gagal! Silahkan Coba Kembali!");
            }
        }
    };

    return (
        <form
            className="max-w-md mx-auto bg-[#CBDCEB] flex flex-col items-center p-5"
            onSubmit={handleSubmit}
        >
            <h1 className="mb-5">Please Register Your Account!</h1>

            {/* Nama */}
            <div className="m-2 p-2 w-full">
                <input
                    type="text"
                    className="border-2 w-full p-2"
                    placeholder="Your Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
            </div>

            {/* Username */}
            <div className="m-2 p-2 w-full">
                <input
                    type="text"
                    className="border-2 w-full p-2"
                    placeholder="Your Username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                />
            </div>

            {/* Email */}
            <div className="m-2 p-2 w-full">
                <input
                    type="email"
                    className="border-2 w-full p-2"
                    placeholder="Your Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
            </div>

            {/* Password */}
            <div className="m-2 p-2 w-full">
                <input
                    type="password"
                    className="border-2 w-full p-2"
                    placeholder="Your Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
            </div>

            {/* Konfirmasi Password */}
            <div className="m-2 p-2 w-full">
                <input
                    type="password"
                    className="border-2 w-full p-2"
                    placeholder="Confirm Your Password"
                    name="passwordRepeat"
                    value={form.passwordRepeat}
                    onChange={handleChange}
                />
            </div>

            {/* Profile Picture (tidak perlu diubah, tetap menggunakan URL default) */}
            {/* Komentar bagian ini jika tidak perlu ada input untuk foto profil */}
            {/* <div className="m-2 p-2 w-full">
                <input
                    type="file"
                    className="border-2 w-full p-2"
                    onChange={handleFileChange}
                />
            </div> */}

            {/* Nomor Telepon */}
            <div className="m-2 p-2 w-full">
                <input
                    type="text"
                    className="border-2 w-full p-2"
                    placeholder="Your Phone Number"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                />
            </div>

            {/* Bio */}
            <div className="m-2 p-2 w-full">
                <input
                    type="text"
                    className="border-2 w-full p-2"
                    placeholder="Your Bio"
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                />
            </div>

            {/* Website */}
            <div className="m-2 p-2 w-full">
                <input
                    type="text"
                    className="border-2 w-full p-2"
                    placeholder="Your Website"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                />
            </div>

            {/* Pesan Error */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Tombol Submit */}
            <button type="submit" className="bg-[#88C273] rounded-md w-24 p-2">
                Submit
            </button>
        </form>
    );
};

export default Register;
