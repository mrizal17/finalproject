import { useContext, useState } from "react";
import Footer from "../../Components/Footer";
import axios from "axios";
import { getUserLoginContext } from "../../context/getUserLoginContextProvider";

const UpdateProfile = () => {
    const token = localStorage.getItem("access_token");
    const apiKey = localStorage.getItem("apiKey"); 
    const { dataUserLogin } = useContext(getUserLoginContext);

    console.log('ini data user yang login', dataUserLogin);

    const [formUpdateProfile, setFormUpdateProfile] = useState({
        name: dataUserLogin.name || "",
        username: dataUserLogin.username || "",
        email: dataUserLogin.email || "",
        profilePictureUrl: dataUserLogin.profilePictureUrl || "",
        phoneNumber: dataUserLogin.phoneNumber || "",
        bio: dataUserLogin.bio || "",
        website: dataUserLogin.website || "",
    });

    const [profileImage, setProfileImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    // Handle form field change
    const handleChangeForm = (e) => {
        setFormUpdateProfile({
            ...formUpdateProfile,
            [e.target.name]: e.target.value,
        });
    };

    // Handle image file change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    };

    // Function to upload profile picture and return the URL
    const uploadProfileImage = async () => {
        if (!profileImage) return ""; // Return empty if no image selected

        const formData = new FormData();
        formData.append("image", profileImage);

        try {
            const response = await axios.post(
                "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Image upload response:", response.data);
            if (response.data.url) {
                return response.data.url; // Extract the URL from the response
            } else {
                throw new Error("Image upload response did not contain a URL");
            }
        } catch (err) {
            console.error("Error uploading image:", err);
            return ""; // Return empty string if upload fails
        }
    };

    // Function to handle profile update
    const postDataUpdateProfile = async () => {
        setIsUploading(true);
        let uploadedImageUrl = "";

        // Upload the profile picture and get the URL if a new image is selected
        if (profileImage) {
            uploadedImageUrl = await uploadProfileImage();
            if (uploadedImageUrl) {
                // Set the uploaded image URL in the form state before updating
                setFormUpdateProfile((prevState) => ({
                    ...prevState,
                    profilePictureUrl: uploadedImageUrl,
                }));
            } else {
                console.error("Image upload failed, profile update aborted.");
                setIsUploading(false);
                return;
            }
        }

        // Send the updated profile data to the server
        try {
            console.log("Form data before sending:", formUpdateProfile);
            const response = await axios.post(
                "https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
                formUpdateProfile, // Data from form
                {
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Profile updated:", response.data);
            setIsUploading(false);
        } catch (err) {
            console.error("Error updating profile:", err);
            setIsUploading(false);
        }
    };

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    postDataUpdateProfile();
                }}
                className="max-w-md mx-auto bg-[#CBDCEB] flex flex-col items-center p-5"
            >
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
                    type="file"
                    className="border-2 w-full p-2"
                    onChange={handleImageChange}
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
                <button type="submit" className="bg-green-500 rounded-xl w-36 h-16 mb-10" disabled={isUploading}>
                    {isUploading ? "Saving..." : "Save"}
                </button>
            </form>
            <Footer />
        </div>
    );
};

export default UpdateProfile;
