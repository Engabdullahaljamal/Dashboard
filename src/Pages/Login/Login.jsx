import React from 'react'
import { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import bg_image from './../../assets/auth-bg.png'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const personal_info =
    {
        email: email,
        password: password
    }


    const handel_login = (event) => {
        event.preventDefault()

        axios.post('https://vica.website/api/login', personal_info)
            .then((response) => {
                // handle success

                if (response.data.token != "") {
                    navigate("/home")
                    const user_token = response.data.token
                    const image = response.data.user.profile_image_url
                    const name = response.data.user.user_name
                    const email = response.data.user.email
                    localStorage.setItem("token", user_token)
                    localStorage.setItem("image", image)
                    localStorage.setItem("name", name)
                    localStorage.setItem("email", email)
                }
                console.log(response.data);
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })

    }

    const handelImageClick = () => {
        inputRef.current.click();
    }
    const handelImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file)

    }



    return (
        <div className="flex justify-center items-center w-full h-screen py-10 max-[800px]:h-screen" style={{ backgroundImage: `url(${bg_image})` }}>
            <div className="w-1/3 max-[700px]:w-3/4  max-[1100px]:w-3/6 h-max bg-white rounded-3xl pl-8 pr-8 ">
                <h2 className="text-center text-xl font-semibold tracking-wide pt-6">Login to Account </h2>
                <p className="text-sm  text-zinc-500 text-center mt-2">Please inter  your email and password to continue</p>
                <form className="flex-col justify-center items-center gap-3  mt-7  ">


                    <div className="">
                        <div className="mt-3">
                            <label className="text-stone-500 " htmlFor="email">Email Address : </label>
                            <input onChange={(event) => setEmail(event.target.value)} className="mt-3 pl-3 w-full text-sm bg-slate-100 rounded-md h-9 border border-solid border-slate-300" id="email" placeholder="example@gmail.com" />
                        </div>
                    </div>
                    <div className="">
                        <div className="mt-3">
                            <label className="text-stone-500 " htmlFor="password2">Password: </label>
                            <input type='password' onChange={(event) => setPassword(event.target.value)} className="mt-3 pl-3 w-full text-sm bg-slate-100 rounded-md h-9 border border-solid border-slate-300" id="password2" placeholder="**********" />
                        </div>
                    </div>


                    <div className="text-center mt-40">
                        <input onClick={handel_login} type="submit" className="Primary buttons bg-blue-500  rounded-md h-10 w-60 text-white mb-3 text-center mx-aut cursor-pointer max-[800px]:w-full" value="Login" />
                        <p className="text-sm text-zinc-500 text-center mb-5">Don't have an account ? <Link to='/signup' className="text-blue-500 ">Create Account</Link></p>
                    </div>

                </form>

            </div>

        </div >
    )
}

export default Login