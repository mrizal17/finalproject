import { useState } from "react";  // Pastikan import useState
import { MdOutlineTravelExplore } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CgAdd } from "react-icons/cg";
// import { FaUserEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Footer = () => {
    const navigate = useNavigate()
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const apiKey = localStorage.getItem("apiKey")
    const token = localStorage.getItem("access_token");

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const handleLogout = () => {
        axios
            .get('https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/logout',
                {
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            .then((res)=> {
                localStorage.removeItem("access_token");
            localStorage.removeItem("apiKey");
            localStorage.removeItem("imageprofile")
            localStorage.removeItem("name")
            localStorage.removeItem("userId")
            localStorage.removeItem("username")

            navigate("/")
            })
            .catch((err)=>{
                console.error("Logout Gagal",err)
            })
    }

    return (
        <footer className="items-center">
            <div className="fixed bottom-0 left-0 right-0 bg-black text-white z-10 h-14 flex items-center justify-center">
                <div className="text-2xl flex gap-12">
                    <Link to={"/explore"}>
                        <MdOutlineTravelExplore />
                    </Link>
                    <Link to={"/followingpost"}>
                        <IoMdHome />
                    </Link>
                    <Link to={"/uploadimage"}>
                    <CgAdd />
                    </Link>
                    <Link to={"/userprofile"}>
                        <CgProfile />
                    </Link>

                
                    {/* <div className="">
                        <FaUserEdit onClick={toggleProfileMenu} />
                        {isProfileMenuOpen && (
                            <div className="  rounded-md shadow-lg">
                                <div className="absolute bottom-12 left-0 mb-2 w-full bg-orange-300 text-black">
                                <p onClick={handleLogout} className="px-4 py-2 hover:bg-gray-200">
                                    Logout
                                </p>
                                <p className="px-4 py-2 hover:bg-gray-200">
                                    <Link to={"/updateprofile"}>Update Profile</Link>
                                </p>

                                </div>
                            </div>
                        )}
                    </div> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
