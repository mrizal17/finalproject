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
            .post(
                'https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/update-profile',
                formUpdateProfile, // Data dari form
                {
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            .then((res) => {
                console.log('Profile updated:', res.data);
            })
            .catch((err) => {
                console.error('Error updating profile:', err);
            });
    };
    
    return (
        <form onSubmit={(e) => { e.preventDefault(); postDataUpdateProfile(); }} className="max-w-md mx-auto bg-[#CBDCEB] flex flex-col items-center p-5">
            <h1>Update User</h1>
            <input
                type="text"
                className="border-2 w-full p-2"
                placeholder="Your Name"
                name="name"
                value={formUpdateProfile.name}
                onChange={handleChangeForm}
            />
            <input
                type="text"
                className="border-2 w-full p-2"
                placeholder="Your Username"
                name="username"
                value={formUpdateProfile.username}
                onChange={handleChangeForm}
            />
            <input
                type="text"
                className="border-2 w-full p-2"
                placeholder="Email"
                name="email"
                value={formUpdateProfile.email}
                onChange={handleChangeForm}
            />
            <input
                type="url"
                className="border-2 w-full p-2"
                placeholder="Profile Picture URL"
                name="profilePictureUrl"
                value={formUpdateProfile.profilePictureUrl}
                onChange={handleChangeForm}
            />
            <input
                type="text"
                className="border-2 w-full p-2"
                placeholder="Your Phone Number"
                name="phoneNumber"
                value={formUpdateProfile.phoneNumber}
                onChange={handleChangeForm}
            />
            <input
                type="text"
                className="border-2 w-full p-2"
                placeholder="Your Bio"
                name="bio"
                value={formUpdateProfile.bio}
                onChange={handleChangeForm}
            />
            <input
                type="text"
                className="border-2 w-full p-2"
                placeholder="Your Website"
                name="website"
                value={formUpdateProfile.website}
                onChange={handleChangeForm}
            />
            <button type="submit" className="bg-green-500 rounded-xl w-36 h-16 mb-10">Save</button>
        </form>
    );
}    
export default UpdateProfile