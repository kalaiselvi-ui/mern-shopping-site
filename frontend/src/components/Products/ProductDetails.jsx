import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';

const selectedProducts = {
    name: "Stylish Jacket",
    price: 120,
    originalPrice: 150,
    description: "This is a stylish Jacket perfect for any ocassion",
    brand: "FashionBrand",
    material: "Leather",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Black", "White"],
    images: [{
        url: "https://images.unsplash.com/photo-1642229105108-8263fbb298a7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdvbWVuJTIwY2FzdWFsd2VhcnxlbnwwfHwwfHx8MA%3D%3D",
        altText: "Jacket"
    },
    {
        url: "https://images.unsplash.com/photo-1609254104725-23a5a53be0eb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWVuJTIwd2VhcnxlbnwwfHwwfHx8MA%3D%3D",
        altText: "Jacket"
    },
    {
        url: "https://images.unsplash.com/photo-1542719018-4b1f64b64542?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWVuJTIwY2FzdWFsd2VhcnxlbnwwfHwwfHx8MA%3D%3D",
        altText: "Jacket"
    }]
}

const similarProducts = [
    {
        _id: 1,
        name: "Product 1",
        price: 100,
        images: "https://images.unsplash.com/photo-1642229105108-8263fbb298a7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdvbWVuJTIwY2FzdWFsd2VhcnxlbnwwfHwwfHx8MA%3D%3D",

    },
    {
        _id: 2,
        name: "Product 2",
        price: 120,
        images: "https://images.unsplash.com/photo-1609254104725-23a5a53be0eb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWVuJTIwd2VhcnxlbnwwfHwwfHx8MA%3D%3D",

    },
    {
        _id: 3,
        name: "Product 3",
        price: 80,
        images: "https://images.unsplash.com/photo-1542719018-4b1f64b64542?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWVuJTIwY2FzdWFsd2VhcnxlbnwwfHwwfHx8MA%3D%3D",

    },
    {
        _id: 4,
        name: "Product 4",
        price: 99,
        images: "https://plus.unsplash.com/premium_photo-1661658467520-214557801af3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVuJTIwY2FzdWFsJTIwd2VhcnxlbnwwfHwwfHx8MA%3D%3D",

    },
    {
        _id: 5,
        name: "Product 5",
        price: 120,
        images: "https://images.unsplash.com/photo-1630173250799-2813d34ed14b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwY2FzdWFsJTIwd2VhcnxlbnwwfHwwfHx8MA%3D%3D",

    },

    {
        _id: 6,
        name: "Product 6",
        price: 120,
        images: "https://images.unsplash.com/photo-1697319452360-ee47502e39f6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVuJTIwY2FzdWFsJTIwd2VhcnxlbnwwfHwwfHx8MA%3D%3D",

    },
    {
        _id: 7,
        name: "Product 7",
        price: 120,
        images: "https://images.unsplash.com/photo-1679101893310-9b9adb4b733b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1lbiUyMGNhc3VhbCUyMHdlYXJ8ZW58MHx8MHx8fDA%3D",

    },

]
const ProductDetails = () => {
    const [mainImg, setMainImg] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        if (selectedProducts.images?.length > 0) {
            setMainImg(selectedProducts.images[0].url)
        }

    }, [selectedProducts])


    const handleQuantityChange = (action) => {
        setQuantity((prev) => {
            if (action === 'plus') return prev + 1;
            if (action === 'minus' && prev > 1) return prev - 1;
            return prev
        })
    }

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.error("Please select a size and color before adding to the cart.", {
                duration: 1000,
            });
            return;
        }
        setIsButtonDisabled(true);

        const timeoutId = setTimeout(() => {
            toast.success("Product added to the cart.", { duration: 1000 });
            setIsButtonDisabled(false);
        }, 500);

        // Cleanup to prevent memory leaks
        return () => clearTimeout(timeoutId);

    }


    return (
        <div className='lg:p-6 p-2'>
            <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
                <div className='flex flex-col md:flex-row'>
                    {/*Left Thumbnails */}
                    <div className='hidden md:flex flex-col space-y-4 mr-6'>
                        {
                            selectedProducts.images?.map((image, index) => (
                                <img onClick={() => setMainImg(image.url)} key={index} src={image.url} alt="" className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImg === image.url ? "border-black" : "border-gray-300"}`} />
                            ))
                        }
                    </div>
                    {/*Main Image */}
                    <div className='md:w-1/2'>
                        <div className='mb-4'>
                            <img src={mainImg} alt="" className='w-full h-auto object-cover rounded-lg' />
                        </div>

                    </div>
                    {/*Mobile Thumbnail */}
                    <div className='md:hidden flex overflow-x-scroll space-x-4 mb-4'>
                        {
                            selectedProducts.images?.map((image, index) => (
                                <img onClick={() => setMainImg(image.url)} key={index} src={image.url} alt="" className='w-20 h-20 object-cover rounded-lg cursor-pointer border' />
                            ))
                        }
                    </div>
                    {/*Right side */}
                    <div className='md:w-1/2 md:ml-10'>
                        <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
                            {
                                selectedProducts.name
                            }
                        </h1>
                        <p className='text-lg text-gray-600 mb-1 line-through'>{selectedProducts.originalPrice && `${selectedProducts.originalPrice}`}</p>
                        <p className='text-xl text-gray-500 mb-2'>${selectedProducts.price}</p>
                        <p className=' text-gray-600 mb-4'>{selectedProducts.description}</p>
                        <div className='mb-4'>
                            <p className='text-gray-700'>Color:</p>
                            <div className='flex gap-2 mt-2'>
                                {selectedProducts.colors.map((color) => (
                                    <button key={color}
                                        onClick={() => { setSelectedColor(color); console.log("selected color:", color) }}
                                        className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'border-black border-4' : "border-gray-300"}`}
                                        style={{
                                            backgroundColor: color.toLocaleLowerCase()
                                        }}
                                    >

                                    </button>
                                ))}

                            </div>
                        </div>
                        <div className='mb-4'>
                            <p className='text-gray-700'>Size:</p>
                            <div className='flex gap-2 mt-2'>
                                {selectedProducts.sizes.map((size) => (
                                    < button onClick={() => setSelectedSize(size)} key={size} className={`px-4 py-2 rounded border ${selectedSize === size ? "bg-black text-white" : ""}`}>
                                        {size}
                                    </button>
                                ))}

                            </div>
                        </div>
                        <div className='mb-6'>
                            <p className='text-gray-700'>Quantity:</p>
                            <div className='flex items-center space-x-4 mt-2'>
                                <button onClick={() => handleQuantityChange("minus")} className='px-3 py-1 bg-gray-200 rounded text-lg'>
                                    -
                                </button>
                                <span className='text-lg'>{quantity}</span>

                                <button onClick={() => handleQuantityChange("plus")} className='px-3 py-1 bg-gray-200 rounded text-lg'>
                                    +
                                </button>

                            </div>

                        </div>
                        <button
                            onClick={handleAddToCart}
                            disabled={isButtonDisabled}
                            className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"}`}>
                            {isButtonDisabled ? "Adding..." : "ADD TO CART"}
                        </button>
                        <div className='mt-10 text-gray-700'>
                            <h3 className='text-xl font-bold mb-4'>Characteristics:</h3>
                            <table className='w-full text-left text-sm text-gray-600'>
                                <tbody>
                                    <tr>
                                        <td className='py-1'>Brand</td>
                                        <td className='py-1'>{selectedProducts.brand}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1'>Material</td>
                                        <td className='py-1'>{selectedProducts.material}</td>
                                    </tr>
                                </tbody>

                            </table>

                        </div>

                    </div>
                </div>

                <div className='mt-20'>
                    <h2 className='text-2xl text-center font-medium mb-4'>You May Also Like</h2>
                    <ProductGrid products={similarProducts.slice(3)} />
                </div>

            </div>
        </div>
    )
}

export default ProductDetails