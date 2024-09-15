import React, { useRef, useState } from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import Sidebar from '../../Component/Sidebar/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { LuUpload } from "react-icons/lu";
import axios from "axios";
import { toast } from 'react-toastify';
const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
function CreateProduct() {
    const token = localStorage.getItem('token')
    const [product_name, setProduct_name] = useState("")
    const [product_price, setProduct_price] = useState("")
    const formData = new FormData();
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [image, setImage] = useState("")
    const handelImageClick = () => {
        inputRef.current.click();
    }
    const handelImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file)
    }

    const create_product = () => {
        toast.promise(
            resolveAfter3Sec,
            {
                pending: 'product is creating ...',
                success: 'product created successfully',
                error: 'product failed to create'
            }
        )

        formData.append('name', product_name);
        formData.append('price', product_price);
        formData.append('image', image);
        console.log(formData.get('name'))
        console.log(formData.get('price'))
        console.log(token)


        axios.post('https://vica.website/api/items', formData, {


            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log('product created successfully:', response.data);

                navigate("/home");

            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
        console.log(formData)


    }

    return (
        <div className=' text-zinc-500 bg-slate-100 dark:bg-slate-800 h-max '>
            <Navbar />
            <div className='flex  max-[900px]:flex-col max-[500px]:h-full'>
                <Sidebar />
                <div className=' w-full p-7 pl-18% pt-24 max-[900px]:p-7 h-screen '>
                    <div className='flex justify-between items-center w-full mb-5 gap-11 max-[500px]:flex-col '>
                        <div className='flex flex-col gap-5 w-full '>
                            <h2 className='text-2xl text-black dark:text-white mb-10 max-[500px]:mb-0 max-[500px]:text-center'>Create product</h2>
                            <label className='dark:text-white' htmlFor="product_name1">Product Name : </label>
                            <input onChange={(event) => setProduct_name(event.target.value)} className='h-9 w-full  bg-slate-200 rounded-xl border border-solid border-slate-300 pl-5 dark:text-white dark:bg-slate-700  dark:border-slate-400 ' type="text" id="product_name1" />
                            <label className='dark:text-white' htmlFor="product_price1"> Product Price : </label>
                            <input onChange={(event) => setProduct_price(event.target.value)} className='h-9 w-full  bg-slate-200 rounded-xl border border-solid border-slate-300 pl-5 dark:text-white dark:bg-slate-700  dark:border-slate-400' type="text" id="product_price1" />
                        </div>
                        <div className='w-full  h-72'>
                            <div className='w-full h-full mt-20  border-2 border-dashed  border-blue-500 rounded-md flex flex-col justify-center items-center gap-5 max-[500px]:mt-0 ' onClick={handelImageClick} >
                                {
                                    image ? (<img className="w-40 rounded-full " id="fileInput" src={URL.createObjectURL(image)} alt="" />) : <LuUpload className='text-blue-500 text-7xl' />
                                }
                                <p className='dark:text-white'>Upload Product Image</p>
                                <input type="file" ref={inputRef} style={{ display: "none" }} onChange={handelImageChange} />
                            </div>
                        </div>


                    </div>
                    <div className='max-[500px]:w-full max-[500px]:text-center'>
                        <button onClick={create_product} className='h-11 w-36  bg-slate-200 rounded-xl border border-solid border-slate-300 text-black dark:bg-slate-700 dark:text-white'>Create</button>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default CreateProduct