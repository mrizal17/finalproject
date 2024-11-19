import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";


const GetFollowing = () => {
    const [dataFollowing, setDataFollowing] = useState([])
    const token = localStorage.getItem("access_token");
    const apiKey = localStorage.getItem("apiKey")

    const getDataFollowing = () => {
        axios
            .get('https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/my-following?size=10&page=1',
                {
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            .then((res) => {
                setDataFollowing(res.data?.data?.users)

            })
    }
    console.log('ini data following', dataFollowing)
    useEffect(() => {
        getDataFollowing()
    }, [])






    return (
        <div className="bg-black text-white items-center text-center h-9 justify-center">
            <h1>
                Followed By You
            </h1>
            <div className="mt-4">
                {dataFollowing.map((item, index)=>(
                    <div key={index}>

                        <div className="flex w-20 gap-2 m-2">
                            <Link to={`/detailuserbyid/${item.id}`}>
                        <img src={item.profilePictureUrl} alt="" className="w-16 h-12 rounded-full"/>
                        <h1 className="text-2xl text-black">{item.username}
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
export default GetFollowing