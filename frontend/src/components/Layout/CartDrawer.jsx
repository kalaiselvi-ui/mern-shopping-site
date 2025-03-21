import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import CartContents from '../Cart/CartContents';

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
    const navigate = useNavigate();


    const handleCheckout = () => {
        toggleCartDrawer();
        navigate('/checkout')
    }

    return (
        <div className={`fixed top-0 right-0 w-full sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform
        duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>

            <div className='flex justify-end p-4'>
                <button onClick={toggleCartDrawer}>
                    <IoMdClose className='h-6 w-6 text-gray-600' />
                </button>
            </div>
            <div className='flex-grow p-4 overflow-y-scroll'>
                <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
                {/*component for cart content */}
                <CartContents />

            </div>
            <div className='p-4 bg-white sticky bottom-0'>
                <button onClick={handleCheckout} className='bg-black w-full text-white py-2 font-semibold transition hover:bg-gray-800 rounded-md'>Chekout</button>
                <p className='text-sm mt-2 text-gray-500 text-center tracking-tighter'>Shipping, taxes, and discounts code calculated at checkout.</p>

            </div>

        </div>
    )
}

export default CartDrawer