import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { Link } from "react-router-dom";

const DetailUserById = () => {
    const { userId } = useParams();
    const token = localStorage.getItem("access_token");
    const apiKey = localStorage.getItem("apiKey")
    const [dataUserById, setDataUserById] = useState([])
    const [dataPostById, setDataPostById] = useState([])

    const getDetailUserById = () => {
        axios
            .get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/user/${userId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            .then((res) => {

                setDataUserById(res?.data?.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const getPostById = () => {
        axios
            .get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/users-post/${userId}?size=10&page=1`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            .then((res) => {

                setDataPostById(res?.data?.data?.posts)
            })
    }

    useEffect(() => {
        getDetailUserById()
        getPostById()
    }, [])

    console.log('INI BARU', dataUserById)
    console.log('DATA POST BY ID', dataPostById)

    return (
        <>
            <div className="text-center text-2xl text-white bg-black">
                <h1>Profile</h1>
            </div>
            <div className="flex mt-2 gap-2">
                <div className="">
                    <img src={dataUserById.profilePictureUrl} alt="" className="rounded-full w-32 h-32 object-cover" />
                </div>
                <div className="w-32 h-32 mx-2">
                    <h1 className="p-1 text-3xl">{dataUserById.username}</h1>
                    <h1 className="p-1">{dataUserById.name}</h1>
                    <h2 className="p-1">{dataUserById.phoneNumber}</h2>
                    <h3 className="p-1">{dataUserById.bio}</h3>
                    <h3 className="p-1">{dataUserById.website}</h3>
                </div>
            </div>
            <div className="flex gap-4 text-center justify-center pt-2">
                <Link to={"/follower"}>
                <div className="bg-[#B9E5E8] border-black border-2 rounded-md w-44">
                    <h1>Followers</h1>
                    <p>{dataUserById.totalFollowers}</p>
                </div>
                </Link>
                    <Link to={"/following"}>
                <div className="bg-[#B9E5E8] border-black border-2 rounded-md w-44">
                    <h1>Following</h1>
                    <p>{dataUserById.totalFollowing}</p>
                </div>
                    </Link>
            </div>

            <div className="grid grid-cols-3 gap-1">
                {dataPostById.map((item, index) => (
                    <div key={index}>
                        <div className>
                            <img src={item.imageUrl} className="w-40 h-40 rounded-md" />
                        </div>
                    </div>
                ))}

            </div >

        </>
    )

}
export default DetailUserById