import React, { useState } from 'react';

const EditProductPage = () => {
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        gender: "",
        images: [
            {
                url: "https://images.unsplash.com/photo-1622497170185-5d668f816a56?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lbiUyMGNhc3VhbCUyMHdlYXJ8ZW58MHx8MHx8fDA%3D",

            },
            {
                url: "https://images.unsplash.com/photo-1636590416708-68a4867918f1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1lbiUyMGNhc3VhbCUyMHdlYXJ8ZW58MHx8MHx8fDA%3D",

            }

        ]
    })
    const handleChange = (e) => {
        const { name, value } = e.target;

        setProductData((prev) => ({ ...prev, [name]: value }))
    }
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        console.log(file)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(productData);
    }
    return (
        <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
            <h2 className='text-3xl font-bold mb-6'>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Product Name</label>
                    <input type="text" name='name' value={productData.name} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' required />

                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Description</label>
                    <textarea name='description' value={productData.description} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' rows={4} required></textarea>
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Price</label>
                    <input type="number" name='price' value={productData.price} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' required />

                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Count in Stock</label>
                    <input type="number" name='countInStock' value={productData.countInStock} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' />
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>SKU</label>
                    <input type="text" name='sku' value={productData.sku} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' />
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Sizes (comma-separated)</label>
                    <input type="text" name='sizes' value={productData.sizes.join(", ")} onChange={(e) => setProductData({ ...productData, sizes: e.target.value.split(', ').map((size) => size.trim()) })} className='w-full border border-gray-300 rounded-md p-2' />
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Colors (comma-separated)</label>
                    <input type="text" name='colors' value={productData.colors.join(", ")} onChange={(e) => setProductData({ ...productData, colors: e.target.value.split(', ').map((color) => color.trim()) })} className='w-full border border-gray-300 rounded-md p-2' />
                </div>

                {/*Image Upload */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Upload Image</label>
                    <input type="file" onChange={handleImageUpload} />
                    <div className='flex gap-4 mt-4'>

                        {
                            productData.images.map((image, index) => (
                                <div key={index}>
                                    <img src={image.url} alt="" className='w-12 h-12 object-cover rounded-lg' />
                                </div>
                            ))
                        }

                    </div>
                </div>
                <button type='submit' className='bg-green-500 text-white w-full hover:bg-green-600 py-2 rounded-md transition-colors'>Update Product</button>
            </form>
        </div>
    )
}

export default EditProductPage