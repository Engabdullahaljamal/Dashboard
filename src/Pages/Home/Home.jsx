import React, { useEffect, useState } from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import Sidebar from '../../Component/Sidebar/Sidebar'
import ProductCard from '../../Component/ProductCard/ProductCard'
import { LuPlusCircle } from "react-icons/lu";
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';



function Home() {
    const notify = () => toast("Wow so easy !");

    const token = localStorage.getItem('token')
    const [products, setProducts] = useState([]);
    const [search_value, set_search_value] = useState('')




    console.log(search_value)
    function get_product() {

        axios.get('https://vica.website/api/items', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        }).then(res => setProducts(res.data))
            .catch(error => console.log(error))
    }


    useEffect(() => {
        get_product()
    }, [])

    console.log(products)




    return (
        <div className='h-max min-h-full text-zinc-500 bg-slate-100  dark:bg-slate-800 max-[900px]:w-full '>
            <Navbar set_search_value={set_search_value} />
            <div className='flex h-max max-[900px]:flex-col '>
                <Sidebar />
                <div className='w-full p-9 pl-25% pt-24 max-[900px]:p-9'>
                    <div className='flex justify-between items-center w-full mb-7 '>
                        <h2 className='text-2xl text-black  dark:text-white'>ALL product</h2>
                        <Link className="Primary flex items-center gap-2 buttons bg-blue-500  rounded-md h-9 w-40 text-white mb-3 text-center mx-aut cursor-pointer p-3" to='/create_product' >
                            <LuPlusCircle className='text-lg' />
                            Create Product</Link>

                    </div>

                    <div className='flex text-center gap-7  pt-0 flex-wrap  max-[900px]:justify-center'>
                        {
                            products.map((p, i) => {
                                return <ProductCard product={p} search_value={search_value} all_products={products} get_product={get_product} key={i} />
                            })
                        }

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Home
