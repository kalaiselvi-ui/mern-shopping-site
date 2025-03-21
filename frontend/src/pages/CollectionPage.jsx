import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSidebar from '../components/Products/FilterSidebar';
import ProductGrid from '../components/Products/ProductGrid';
import SortOptions from '../components/Products/SortOptions';

const CollectionPage = () => {

    const [products, setProducts] = useState([]);
    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleClickOutside = (e) => {
        //closed sidebar if click outside
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    }

    useEffect(() => {
        //add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside)
        //clean event listener unmount comp
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);

        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            const fetchProducts = [

                {
                    _id: 1,
                    name: "Product 1",
                    price: 100,
                    images: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBqZWFuc3xlbnwwfHwwfHx8MA%3D%3D",

                },
                {
                    _id: 2,
                    name: "Product 2",
                    price: 120,
                    images: "https://images.unsplash.com/photo-1652794118671-c56680d1a8f7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAzfHx3b21lbiUyMHRzaGlydCUyMGNhc3VhbHxlbnwwfHwwfHx8MA%3D%3D"

                },
                {
                    _id: 3,
                    name: "Product 3",
                    price: 80,
                    images: "https://images.unsplash.com/photo-1571387559077-744411ac9fec?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA2fHx3b21lbiUyMHRzaGlydCUyMGNhc3VhbHxlbnwwfHwwfHx8MA%3D%3D"

                },
                {
                    _id: 4,
                    name: "Product 4",
                    price: 99,
                    images: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBqZWFucyUyMHdlYXJ8ZW58MHx8MHx8fDA%3D"

                },
                {
                    _id: 5,
                    name: "Product 5",
                    price: 120,
                    images: "https://images.unsplash.com/photo-1654838538605-3200d51229d0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdvbWVuJTIwamVhbnMlMjB3ZWFyfGVufDB8fDB8fHww"

                },

                {
                    _id: 6,
                    name: "Product 6",
                    price: 130,
                    images: "https://images.unsplash.com/photo-1578870495764-9fd217ec7e65?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWVuJTIwamVhbnMlMjB3ZWFyfGVufDB8fDB8fHww"

                },
                {
                    _id: 7,
                    name: "Product 7",
                    price: 155,
                    images: "https://images.unsplash.com/photo-1665816152071-4cccdeeb1583?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWVuJTIwamVhbnMlMjB3ZWFyfGVufDB8fDB8fHww"

                },
                {
                    _id: 8,
                    name: "Product 7",
                    price: 142,
                    images: "https://images.unsplash.com/photo-1544839430-0db50362f8be?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWVuJTIwdHNoaXJ0JTIwd2VhcnxlbnwwfHwwfHx8MA%3D%3D"

                },
                {
                    _id: 9,
                    name: "Stylish Jacket",
                    price: 160,
                    images: "https://images.unsplash.com/photo-1622497170185-5d668f816a56?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lbiUyMGNhc3VhbCUyMHdlYXJ8ZW58MHx8MHx8fDA%3D",

                },
                {
                    _id: 10,
                    name: "Stylish Jacket",
                    price: 80,
                    images: "https://images.unsplash.com/photo-1636590416708-68a4867918f1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1lbiUyMGNhc3VhbCUyMHdlYXJ8ZW58MHx8MHx8fDA%3D",

                },
                {
                    _id: 11,
                    name: "Stylish Jacket",
                    price: 50,
                    images: "https://images.unsplash.com/photo-1658691426512-6dfda0030ea0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tZW4lMjBjYXN1YWwlMjB3ZWFyfGVufDB8fDB8fHww",

                },
                {
                    _id: 12,
                    name: "Stylish Jacket",
                    price: 110,
                    images: "https://images.unsplash.com/photo-1519235014485-3a25f3ce0b30?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d29tZW4lMjBqZWFuc3xlbnwwfHwwfHx8MA%3D%3D ",
                },
                {
                    _id: 13,
                    name: "Stylish Jacket",
                    price: 90,
                    images: "https://images.unsplash.com/photo-1617194804836-5c2a48ef6f74?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvbWVuJTIwdHNoaXJ0cyUyMGNhc3VhbHxlbnwwfHwwfHx8MA%3D%3D",
                },
                {
                    _id: 14,
                    name: "Stylish Jacket",
                    price: 180,
                    images: "https://images.unsplash.com/photo-1709899684187-72d8fb998319?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tZW4lMjB0c2hpcnRzJTIwY2FzdWFsfGVufDB8fDB8fHww",

                },
                {
                    _id: 15,
                    name: "Stylish Jacket",
                    price: 170,
                    images: "https://images.unsplash.com/photo-1667691546476-2b622a900adb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHdvbWVuJTIwdHNoaXJ0JTIwY2FzdWFsfGVufDB8fDB8fHww",
                },
                {
                    _id: 16,
                    name: "Stylish Jacket",
                    price: 89,
                    images: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBqZWFuc3xlbnwwfHwwfHx8MA%3D%3D",

                },
                {
                    _id: 17,
                    name: "Stylish Jacket",
                    price: 165,
                    images: "https://images.unsplash.com/photo-1630173250799-2813d34ed14b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwY2FzdWFsJTIwd2VhcnxlbnwwfHwwfHx8MA%3D%3D",

                },
                {
                    _id: 18,
                    name: "Stylish Jacket",
                    price: 173,
                    images: "https://images.unsplash.com/photo-1697319452360-ee47502e39f6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVuJTIwY2FzdWFsJTIwd2VhcnxlbnwwfHwwfHx8MA%3D%3D",

                },
                {
                    _id: 19,
                    name: "Stylish Jacket",
                    price: 142,
                    images: "https://images.unsplash.com/photo-1679101893310-9b9adb4b733b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1lbiUyMGNhc3VhbCUyMHdlYXJ8ZW58MHx8MHx8fDA%3D",

                },
                {
                    _id: 20,
                    name: "Stylish Jacket",
                    price: 126,
                    images: "https://plus.unsplash.com/premium_photo-1661658467520-214557801af3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVuJTIwY2FzdWFsJTIwd2VhcnxlbnwwfHwwfHx8MA%3D%3D",

                }
            ]

            setProducts(fetchProducts);
        }, 1000)
    }, [])

    return (
        <div className='flex flex-col lg:flex-row'>
            {/*Mobile Filter Button */}
            <button onClick={toggleSidebar} className='lg:hidden border p-2 flex justify-center items-center'>
                <FaFilter className='mr-2 ' />Filters
            </button>

            {/*Filter Sidebar */}
            <div ref={sidebarRef} className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 z-50 left-0 lg:w-68 w-56 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
                <FilterSidebar />
            </div>
            <div className='flex-grow p-4'>
                <h2 className='text-2xl uppercase mb-4'>
                    All collection
                </h2>

                {/*Sort Options */}
                <SortOptions />

                {/*Product Grid */}
                <ProductGrid products={products} />
            </div>




        </div>
    )
}

export default CollectionPage