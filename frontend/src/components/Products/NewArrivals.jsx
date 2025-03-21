import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const NewArrivals = () => {

    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [newArrivals, setNewArrivals] = useState([])

    // useEffect(() => {
    //     const fetchNewArrivals = async () => {
    //         try {

    //             const response = await axios.get(`${import.meta.senv.VITE_BACKEND_URL}/api/products/`)

    //         } catch (err) {

    //         }
    //     }

    // })

    const newArrivals = [
        {
            _id: '1',
            name: "Stylish Jacket",
            price: 120,
            images: [{
                url: "https://images.unsplash.com/photo-1622497170185-5d668f816a56?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lbiUyMGNhc3VhbCUyMHdlYXJ8ZW58MHx8MHx8fDA%3D",
                altText: ""
            }]

        },
        {
            _id: '2',
            name: "Stylish Jacket",
            price: 120,
            images: [{
                url: "https://images.unsplash.com/photo-1636590416708-68a4867918f1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1lbiUyMGNhc3VhbCUyMHdlYXJ8ZW58MHx8MHx8fDA%3D",
                altText: ""
            }]

        },
        {
            _id: '3',
            name: "Stylish Jacket",
            price: 120,
            images: [{
                url: "https://images.unsplash.com/photo-1658691426512-6dfda0030ea0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tZW4lMjBjYXN1YWwlMjB3ZWFyfGVufDB8fDB8fHww",
                altText: ""
            }]

        },
        {
            _id: '4',
            name: "Stylish Jacket",
            price: 120,
            images: [{
                url: "https://images.unsplash.com/photo-1519235014485-3a25f3ce0b30?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d29tZW4lMjBqZWFuc3xlbnwwfHwwfHx8MA%3D%3D ",
                altText: ""
            }]

        },
        {
            _id: '5',
            name: "Stylish Jacket",
            price: 120,
            images: [{
                url: "https://images.unsplash.com/photo-1617194804836-5c2a48ef6f74?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvbWVuJTIwdHNoaXJ0cyUyMGNhc3VhbHxlbnwwfHwwfHx8MA%3D%3D",
                altText: ""
            }]

        },
        {
            _id: '6',
            name: "Stylish Jacket",
            price: 120,
            images: [{
                url: "https://images.unsplash.com/photo-1709899684187-72d8fb998319?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tZW4lMjB0c2hpcnRzJTIwY2FzdWFsfGVufDB8fDB8fHww",
                altText: ""
            }]

        },
        {
            _id: '7',
            name: "Stylish Jacket",
            price: 120,
            images: [{
                url: "https://images.unsplash.com/photo-1667691546476-2b622a900adb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHdvbWVuJTIwdHNoaXJ0JTIwY2FzdWFsfGVufDB8fDB8fHww",
                altText: ""
            }]

        },
        {
            _id: '8',
            name: "Stylish Jacket",
            price: 120,
            images: [{
                url: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBqZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
                altText: ""
            }]

        }
    ]

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk

    }
    const handleMouseUpOrLeave = () => {
        setIsDragging(false);

    }


    const scroll = (direction) => {
        const scrollAmount = direction === "left" ? -300 : 300;
        scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" })
    }

    const updateScrollButton = () => {
        const container = scrollRef.current;
        console.log({
            scrollRef: container.scrollLeft,
            clientWidth: container.clientWidth,
            containerScrollWidth: container.scrollWidth,
            offsetLeft: scrollRef.current.offsetLeft
        })
        if (container) {
            const leftScroll = container.scrollLeft;
            const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth
            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable);
        }
    }

    useEffect(() => {
        const container = scrollRef.current;
        console.log(container, 'container');

        if (container) {
            container.addEventListener("scroll", updateScrollButton);
            updateScrollButton();
        }
        return () => {
            container?.removeEventListener("scroll", updateScrollButton); // Clean up
        };
    }, [])

    return (
        <section className='p-4 lg:px-0 py-16'>
            <div className='container text-center mb-10 mx-auto relative'>
                <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
                <p className='text-gray-600 text-lg mb-8'>
                    Discover the latest styles off the runway, freshly added to keep your
                    wardrobe on the cutting edge of fashion.
                </p>

                <div className='flex absolute bottom-[-30px] right-0 space-x-2'>
                    <button onClick={() => scroll("left")} className={`p-2 rounded border ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                        <FiChevronLeft className='text-2xl' />
                    </button>
                    <button onClick={() => scroll("right")} className={`p-2 rounded border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                        <FiChevronRight className='text-2xl' />
                    </button>
                </div>



            </div>
            <div ref={scrollRef} className={`container mb-10 mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}>
                {
                    newArrivals.map((product) => (
                        <div key={product._id} className='lg:min-w-[30%] min-w-full relative sm:min-w-1/2'>
                            <img src={product.images[0]?.url} alt="" className='h-[500px] rounded-lg w-full object-cover' />
                            <div className='bg-opacity-50 p-4 rounded-lg text-white absolute backdrop-blur-md bottom-0 left-0 right-0'>
                                <Link to={`/product/${product._id}`} className='block'>
                                    <h4 className='font-medium'>{product.name}</h4>
                                    <p className='mt-1'>${product.price}</p>
                                </Link>
                            </div>
                        </div>
                    ))
                }

            </div>
        </section>
    )
}

export default NewArrivals