import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ABI from '../assets/ProjectFair.json';
import address from '../assets/deployed_addresses.json';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState('');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        if (!window.ethereum) {
          alert("Please install MetaMask to use this application.");
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(address['ProjectModule#ProjectFair'], ABI.abi, provider);
        
        // Fetch the projects
        const projectList = await contract.getProjects();
        setProjects(projectList.map((project) => ({
          id: project.id.toString(),
          title: project.title,
          description: project.description,
          votes: project.votes.toString(),
          img: project.img, 
        })));

        // Fetch the user's role
        const signer = await provider.getSigner();
        console.log(signer);
        
        const userAddress = await signer.getAddress();
        console.log(userAddress);
        
        const role = await contract.roles(userAddress);
        console.log("role",role);
        
        
        setUserRole(parseInt(role)); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchProjects();
  }, []);

  const handleVote = async (projectId) => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask to use this application.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(address['ProjectModule#ProjectFair'], ABI.abi, signer);

      const tx = await contract.vote(projectId);
      await tx.wait();
      setMessage(`Vote cast successfully for project ID: ${projectId}`);
    } catch (error) {
      console.error("Error casting vote:", error);
      alert("Failed to cast vote. Ensure you have the proper role.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold my-12 text-center text-[#283747]">Project List</h1>
      {message && <p className="text-green-500">{message}</p>}
      {projects.length === 0 ? (
        <p>No projects available</p>
      ) : (
        <div className="shadow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <div key={index} className="border p-4 flex flex-col gap-3">
              <h2 className="text-xl font-bold">{project.title}</h2>
              <p>{project.description}</p>
              <p className="text-sm text-gray-500">Votes: {project.votes}</p>
              {project.img && (
                <div className='flex gap-3 '>
                  <a
                  href={project.img}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                  download
                >
                  Download File <i className="fa-duotone fa-solid fa-download fa-fade text-xl text-black cursor-pointer"></i>

                </a>
                 </div>
            
                
              )}

              {userRole === 2 && ( // Check if the user's role is "Visitor"
                <button
                  onClick={() => handleVote(project.id)}
                  className="bg-blue-500 text-white p-2 rounded-md mt-2"
                >
                  Vote
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
