import { useEffect, useState } from "react"
import Footer from "../../Components/Footer";
import axios from "axios";

const UpdateProfile = () => {
    const [dataUpdateProfile, setDataUpdateProfile]=useState ([])
    const token = localStorage.getItem("access_token");
    const apiKey = localStorage.getItem("apiKey")
    const [formUpdateProfile, setFormUpdateProfile] = useState({
        name:"",
        username:"",
        email:"",
        profilePictureUrl:"",
        phonephoneNumber:"",
        bio:"",
        website:""
    })

    const handleChangeForm = (e)=>{
        setFormUpdateProfile({
            ...formUpdateProfile,
            [e.target.name]: e.target.value
        })
    }

    const postDataUpdateProfile = () => {
        axios
        .post('https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/update-profile',
            {
                headers: {
                    "Content-Type": "application/json",
                    apiKey: apiKey,
                    Authorization: `Bearer ${token}`,
                }
            }    
        )
        .then ((res)=>{
            console.log(res)
        })
    }
    console.log('ini data update', dataUpdateProfile)
    useEffect(()=>{
        getDataUpdateProfile()
    },[])






    return (
        <div>
        <form className="max-w-md mx-auto bg-[#CBDCEB] flex flex-col items-center p-5">
            <h1>Update User</h1>

            {/* Name */}
            <div className="m-2 p-2 w-full">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        className="border-2 w-full p-2"
                        placeholder="Your Name"
                        name="name"
                    />
                </div>
            </div>

            {/* username */}
            <div className="m-2 p-2 w-full">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        className="border-2 w-full p-2"
                        placeholder="Your Username"
                        name="name"
                    />
                </div>
            </div>
            <div className="m-2 p-2 w-full">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        className="border-2 w-full p-2"
                        placeholder="Email"
                        name="name"
                    />
                </div>
            </div>

             {/* Profile Picture */}
             <div className="relative z-0 w-full mb-5 group">
                <h1>Your Profile Picture</h1>
                <input
                    type="file"
                    className="border-2 w-full p-2"
                />
            </div>

            {/* Phone Number */}
            <div className="m-2 p-2 w-full">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        className="border-2 w-full p-2"
                        placeholder="Your Phone Number"
                        name="phoneNumber"
                        
                    />
                </div>
            </div>

            {/* Bio */}
            <div className="m-2 p-2 w-full">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        className="border-2 w-full p-2"
                        placeholder="Your Bio"
                        name="bio"
                       
                    />
                </div>
            </div>

            {/* Website */}
            <div className="m-2 p-2 w-full">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        className="border-2 w-full p-2"
                        placeholder="Your Website"
                        name="website"
                        
                    />
                </div>
            </div>
            <button className="bg-green-500 rounded-xl w-36 h-16 mb-10">Save</button>
        </form>
        <Footer />
        </div>
        
    )
}
export default UpdateProfile