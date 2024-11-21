import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

const GetFollowerById = () => {
    const {userId} = useParams();
    const [dataFollowerById, setDataFollowerByid] = useState([])
    const token = localStorage.getItem("access_token");
    const apiKey = localStorage.getItem("apiKey")

    const getDataFollowerById = () => {
        axios
        .get(`https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/followers/${userId}?size=10&page=1`,
            {
                headers: {
                    "Content-Type": "application/json",
                    apiKey: apiKey,
                    Authorization: `Bearer ${token}`,
                }  
            }
        )
        .then((res) => {
            console.log(res)
        })
    }
    useEffect(()=>{
        getDataFollowerById()
    },[])



    return (
        <div>
           
        </div>
    )
}
export default GetFollowerById