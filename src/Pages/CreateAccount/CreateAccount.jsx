import { useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import bg_image from './../../assets/auth-bg.png'



function CreateAccount() {

    const navigate = useNavigate();

    const inputRef = useRef(null);

    const [image, setImage] = useState("")

    const [first_name, setFirsName] = useState("")

    const [last_name, setLastName] = useState("")

    const [user_name, setUserName] = useState("")

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const [password_confirmation, setPasswordConfirmation] = useState("")

    const formData = new FormData();

    formData.append('first_name', first_name);

    formData.append('last_name', last_name);

    formData.append('user_name', user_name);

    formData.append('email', email);

    formData.append('password', password);

    formData.append('password_confirmation', password_confirmation);

    formData.append('profile_image', image);

    console.log(first_name)


    const signIn = (event) => {

        event.preventDefault()
        axios.post('https://vica.website/api/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log('File uploaded successfully:', response.data);
                if (response.data.status == "success") {
                    navigate("/home")
                }
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
        console.log(formData)
    }

    const handelImageClick = () => {
        inputRef.current.click();
    }
    const handelImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file)
    }


    return (
        <div className="flex justify-center items-center w-full h-screen bg-custom-bg py-10 max-[800px]:h-max" style={{ backgroundImage: `url(${bg_image})` }}>
            <div className="w-3/5 h-max bg-white rounded-3xl pl-8 pr-8  max-[600px]:w-3/4">
                <h2 className="text-center text-xl font-semibold tracking-wide pt-6">Create an Account </h2>
                <p className="text-sm  text-zinc-500 text-center mt-2">Create a account to continue</p>
                <form className="flex-col justify-center items-center gap-3  mt-7  ">
                    <div className="flex  max-[800px]:flex-wrap gap-5 ">
                        <div className="max-[800px]:w-full" >
                            <label className="text-stone-500" htmlFor="first_name">First Name :</label>
                            <input onChange={(event) => setFirsName(event.target.value)} className="mt-3 pl-3 w-full text-sm bg-slate-100 rounded-md h-9 border border-solid border-slate-300" type="text" name="" id="first_name" placeholder="First Name" />
                        </div>
                        <div className="max-[800px]:w-full">
                            <label className="text-stone-500" htmlFor="last_name">Last Name :</label>
                            <input onChange={(event) => setLastName(event.target.value)} className="mt-3  pl-3 w-full text-sm bg-slate-100 rounded-md h-9 border border-solid border-slate-300" type="text" name="" id="last_name" placeholder="Last Name" />
                        </div>
                        <div className="max-[800px]:w-full">
                            <label className="text-stone-500" htmlFor="user_name">User Name :</label>
                            <input onChange={(event) => setUserName(event.target.value)} className="mt-3 pl-3 w-full text-sm bg-slate-100 rounded-md h-9 border border-solid border-slate-300" type="text" name="" id="user_name" placeholder="User Name" />
                        </div>
                    </div>

                    <div className="">
                        <div className="mt-3">
                            <label className="text-stone-500 " htmlFor="email">Email Address : </label>
                            <input onChange={(event) => setEmail(event.target.value)} className="mt-3 pl-3 w-full text-sm bg-slate-100 rounded-md h-9 border border-solid border-slate-300" id="email" placeholder="example@gmail.com" />
                        </div>
                    </div>
                    <div className="flex lg:flex-nowrap  max-[800px]:flex-wrap max-[800px]:w-full gap-10 max-[800px]:gap-0">

                        <div className="w-96  max-[800px]:w-full">
                            <div className="mt-3 ">
                                <label className="text-stone-500 " htmlFor="password">Password :</label>
                                <input onChange={(event) => setPassword(event.target.value)} className="mt-3 pl-3 w-full text-sm bg-slate-100 rounded-md h-9 border border-solid border-slate-300 " type="password" id="password" placeholder="**********" />
                            </div>
                        </div>
                        <div className="w-96  max-[800px]:w-full">
                            <div className="mt-3 ">
                                <label className="text-stone-500 " htmlFor="confirmation">Confirmation Password :</label>
                                <input onChange={(event) => setPasswordConfirmation(event.target.value)} className="mt-3 pl-3 w-full text-sm bg-slate-100 rounded-md h-9 border border-solid border-slate-300" type="password" id="confirmation" placeholder="**********" />
                            </div>


                        </div>
                    </div>
                    <div className="font-normal relative mt-3">
                        <label className="text-stone-500 " htmlFor="photo">Profile image :</label>
                        {
                            image ? (<img className="w-28 h-28 rounded-full mt-2 mb-3 max-[800px]:mx-auto " id="fileInput" src={URL.createObjectURL(image)} alt="" />) : <CgProfile onClick={handelImageClick} className="w-28 h-28 font-normal text-slate-200 mt-2 mb-3  max-[800px]:mx-auto" id="photo" />
                        }

                        <input type="file" ref={inputRef} style={{ display: "none" }} onChange={handelImageChange} />

                    </div>
                    <div className="text-center">
                        <input type="submit" onClick={signIn} className="Primary buttons bg-blue-500  rounded-md h-10 w-60 text-white mb-3 text-center mx-aut cursor-pointer max-[800px]:w-full" value="Sign up" />
                        <p className="text-sm text-zinc-500 text-center mb-5">Already have an account ? <Link to='/' className="text-blue-500 ">Login</Link></p>
                    </div>



                    <div>

                    </div>
                </form>

            </div>

        </div >
    )

}

export default CreateAccount