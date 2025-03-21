import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import loginImg from '../assets/login.webp';
import { loginUser } from '../redux/slices/authSlice';


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));

    }

    return (
        <div className='flex'>
            <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-md">
                    <div className='flex justify-center mb-6'>
                        <h2 className='text-xl font-medium'>E-Shop</h2>
                    </div>
                    <h2 className='text-2xl font-bold text-center mb-6'>Hey there! 👋🏻</h2>
                    <p className='text-center mb-6'>Enter your username and password to Login</p>
                    <div className='mb-4'>
                        <label htmlFor="" className='block text-sm font-semibold mb-2'>Email</label>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email address'
                            className='w-full p-2 border rounded' />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="" className='block text-sm font-semibold mb-2'>Password</label>
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password'
                            className='w-full p-2 border rounded' />
                    </div>
                    <button type='submit' className='bg-black text-white w-full rounded-lg font-semibold p-2 hover:bg-gray-800 transition'>Sign In</button>
                    <p className='mt-6 text-center text-sm'>Don't have an account? <Link to='/register' className='text-blue-500'>{" "} Register</Link></p>

                </form>

            </div>

            <div className='hidden md:block w-1/2 bg-gray-800'>
                <div className='w-full flex flex-col justify-center items-center'>
                    <img src={loginImg} alt="" className='md:h-[600px] lg:h-[750px] w-full object-cover' />

                </div>

            </div>


        </div>
    )
}

export default Login