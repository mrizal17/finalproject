import axios from "axios";
import { useState } from "react"
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../../Components/Footer";


const GetFollowingById = () => {
    const { userId } = useParams();
    const [dataFollowingByid, setDataFollowingById] = useState([])
    const token = localStorage.getItem("access_token");
    const apiKey = localStorage.getItem("apiKey")

    const getDataFollowingById = () => {
        axios
            .get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/following/${userId}?size=10&page=1`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            .then((res) => {
                console.log('ini FOLLOWING BY ID', res)
                setDataFollowingById(res?.data?.data?.users)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getDataFollowingById()
    }, [])

    return (
        <div className="bg-black text-white items-center text-center h-9 justify-center">
            <h1>Your Following</h1>
            <div className="mt-4">
                
                {dataFollowingByid.map((item, index)=>(
                    <div key={index}>
                            <Link to={`/detailuserbyid/${item.id}`}>
                        <div className="flex w-20 gap-2 m-2 mt-4">
                        <img src={item.profilePictureUrl} alt="" className="w-16 rounded-full h-14" />
                        <h1 className="text-2xl text-black">
                            {item.username} 
                        </h1>
                        </div>
                            </Link>
                        <Footer />
                    </div>
                ))}

            </div>
        </div>

    )
}
export default GetFollowingById