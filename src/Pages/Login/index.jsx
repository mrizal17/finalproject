import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

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
            toast.success("Login berhasil!");  // Success toast message
            setTimeout(() => {
                navigate("/userprofile");  // Navigate after a short delay to show the success toast
            }, 1000);  // You can adjust the delay duration as needed
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
        <div className="flex flex-col justify-center items-center gap-5">
            <div className="mt-9">
                <h1>LOGIN</h1>
            </div>
            <div className="bg-[#08C2FF] w-fit rounded-md flex flex-col justify-center items-center p-4">
                <div className="grid rounded-sm border-2 border-y-cyan-800 p-4 m-3 md:w-[500px]">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChangeForm}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="grid rounded-sm border-2 border-y-cyan-800 p-4 m-3 md:w-[500px]">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChangeForm}
                        className="border p-2 rounded w-full"
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div className="items-center text-center p-4">
                    <button onClick={handleLogin} className="bg-cyan-700 w-20 h-8 rounded">Login</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
