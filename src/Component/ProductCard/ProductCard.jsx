import React, { useEffect, useState } from 'react'
import ex_img from './../../assets/products/1.png'
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function ProductCard({ product, search_value, all_products, get_product }) {
    const token = localStorage.getItem('token')

    const navigate = useNavigate()


    const delete_product = () => {
        toast("product is deleting ...", { autoClose: 1000 });
        axios.delete(`https://vica.website/api/items/${product.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        }).then(
            console.log('Product deleted')).catch(err => console.log('Error deleting product:', err))

            ;

        get_product()
    }

    useEffect(() => {
        const cards = document.querySelectorAll('.card')
        if (search_value != '') {
            all_products.forEach(p => {
                p.name = p.name.toLowerCase()
                const card_id = document.getElementById(p.id)

                if (!p.name.includes(search_value)) {

                    card_id.classList.add('hidden')

                } else {
                    card_id.classList.remove('hidden')
                    card_id.classList.add('block')

                }
            }
            );
        } else {
            cards.forEach(c => {
                c.classList.remove('hidden')
                c.classList.add('block')

            });


        }
    }, [search_value])

    return (
        <div className='w-64 h-72 px-4 pb-5 pt-2 bg-white rounded-lg flex justify-center items-center flex-col gap-2  dark:bg-slate-700 card ' id={product.id}>
            <img className='h-3/5 ' src={product.image_url} alt="" />
            <div className='w-full'> <h3 className='text-zinc-900 font-semibold text-lg text-left  dark:text-white'>{product.name}</h3></div>

            <div className='w-full text-start'><p className='text-blue-500'>${product.price}</p></div>
            <div className=' w-full flex items-center  justify-between mt-2'>
                <Link to={`/edit_product/${product.id}`} className=' bg-slate-200 py-1 px-4 rounded-3xl text-sm text-zinc-800  dark:text-white dark:bg-slate-500'> Edit Product</Link>
                <RiDeleteBinLine className='text-xl cursor-pointer' onClick={delete_product} />
            </div>


        </div>
    )
}

export default ProductCard

// } else if (search_value == null) {
//     // window.location.reload();
//     cards.forEach(c => {
//             c.classList.remove('hidden')
//            });