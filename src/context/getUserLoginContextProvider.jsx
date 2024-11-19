import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const getUserLoginContext = createContext()

export const GetUserLoginContextProvider = ({ children }) => {
    const [dataUserLogin, setDataUserLogin] = useState ([])
    const token = localStorage.getItem("access_token");
    const apiKey = localStorage.getItem("apiKey")
    const handleGetUserLogin = () => {
        axios
            .get('https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/user',
                {
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then ((res)=>{
                setDataUserLogin(res?.data?.data)
            })
            .catch ((err) => {
                console.log(err)
            })
            
    }

    useEffect (()=>{
        handleGetUserLogin()
    },[])

    return (
        <getUserLoginContext.Provider value={{dataUserLogin}}>
            {children}
        </getUserLoginContext.Provider>
    )
}
