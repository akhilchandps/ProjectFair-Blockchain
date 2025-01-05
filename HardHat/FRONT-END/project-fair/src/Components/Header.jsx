import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {


  return (
    <div>
       <header className="bg-[#34495e] text-white py-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">Project Fair</h1>
      <nav>
        <ul className="flex space-x-4">
          <li className='p-2 hover:bg-white hover:text-[#2e4053] transition duration-300 ease-in-out'><Link to="/">Home</Link></li>
          <li className='p-2 hover:bg-white hover:text-[#2e4053] transition duration-300 ease-in-out'><Link to="/register">Register</Link></li>
          <li className='p-2 hover:bg-white hover:text-[#2e4053] transition duration-300 ease-in-out'><Link to="/submit-project">Submit Project</Link></li>
          <li className='p-2 hover:bg-white hover:text-[#2e4053] transition duration-300 ease-in-out'><Link to="/project-list">Projectist</Link></li>

        </ul>
      </nav>
    </div>
  </header>
    </div>
  )
}

export default Header

