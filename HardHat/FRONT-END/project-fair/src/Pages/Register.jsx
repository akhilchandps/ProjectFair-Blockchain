import React from 'react';
import { ethers } from 'ethers';
import ABI from '../assets/ProjectFair.json';
import address from '../assets/deployed_addresses.json';

const Register = () => {
  const registerAsStudent = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(address['ProjectModule#ProjectFair'], ABI.abi, signer);

      const tx = await contract.registerAsStudent();
      await tx.wait();
      alert("Successfully registered as Student");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  const registerAsVisitor = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(address['ProjectModule#ProjectFair'], ABI.abi, signer);

      const tx = await contract.registerAsVisitor();
      await tx.wait();
      alert("Successfully registered as Visitor");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className=" mt-24 flex flex-col items-center">
      
      <h1 className="text-2xl font-bold">Register</h1>

      <div className='flex p-5'>
      <button
        onClick={registerAsStudent}
        className="bg-blue-500 text-white p-2 rounded-md m-2"
      >
        Register as Student
      </button>
      <button
        onClick={registerAsVisitor}
        className="bg-green-500 text-white p-2 rounded-md m-2"
      >
        Register as Visitor
      </button>
      </div>
  
    </div>
  );
};

export default Register;
