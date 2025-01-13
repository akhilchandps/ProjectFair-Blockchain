import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ABI from '../assets/ProjectFair.json';
import address from '../assets/deployed_addresses.json';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState('');
  const [isVisitor, setIsVisitor] = useState(false);  // Use isVisitor state to check visitor status

  useEffect(() => {
    async function fetchProjects() {
      try {
        if (!window.ethereum) {
          alert("Please install MetaMask to use this application.");
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(address['ProjectModule#ProjectFair'], ABI.abi, provider);
        
        const projectList = await contract.getProjects();
        setProjects(projectList.map((project) => ({
          id: project.id.toString(),
          title: project.title,
          description: project.description,
          votes: project.votes.toString(),
          img: project.img, 
        })));

        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        
        // Check if the user is a visitor
        const visitorStatus = await contract.visitors(userAddress);
        setIsVisitor(visitorStatus);  // Set the isVisitor state based on contract check
        
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
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <div key={index} className="border p-4 flex flex-col gap-3 rounded-md">
              <h2 className="text-xl font-bold">{project.title}</h2>
              <p>{project.description}</p>
              <p className="text-sm text-gray-500">Votes: {project.votes}</p>
              {project.img && (
                <div className="flex gap-3 ">
                  <a
                    href={project.img}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline p-2 rounded-md"
                    style={{
                      background: "linear-gradient(to bottom, #33ccff 0%, #3399ff 100%)"
                    }}
                    download
                  >
                    Download File
                    <i className="fa-duotone fa-solid fa-download fa-fade text-xl  cursor-pointer text-white"></i>
                  </a>
                </div>
              )}

              {/* Only show Vote button if the user is a visitor */}
              {isVisitor && (
                <button
                  onClick={() => handleVote(project.id)}
                  className="text-white p-2 rounded-md mt-2"
                  style={{
                    background: "linear-gradient(to bottom right, #ff9933 0%, #ff6600 100%)"
                  }}
                >
                  Vote
                </button>
              )}
              {/* Optional message if the user is not a visitor */}
              {!isVisitor && (
                <p className="text-sm text-gray-500 mt-2">You must register as a visitor to vote.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
