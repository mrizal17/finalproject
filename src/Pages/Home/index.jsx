import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("access_token")
    useEffect(() => {
        if (token) {
          navigate("/userprofile");
        }
      }, []);
    return (
        <>
            <div className="text-center">
                <div className="bg-[#FEFAE0] w-auto h-16 flex justify-center items-center">
                    <img className="w-24 h-auto" src="/images/logo1.png" alt="Logo 1" />
                </div>
                <div className="flex justify-center">
                    <img className="w-auto h-auto" src="/images/nwlogo.jpg" alt="Logo NW" />
                </div>
                <Link to={"/login"}>
                <button className="bg-[#789DBC] hover:bg-[#FEFAE0] w-28 h-16 rounded-md m-5 text-black text-3xl items-center justify-center">Login</button>
                </Link>
                <div className="flex text-center justify-center gap-2">
                <p>Don't have an Account? Please</p>
                <Link to={"/register"}>
                <p className="hover:underline hover:text-lime-500">Register</p>
                </Link>
                </div>
            </div>
        </>
    );
}

export default Home;
