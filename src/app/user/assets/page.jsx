"use client";
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import pdfPlaceholder from "@/assets/pdfPlaceholder.png"
import Image from 'next/image';
import Link from 'next/link';

function page() {
    let [assetType, setAssetType] = useState('image');
    let [asset, setAsset] = useState(null);
    let [filePreview, setFilePreview] = useState(null);
    let [name, setName] = useState('');
    let [description, setDescription] = useState('');
    let { assets } = useSelector((state) => state.assets);
    let { user } = useSelector((state) => state.user);
    let [userEmail, setUserEmail] = useState("");
    let [loadedAssets, setLoadedAssets] = useState([]);

    useEffect(() => {
        if (assets) {
            setLoadedAssets(assets[0]);
        }
        if (user) {
            setUserEmail(user.email);
        }
    }, [assets, user])

    // console.log(loadedAssets);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        let fileType = file?.type;

        if (file && fileType.includes(assetType)) {
            setAsset(file);
            setFilePreview(URL.createObjectURL(file));
            if (!name) {
                setName(file.name.split('.')[0]);
            }
        } else {
            setAsset(null);
            setFilePreview(null);
            toast.error(`Invalid file type. Please upload a ${assetType}.`);
        }
    }

    const handleAssetTypeChange = (e) => {
        setAssetType(e.target.value);
        setAsset(null);
        setFilePreview(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!asset) {
            toast.error('Please select a file to upload.');
            return;
        }

        if (!name.trim()) {
            toast.error('Please enter a name for the asset.');
            return;
        }

        const loadingToast = toast.loading('Uploading file...');

        try {
            const formData = new FormData();
            formData.append('file', asset);
            formData.append('type', assetType);
            formData.append('name', name.trim());
            formData.append('description', description.trim());
            formData.append('email', userEmail);

            const response = await fetch('/api/assets/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Upload failed');
            }

            toast.update(loadingToast, {
                render: 'File uploaded successfully!',
                type: 'success',
                isLoading: false,
                autoClose: 3000,
            });

            console.log('Upload successful:', result);

            setAsset(null);
            setFilePreview(null);
            setName('');
            setDescription('');
            e.target.reset();

        } catch (error) {
            console.error('Upload error:', error);
            toast.update(loadingToast, {
                render: error.message || 'Upload failed. Please try again.',
                type: 'error',
                isLoading: false,
                autoClose: 5000,
            });
        }
    };

    return (
        <div className='text-black p-6 max-w-2xl mx-auto'>
            <ToastContainer position="top-right" />
            <h1 className="text-2xl font-bold mb-6">Upload Assets</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Asset Type:
                        <select
                            value={assetType}
                            onChange={handleAssetTypeChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="image">Image</option>
                            <option value="pdf">PDF</option>
                        </select>
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter asset name"
                        />
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            rows="3"
                            placeholder="Enter asset description (optional)"
                        />
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Upload Asset:
                        <input
                            type="file"
                            accept={
                                assetType === 'image' ? 'image/*'
                                    : assetType === 'pdf' ? 'application/pdf'
                                        : ''
                            }
                            onChange={handleFileChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Upload Asset
                </button>
            </form>

            {filePreview && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Preview:</h2>
                    {assetType === 'image' ? (
                        <img
                            src={filePreview}
                            alt="Asset Preview"
                            className="max-w-full h-auto max-h-96 rounded-md border"
                        />
                    ) : (
                        <iframe
                            src={filePreview}
                            title="Asset Preview"
                            className="w-full h-96 border rounded-md"
                        />
                    )}
                </div>
            )}

            {
                loadedAssets && loadedAssets.length > 0 ?
                    <div>
                        <h2>
                            <span className="text-xl font-semibold mt-6">Uploaded Assets:</span>
                        </h2>
                        <ul className="mt-4 space-y-4">
                            {loadedAssets.map((asset, index) => (
                                <li key={index} className="p-4 bg-white rounded-md shadow-md">
                                    <h3 className="text-lg font-semibold">{asset.name}</h3>
                                    <p className="text-gray-600">{asset.description}</p>
                                    {
                                        asset.type === 'image' ? (
                                            <img
                                                src={asset.url}
                                                alt={asset.name}
                                                className="mt-2 max-w-full h-auto rounded-md border"
                                            />
                                        ) : (
                                            <div>
                                                <Image
                                                    src={pdfPlaceholder}
                                                    alt="PDF Placeholder"
                                                    width={200}
                                                    height={200}
                                                    className="mt-2 max-w-full h-auto rounded-md border"
                                                />
                                                <Link
                                                    href={asset.url}
                                                    target="_blank"
                                                    className="text-blue-500 underline mt-2 inline-block"
                                                >
                                                    Download PDF
                                                </Link>
                                            </div>
                                        )
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>
                    :
                    <div className="mt-6">
                        <p className="text-gray-500">No assets uploaded yet.</p>
                    </div>
            }
        </div>
    )
}

export default page