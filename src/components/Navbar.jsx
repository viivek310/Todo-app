import React from 'react'

const Navbar = () => {
  return (
        <nav className='flex justify-between items-center p-8 h-10 bg-slate-800 text-white'>
            <h1 className='text-xl font-bold cursor-pointer'>Todo App</h1>
            <ul className='flex gap-5'>
                <li className='rounded-xl hover:bg-slate-700 px-4 py-2 cursor-pointer'>Home</li>
                <li className='rounded-xl hover:bg-slate-700 px-4 py-2 cursor-pointer'>My todos</li>
            </ul>
        </nav>
  )
}

export default Navbar
