import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";



const GetFollower = () => {
    const [dataFollower, setDataFollower] = useState([])
    const token = localStorage.getItem("access_token");
    const apiKey = localStorage.getItem("apiKey")

    const getDataFollower = () => {
        axios
            .get('https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/my-followers?size=10&page=1',
                {
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            .then((res) => {
                setDataFollower(res.data?.data?.users)
            })

    }
    useEffect(() => {
        getDataFollower()
    }, [])


console.log('ini data follower', dataFollower)


    return (
        
        <div className="bg-black text-white items-center text-center h-9 justify-center">
            <h1>
                Your Follower
            </h1>
            <div className="mt-4">
                {dataFollower.map((item, index) => (
                    <div key={index}>
                        <div className="flex w-20 gap-2 m-2 mt-4">
                            <Link to={`/detailuserbyid/${item.id}`}>
                            <img src={item.profilePictureUrl} alt="" className="w-16 rounded-full h-14" />
                            <h1 className="text-2xl text-black">
                                {item.username}
                            </h1>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    )
}
export default GetFollower