import React, { useState } from 'react';
import { ethers } from 'ethers';
import ABI from '../assets/ProjectFair.json';
import address from '../assets/deployed_addresses.json'; // Contract Address

const Register = () => {
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  async function registerRole(e) {
    e.preventDefault();
    if (!role) {
      alert("Please select a role");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(address['ProjectModule#ProjectFair'], ABI.abi, signer);

      await contract.register(parseInt(role)); 
      setMessage(`Successfully registered as ${role === "1" ? "Student" : "Visitor"}`);
    } catch (error) {
      console.error(error);
      if (error.message.includes("You are admin")) {
        alert("Admin cannot register as a role.");
      } else if (error.message.includes("Already registered")) {
        alert("You are already registered.");
      } else if (error.message.includes("Invalid role")) {
        alert("Please select a valid role.");
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  }
  console.log(role);
  

  return (
    <div className=" flex items-center justify-center p-5">
      <form className='p-5 w-[760px] p-2 flex flex-col mt-32 gap-5   shadow-md'>
      <h1 className="text-2xl font-bold mb-4 text-[#616a6b]">Register</h1>
      <select
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 mb-4 w-full outline-none"
      >
        <option value="">Select Role</option>
        <option value="1">Student</option>
        <option value="2">Visitor</option>
      </select>
      <button
        onClick={registerRole}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Register
      </button>
      {message && <p className="mt-3 text-green-500">{message}</p>}
      </form>
     
    </div>
  );
};

export default Register;
