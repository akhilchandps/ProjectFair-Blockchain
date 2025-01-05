import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import ABI from '../assets/ProjectFair.json';
import address from '../assets/deployed_addresses.json';

const SubmitProject = () => {
  const [formData, setFormData] = useState(
    { title: '',
       description: '', 
       file: null    
      });
  const [fileUrl, setFileUrl] = useState('');
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  // Handle File Upload to IPFS
  const handleFileUpload = async () => {

    try {
      if (!formData.file) {
        alert("Please upload a file");
        return;
      }

      setUploading(true);
      const fileData = new FormData();
      fileData.append('file', formData.file);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        fileData,
        {
          headers: {
            pinata_api_key: "8b479fdadf25ad4cb865",
            pinata_secret_api_key: "9d4e40b8048afe773e5dd6f33f0e24d4597c3bbefa1f1ba2265591560ef30299",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const ipfsHash = response.data.IpfsHash;
      const fileUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      setFileUrl(fileUrl);
      setUploading(false);
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
      setUploading(false);
      alert("File upload failed. Please try again.");
    }
  };

  // Submit Project to Smart Contract


  const submitProject = async (e) => {

    e.preventDefault();
    const { title, description } = formData;

    if (!title || !description || !fileUrl) {
      alert("Please fill in all fields and upload a file");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(address['ProjectModule#ProjectFair'], ABI.abi, signer);

      const tx = await contract.submitProject(title, description, fileUrl);
      await tx.wait();
      setMessage("Project submitted successfully");
    } catch (error) {
      console.error(error);
      alert("Project submission failed");
    }
  };

  return (
    <div className=" flex justify-center p-5">
      <form className='flex flex-col  mt-24 shadow-md w-[900px] p-8 rounded'> 
      <h1 className="text-3xl font-bold">Submit Project</h1>
      <input
        type="text"
        placeholder="Project Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="border p-2 my-3 w-full outline-none rounded"
      />
      <textarea
        placeholder="Project Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="border p-2 my-3 w-full h-80 outline-none rounded"
      />
      <input
        type="file"
        onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
        className="border p-2 my-3 w-full"
      />
      <button
        onClick={handleFileUpload}
        disabled={uploading}
        className={`bg-${uploading ? "gray-500" : "blue-500"} text-white p-2 rounded-md my-2`}
      >
        {uploading ? "Uploading..." : "Upload to IPFS"}
      </button>
      {fileUrl && <p className="mt-3 text-green-500">File uploaded: <a href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl}</a></p>}
      <button
        onClick={submitProject}
        className="bg-green-500 text-white p-2 rounded-md"
      >
        Submit Project
      </button>
      {message && <p className="mt-3 text-green-500">{message}</p>}
      </form>
 
    </div>
  );
};

export default SubmitProject;
