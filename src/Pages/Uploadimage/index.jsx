import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const apiKey = localStorage.getItem('apiKey'); // Ambil dari localStorage
    const token = localStorage.getItem('access_token'); // Ambil dari localStorage

    // Fungsi untuk menangani perubahan input file
    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // Ambil file gambar dari input
    };

    // Fungsi untuk mengupload gambar
    const handleUpload = async () => {
        if (!image) {
            alert('Please select an image first.');
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append('file', image); // Sesuaikan nama field dengan dokumentasi API

        try {
            // Kirim request ke API
            const response = await axios.post(
                'https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/upload-image', 
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Jika berhasil
            if (response.status === 200) {
                setImageUrl(response.data.url);
                alert('Upload successful!');
            } else {
                alert('Upload failed: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error uploading image:', error.response || error);
            alert('Upload failed: ' + (error.response?.data?.message || error.message || 'Please try again.'));
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-lg font-bold mb-4">Upload Image</h2>

            {/* Input file */}
            <input
                type="file"
                onChange={handleFileChange}
                className="block w-full mb-4 border p-2"
            />

            {/* Tombol Upload */}
            <button
                onClick={handleUpload}
                disabled={uploading}
                className={`px-4 py-2 rounded ${uploading ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
            >
                {uploading ? 'Uploading...' : 'Upload Image'}
            </button>

            {/* Jika berhasil upload */}
            {imageUrl && (
                <div className="mt-4">
                    <h3 className="text-green-500 font-bold">Image uploaded successfully!</h3>
                    <img src={imageUrl} alt="Uploaded" className="mt-2 w-full max-w-sm rounded" />
                    <p className="mt-2">Image URL: 
                        <a 
                            href={imageUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 underline"
                        >
                            {imageUrl}
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default UploadImage;
