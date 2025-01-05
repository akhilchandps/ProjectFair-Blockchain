import React from 'react'

const AddProject = () => {
  return (
    <div className='flex justify-center'>
      <form className='flex flex-col gap-5 mt-24 w-[650px]'>
      <h1 className='font-bold text-3xl'>Submit Your Project</h1>

        <label htmlFor="">Project Title:</label>
        <div>
        <input type="text" className='w-full border border-md border-bg-slate p-2 outline-none'  placeholder='project title'/>
        </div>
        <label htmlFor="">Description:</label>
        <div>
            <textarea name="" id="" className='w-full border border-md border-bg-slate p-2 outline-none h-52' ></textarea>
        </div>
        <label htmlFor="">Upload a File:</label>
        <div>
        <input type="file"/>
        </div>

        <div>
            
        </div>
      </form>
    </div>
  )
}

export default AddProject
