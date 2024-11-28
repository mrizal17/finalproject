import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../../Components/Footer';

const UploadImageAndCreatePost = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState('');
    const apiKey = localStorage.getItem('apiKey'); // Ambil dari localStorage
    const token = localStorage.getItem('access_token'); // Ambil dari localStorage

    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // Simpan file yang dipilih ke state
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value); // Simpan caption ke state
    };

    const handleUpload = async () => {
        if (!image) {
            alert('Please select an image first.');
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append('image', image); // Pastikan field 'image' sesuai dengan API

        try {
            const response = await axios.post(
                'https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/upload-image',
                formData,
                {
                    headers: {
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                const uploadedImageUrl = response.data.url; // Ambil URL dari respons API
                setImageUrl(uploadedImageUrl); // Simpan URL gambar ke state
                alert('Image uploaded successfully!');
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

    const handleCreatePost = async () => {
        if (!imageUrl || !caption) {
            alert('Please upload an image and provide a caption.');
            return;
        }

        try {
            const response = await axios.post(
                'https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/create-post',
                {
                    imageUrl: imageUrl,
                    caption: caption,
                },
                {
                    headers: {
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                alert('Post created successfully!');
                setImage(null);
                setCaption('');
                setImageUrl('');
            } else {
                alert('Failed to create post: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error creating post:', error.response || error);
            alert('Failed to create post: ' + (error.response?.data?.message || error.message || 'Please try again.'));
        }
    };

    return (
        <div
            className="max-w-md mx-auto p-4 overflow-y-auto"
            style={{ maxHeight: '100vh', paddingBottom: '100px' }}
        >
            <h2 className="text-lg font-bold mb-4">Upload Image and Create Post</h2>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full mb-4 border p-2"
            />

            <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={handleCaptionChange}
                className="block w-full mb-4 border p-2"
            ></textarea>

            <button
                onClick={handleUpload}
                disabled={uploading}
                className={`px-4 py-2 rounded ${uploading ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
            >
                {uploading ? 'Uploading...' : 'Upload Image'}
            </button>

            {imageUrl && (
                <div className="mt-4">
                    <h3 className="text-green-500 font-bold">Image uploaded successfully!</h3>
                    <img src={imageUrl} alt="Uploaded" className="mt-2 w-full max-w-sm rounded" />
                    <p className="mt-2">
                        Image URL:{' '}
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

            {imageUrl && (
                <button
                    onClick={handleCreatePost}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded w-full"
                >
                    Create Post
                </button>
            )}
            <Footer />
        </div>
    );
};

export default UploadImageAndCreatePost;
