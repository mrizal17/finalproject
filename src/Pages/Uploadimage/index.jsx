import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    // Fungsi untuk menangani perubahan input file
    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // Ambil file gambar dari input
    };

    // Fungsi untuk menangani upload gambar
    const handleUpload = async () => {
        if (!image) {
            alert('Please select an image first.');
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append('file', image);

        try {
            // Mengirim request ke API menggunakan Axios
            const response = await axios.post(
                'https://photo-sharing-api-bootcamp.do.dibimbing.id/images/upload',  // Ganti dengan URL yang benar
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: apiKey,
                        Authorization: `Bearer ${token}`,
                      },
                }
            );

            // Jika upload berhasil
            if (response.status === 200) {
                setImageUrl(response.data.url); // Menyimpan URL gambar yang di-upload
            } else {
                alert('Upload failed');
            }
        } catch (error) {
            console.error('Error uploading image:', error.response || error);
            alert('Upload failed: ' + (error.response?.data?.message || error.message));
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h2>Upload Image</h2>

            {/* Input file untuk memilih gambar */}
            <input type="file" onChange={handleFileChange} />

            {/* Tombol untuk meng-upload gambar */}
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload Image'}
            </button>

            {/* Menampilkan URL gambar setelah berhasil upload */}
            {imageUrl && (
                <div>
                    <h3>Image uploaded successfully!</h3>
                    <img src={imageUrl} alt="Uploaded" style={{ width: '300px' }} />
                    <p>Image URL: <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a></p>
                </div>
            )}
        </div>
    );
};

export default UploadImage;
