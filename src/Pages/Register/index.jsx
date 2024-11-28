import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [error, setError] = useState("");
    const apiKey = import.meta.env.VITE_API_KEY;
    console.log("API Key:", apiKey);

    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        passwordRepeat: "",
        profilePictureUrl: "https://photo-sharing-api-bootcamp.do.dibimbing.id/images/1731636825081-nophoto2.png",
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

        if (!form.email || !form.password) {
            setError("Email dan Password Tidak Boleh Kosong");
            return;
        }

        if (form.password !== form.passwordRepeat) {
            setError("Password dan Konfirmasi Password Tidak Cocok");
            return;
        }

        setError("");

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("username", form.username);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("passwordRepeat", form.passwordRepeat);
        formData.append("profilePictureUrl", form.profilePictureUrl);
        formData.append("phoneNumber", form.phoneNumber);
        formData.append("bio", form.bio);
        formData.append("website", form.website);

        try {
            const response = await axios.post(
                'https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/register',
                formData,
                {
                    headers: {
                        apiKey: apiKey,
                    }
                }
            );

            console.log(response);
            setError("");
            navigate("/login");
        } catch (err) {
            console.log(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Pendaftaran Gagal! Silahkan Coba Kembali!");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <form
                className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Create Your Account
                </h1>

                <div className="space-y-4">
                    {/* Input Fields */}
                    {[
                        { name: "name", type: "text", placeholder: "Your Name" },
                        { name: "username", type: "text", placeholder: "Your Username" },
                        { name: "email", type: "email", placeholder: "Your Email" },
                        { name: "password", type: "password", placeholder: "Your Password" },
                        { name: "passwordRepeat", type: "password", placeholder: "Confirm Your Password" },
                        { name: "phoneNumber", type: "text", placeholder: "Your Phone Number" },
                        { name: "bio", type: "text", placeholder: "Your Bio" },
                        { name: "website", type: "text", placeholder: "Your Website" },
                    ].map((field) => (
                        <div key={field.name}>
                            <input
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={form[field.name]}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                        </div>
                    ))}
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                >
                    Register
                </button>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Already have an account?{" "}
                    <span
                        className="text-blue-500 font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Log In
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Register;
