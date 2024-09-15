import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import Sidebar from '../../Component/Sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { LuUpload } from "react-icons/lu"
import { toast } from 'react-toastify';;
import axios from "axios";



const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));

function EditProduct() {
    const { product_id } = useParams()
    const [products, setProducts] = useState([]);
    const [product_name, setProduct_name] = useState("")
    const [product_price, setProduct_price] = useState("")
    const [image, setImage] = useState("")
    const [image_for_back, setImage_for_back] = useState("")

    useEffect(() => {

        const token = localStorage.getItem('token')
        axios.get(`https://vica.website/api/items/${product_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        }).then(res => {
            setProducts(res.data)
            setProduct_name(res.data.name)
            setProduct_price(res.data.price)
            setImage(res.data.image_url)

            console.log(res.data)
        })
            .catch(error => console.log(error))

    }, [])



    const formData = new FormData();
    const navigate = useNavigate();
    const inputRef = useRef(null);


    const handelImageClick = () => {
        inputRef.current.click();

    }
    const handelImageChange = (event) => {
        const file = event.target.files[0];
        setImage_for_back(file)
        setImage(URL.createObjectURL(file))

    }

    console.log(product_id)


    const edit_product = () => {
        toast.promise(
            resolveAfter3Sec,
            {
                pending: 'product is editing ...',
                success: 'product edited successfully',
                error: 'product failed to edit'
            }
        )
        formData.append('name', product_name);
        formData.append('price', product_price);
        formData.append('image', image_for_back);
        formData.append('_method', 'put');
        const token = localStorage.getItem('token')
        axios.post(`https://vica.website/api/items/${product_id}`, formData, {


            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log('product updated successfully:', response.data);

                navigate("/home");

            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
        console.log(formData)

    }

    return (
        <div className=' text-zinc-500 bg-slate-100 dark:bg-slate-800'>
            <Navbar />
            <div className='flex  max-[900px]:flex-col'>
                <Sidebar />
                <div className='w-full p-7 pl-18% pt-24 max-[900px]:p-7 h-screen'>
                    <div className='flex justify-between items-center w-full mb-5 gap-11  max-[500px]:flex-col'>
                        <div className='flex flex-col gap-5 w-full'>
                            <h2 className='text-2xl text-black  dark:text-white mb-10 max-[500px]:mb-0 max-[500px]:text-center '>Edit product</h2>
                            <label className='dark:text-white' htmlFor="product_name2 ">Product Name : </label>
                            <input onChange={(e) => setProduct_name(e.target.value)} className='h-9 w-full  bg-slate-200 rounded-xl border border-solid border-slate-300 pl-5 dark:text-white dark:bg-slate-700  dark:border-slate-400' type="text" id="product_name2" value={product_name} />
                            <label className='dark:text-white' htmlFor="product_price2"> Product Price : </label>
                            <input onChange={(e) => setProduct_price(e.target.value)} className='h-9 w-full  bg-slate-200 rounded-xl border border-solid border-slate-300 pl-5  dark:text-white dark:bg-slate-700  dark:border-slate-400' type="text" id="product_price2" value={product_price} />
                        </div>
                        <div className='w-full h-72'>
                        <div className=' w-full h-full mt-20 border-2 border-dashed  border-blue-500 rounded-md flex flex-col justify-center items-center gap-5 max-[500px]:mt-0' onClick={handelImageClick} >
                            {
                                < img className="w-40 rounded-full " id="fileInput" src={image} alt="" />
                            }
                            <p className='dark:text-white'>Edit Product Image</p>
                            <input type="file" ref={inputRef} style={{ display: "none" }} onChange={handelImageChange} />
                        </div>
                        </div>
                       

                    </div>
                    <div className='max-[500px]:w-full max-[500px]:text-center'>
                    <button onClick={edit_product} className='h-11 w-36  bg-slate-200 rounded-xl border border-solid border-slate-300 text-black dark:bg-slate-700 dark:text-white'>update</button>
                    </div>


                </div>

            </div>

        </div>
    )
}

export default EditProduct