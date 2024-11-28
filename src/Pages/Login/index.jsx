import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [formLogin, setFormLogin] = useState({
        email: "",
        password: ""
    });

    const handleChangeForm = (e) => {
        setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async () => {
        const apiKey = import.meta.env.VITE_API_KEY;
        console.log("API Key:", apiKey);
        if (!formLogin.email || !formLogin.password) {
            setError("Email dan Password Harus diisi!!");
            toast.error("Email dan Password Harus diisi!!"); 
            return;
        }

        try {
            const res = await axios.post('https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/login', formLogin, {
                headers: {
                    'Content-Type': 'application/json',
                    'apiKey': apiKey
                }
            });
            const token = res.data.token;
            localStorage.setItem("access_token", token);
            localStorage.setItem("apiKey", apiKey);
            localStorage.setItem("imageprofile", res.data.user.profilePictureUrl);
            localStorage.setItem("username", res.data.user.username);
            localStorage.setItem("name", res.data.user.name);
            localStorage.setItem("userId", res.data.user.id);
            console.log('User data:', res.data.user);

            setError("");
            toast.success("Login berhasil!");
            setTimeout(() => {
                navigate("/userprofile");
            }, 1000);
        } catch (err) {
            console.log("Error:", err);
            if (err.response && err.response.data) {
                setError(err.response.data.error || "Email dan Password Salah!");
                toast.error(err.response.data.error || "Email dan Password Salah!");
            } else {
                setError("Terjadi kesalahan saat login.");
                toast.error("Terjadi kesalahan saat login.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Welcome Back!
                </h1>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChangeForm}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChangeForm}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
                >
                    Login
                </button>
                <p className="mt-4 text-sm text-center text-gray-500">
                    Don’t have an account?{" "}
                    <Link to={"/register"}>
                    <span className="text-blue-500 font-semibold cursor-pointer hover:underline">
                        Sign Up
                    </span>
                    </Link>
                </p>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;
