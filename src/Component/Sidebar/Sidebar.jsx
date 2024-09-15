import React from 'react'
import { AiOutlineProduct } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { BsListCheck } from "react-icons/bs";
import { NavLink, useNavigate } from 'react-router-dom';
import { FaPowerOff } from "react-icons/fa6";
import axios from "axios";

function Sidebar() {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const logout = () => {
        alert('are you sure yo want to logout ?')
        axios.post('https://vica.website/api/logout', {

            headers: {
                'Authorization': `Bearer ${token} `,
                'Accept': 'application/json',
            },
        }).then(console.log('user logout ')).catch(err => console.log(err))
        localStorage.clear()
        navigate('/')
    }
    return (
        <div className='w-16% top-10 h-screen bg-white flex flex-col gap-55vh  dark:bg-slate-700  max-[900px]:w-full  max-[900px]:flex-row  max-[900px]:gap-3  max-[900px]:flex-wrap fixed max-[900px]:relative max-[900px]:top-0  max-[900px]:h-max max-[500px]:flex-col'>
            <div className='flex flex-col gap-7 justify-center items-start mt-20  max-[900px]:items-center  max-[900px]:flex-row   max-[900px]:mt-5 max-[450px]:flex-col  max-[450px]:mb-5'>
                <NavLink className='flex gap-4 items-start justify-center ml-18% dark:text-white   max-[500px]:mx-auto  max-[900px]:ml-10 '> <AiOutlineProduct className='mt-1' /> Product</NavLink>
                <NavLink className='flex gap-4 items-start justify-center  ml-18%  dark:text-white max-[500px]:mx-auto max-[900px]:ml-0 '> <MdFavoriteBorder className='mt-1' /> Favorites</NavLink>
                <NavLink className='flex gap-4 items-start justify-center ml-18%  dark:text-white  max-[500px]:mx-auto max-[900px]:ml-0 '> <BsListCheck className='mt-1' />Order Lists</NavLink>
            </div>

            <button onClick={logout} className="Primary flex items-center buttons bg-blue-500  rounded-md h-9 w-36 text-white mb-3 text-center mx-auto cursor-pointer  gap-3 justify-center  max-[900px]:mt-8  max-[500px]:mt-0  " >

                <FaPowerOff />   Logout</button>

        </div>
    )
}

export default Sidebar