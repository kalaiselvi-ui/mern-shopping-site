import React, { useState } from 'react';
import { HiBars3BottomRight, HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import CartDrawer from '../Layout/CartDrawer';
import SearchBar from './SearchBar';

const Navbar = () => {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen);
    }

    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    return (
        <>
            <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
                {/*Left-Logo */}
                <div>
                    <Link to="/" className="text-2xl font-medium text-Primary-color">
                        E-Cart
                    </Link>
                </div>
                {/*Navigation-Links */}
                <div className='hidden md:flex space-x-6'>
                    <Link to="/collections/all" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                        Men
                    </Link>
                    <Link to="/collections/:collection" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                        Women
                    </Link>
                    <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                        Top Wear
                    </Link>
                    <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                        Bottom Wear
                    </Link>
                </div>
                {/*Right Icons */}
                <div className='flex items-center space-x-4'>
                    <Link to="/admin" className='block bg-black px-2 rounded text-sm text-white'>Admin</Link>
                    <Link to="/profile" className='hover:text-black'>
                        <HiOutlineUser className='h-6 w-6 text-gray-700' />
                    </Link>
                    <button className='hover:text-black relative'
                        onClick={toggleCartDrawer}>
                        <HiOutlineShoppingBag className='h-5 w-5 text-gray-700' />
                        <span className='absolute bg-Primary-color text-white text-xs rounded-full px-2 py-0.5 -top-3 -right-3' >4</span>
                    </button>
                    {/*Search Bar */}
                    <div className='overflow-hidden'>
                        <SearchBar />
                    </div>
                    <button className='md:hidden' onClick={toggleNavDrawer}>
                        <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
                    </button>

                </div>

            </nav>

            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

            {/*Mobile Navigation */}
            <div className={`fixed top-0 left-0 h-full w-3/4 md:w-1/3 sm:w-1/2 transform transition-transform shadow-lg duration-300 z-50 bg-white ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className='flex justify-end p-4'>
                    <button onClick={toggleNavDrawer}>
                        <IoMdClose className='h-6 w-6 text-gray-600' />
                    </button>
                </div>
                <div className='p-4'>
                    <h2 className='text-xl font-semibold mb-4'>Menu</h2>
                    <nav className='space-y-4'>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Men</Link>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Women</Link>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Top Wear</Link>
                        <Link to="#" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Bottom Wear</Link>
                    </nav>

                </div>

            </div>

        </>
    )
}

export default Navbar