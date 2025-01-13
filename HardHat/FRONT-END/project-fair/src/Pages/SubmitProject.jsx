import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import ABI from '../assets/ProjectFair.json';
import address from '../assets/deployed_addresses.json';

const SubmitProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !file) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    try {
      setLoading(true);

      // Upload image to IPFS
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          pinata_api_key: "8b479fdadf25ad4cb865",
          pinata_secret_api_key: "9d4e40b8048afe773e5dd6f33f0e24d4597c3bbefa1f1ba2265591560ef30299",
          "Content-Type": "multipart/form-data",
        },
      });

      const imgURL = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

      // Submit project to blockchain
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(address['ProjectModule#ProjectFair'], ABI.abi, signer);

      const tx = await contract.submitProject(title, description, imgURL);
      await tx.wait();

      alert("Project submitted successfully!");
      setTitle('');
      setDescription('');
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Failed to submit project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-5 mt-24">
      <h1 className="text-2xl font-bold p-5">Submit Project</h1>
      <form onSubmit={handleSubmit} className="w-[700px] flex flex-col gap-4">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
          required
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 h-52"
          rows="4"
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Project"}
        </button>
      </form>
    </div>
  );
};

export default SubmitProject;
