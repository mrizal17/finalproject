import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () =>{
    const token = localStorage.getItem("access_token");
    const apiKey = localStorage.getItem("apiKey")
    const [dataLogout, setDataLogout] = useState([])
    const navigate = useNavigate
    

    const getLogout = () =>{
        axios
        .get("https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/logout",
            {
                headers: {
                    "Content-Type": "application/json",
                    apiKey: apiKey,
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        .then((res)=>{
            // Hapus token dan API key setelah logout
            localStorage.removeItem("access_token");
            localStorage.removeItem("apiKey");

            navigate("/login")
        })
        .catch((err)=>{
            console.error("Logout Gagal",err)
        })
    }
    console.log("ini data logout", dataLogout)
    useEffect (()=>{
        getCreatePost();
    },[])

    

    return (
        <div>
            ini logout
        </div>
    )
}
export default Logout