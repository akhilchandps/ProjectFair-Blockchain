import React from 'react'
import {ethers} from 'ethers';
import Footer from '../Components/Footer';
import img from '../images/metamask-icon.png'
import { TypeAnimation } from 'react-type-animation';

const Home = () => {


    async function connectToMetamask(){
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer= await provider.getSigner();
      console.log(signer.address);
      alert(`${signer.address} is successfully logged in`)
    }

  return (
    <div>
      <div className="row  flex justify-around h-[100vh]">
        <div className="col flex flex-col gap-5 p-5 m-24 w-[680px]">
            <h1 className='text-2xl font-bold text-[#616a6b]'>
            <TypeAnimation
      sequence={[
        'Welcome to ProjectFair',
        1000,
         "Showcase projects",
        1000
     
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
              </h1>
            <p className='text-md text-justify	leading-7'>The Project Fair DApp is a decentralized platform where students, innovators, and tech enthusiasts showcase their projects. Visitors and judges can explore, vote, and engage with cutting-edge ideas, while participants compete for recognition and rewards.</p>
            <div className='flex gap-3' >
                <button className='bg-orange-500 text-white p-2' onClick={connectToMetamask}>Connect the wallet</button>
                <img src={img} className='w-[40px] object-contain' alt="" />
            </div>
        </div>
        <div className="col"></div>
      </div>
      <Footer />

    </div>
  )
}

export default Home
