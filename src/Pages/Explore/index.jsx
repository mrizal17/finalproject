import { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import { SlLike } from "react-icons/sl";
import axios from "axios";

const Explore = () => {
    const [dataExplore, setDataExplore] = useState([]);
    const token = localStorage.getItem("access_token");
    const apiKey = localStorage.getItem("apiKey");

    const getDataExplore = () => {
        axios
        .get('https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/explore-post?size=300&page=1',
            {
                headers: {
                    "Content-Type": "application/json",
                    apiKey: apiKey,
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((res) => {
            setDataExplore(res.data.data.posts);
        });
    };

    console.log('ini data explore', dataExplore);

    useEffect(() => {
        getDataExplore();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="border border-black flex gap-8 flex-cols flex-wrap m-2 bg-black mt-20">
                {dataExplore.map((item, index) => (
                    <div key={index} className="border border-black w-40 h-44 bg-[#FEF3E2] rounded-xl">
                        <img 
                            className="w-full h-full object-cover rounded-xl" 
                            src={item.imageUrl} 
                            alt="" 
                        />
                    </div>
                ))}
                
                <div>
                    <SlLike />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Explore;
