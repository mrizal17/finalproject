import axios from "axios";
import { useState } from "react"
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const GetFollowingById = () => {
    const {userId} = useParams();
    const [dataFollowingByid, setDataFollowingById] = useState([])
    const token = localStorage.getItem("access_token");
    const apiKey = localStorage.getItem("apiKey")

    const getDataFollowingById = () =>{
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
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(() => {
        getDataFollowingById()
    }, [])

    return (
        <>
        <h1>followingbyid</h1>
        </>
    )
}
export default GetFollowingById