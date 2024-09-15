import React, { useState } from 'react'
import { useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";
import { TbBackground } from 'react-icons/tb';
import { MdSunny } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import './../../../src/index.css'

function Navbar({ set_search_value }) {
    const local_theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
    const [theme, setTheme] = useState(local_theme)

    let [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {

        if (theme === "dark") {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
            dark_icon.classList.add('hidden')
            light_icon.classList.remove('hidden')
            setIsDarkMode(true)
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
            dark_icon.classList.remove('hidden')
            light_icon.classList.add('hidden')
            setIsDarkMode(false)

        }


    }, [theme])


    const chang_mode = () => {



        const dark_icon = document.getElementById('dark_icon')
        const light_icon = document.getElementById('light_icon')
        if (theme == 'dark') {
            dark_icon.classList.remove('hidden')
            light_icon.classList.add('hidden')
            localStorage.setItem('theme', 'dark')
        } else {
            dark_icon.classList.add('hidden')
            light_icon.classList.remove('hidden')
            localStorage.setItem('theme', 'light')

        }
        setTheme(theme === 'dark' ? 'light' : 'dark')





        console.log(theme)
    }

    const name = localStorage.getItem('name');
    const user_email = localStorage.getItem('email');
    const image = localStorage.getItem('image');
    return (
        <>
        <div className='w-screen px-4 h-max bg-white flex justify-between items-center dark:bg-slate-700  max-[900px]:flex-col max-[900px]:px-3 fixed z-10 max-[900px]:relative' >
            <div className='flex pl-5 gap-24 max-[900px]:mt-5 max-[900px]:justify-between max-[900px]:w-full max-[900px]:flex-wrap max-[900px]:gap-3 max-[500px]:justify-center'>
                <h2 className='text-2xl text-black font-bold  dark:text-white '> <span className='text-blue-500 '>Dash</span>Stack</h2>
                <div className='relative '>
                    <FaSearch className='absolute top-3 left-3 text-sm dark:text-white' />
                    <input onChange={(e) => set_search_value(e.target.value.toLowerCase())} className=" pl-9 w-72 h-8 text-sm bg-slate-100 rounded-3xl h-9 border border-solid border-slate-300  dark:bg-slate-600  dark:border-slate-400 dark:text-white" placeholder='Search a Product'>
                    </input>

                </div>


            </div>
            <div className='flex p-3 pr-5 gap-4 items-center max-[900px]:w-full max-[900px]:justify-start max-[500px]:justify-center max-[500px]:'>
                <img className='w-10 rounded-full' src={image} alt="" />
                <div className=''>
                    <p className='text-sm text-black dark:text-white'>{name}</p>
                    <p className='text-xs dark:text-zinc-300'>{user_email}</p>
                </div>
                <p > | </p>
                <IoMdMoon id="dark_icon" className=' text-black text-2xl cursor-pointer ' onClick={chang_mode} />
                <MdSunny id="light_icon" className=' text-black text-2xl cursor-pointer hidden  dark:text-white' onClick={chang_mode} />
            </div>
           
        </div>
         <ToastContainer className={isDarkMode ? 'dark-toast' : ''}  />
         </>
    )
}

export default Navbar