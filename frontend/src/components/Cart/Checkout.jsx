import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';

const cart = {
    products: [
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
    ],
    totalPrice: 195
}

const Checkout = () => {
    const navigate = useNavigate('');
    const [checkoutId, setCheckoutId] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        country: "",
        zipcode: "",
        phone: ""
    })

    const handleCreateCheckout = (e) => {
        e.preventDefault();
        setCheckoutId(123);
    }

    const handlePaymentSuccess = (details) => {
        console.log("payment successful", details);
        navigate('/order-confirmation');
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'
        >

            <div className='bg-white rounded-lg p-6'>
                <div className='text-2xl uppercase mb-6'>Checkout</div>
                <form className='' onSubmit={handleCreateCheckout}>
                    <h3 className='text-lg mb-4'>Contact Details</h3>
                    <div className='mb-4'>
                        <label className="block text-gray-700">Email</label>
                        <input type="email" value="user@eample.com" className='w-full p-2 border rounded' disabled />
                    </div>
                    <h3 className='text-lg mb-4'>Delivery</h3>
                    <div className='mb-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label className="block text-gray-700">First Name</label>
                            <input type="text" name='firstName' className='w-full border rounded indent-1' value={shippingAddress.firstName} onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-gray-700">Last Name</label>
                            <input type="text" name='lastName' className='w-full border rounded indent-1' value={shippingAddress.lastName} onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })} />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div>
                            <label className="block text-gray-700">Address</label>
                            <input type="text" name='address' className='w-full border rounded indent-1' value={shippingAddress.address} onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })} required />
                        </div>

                    </div>
                    <div className='mb-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label className="block text-gray-700">City</label>
                            <input type="text" name='city' className='w-full border rounded indent-1' value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-gray-700">Country</label>
                            <input type="text" name='country' className='w-full border rounded indent-1' value={shippingAddress.country} onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} />
                        </div>
                    </div>
                    <div className='mb-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label className="block text-gray-700">Zip code</label>
                            <input type="text" name='zipcode' className='w-full border rounded indent-1' value={shippingAddress.zipcode} onChange={(e) => setShippingAddress({ ...shippingAddress, zipcode: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-gray-700">Phone</label>
                            <input type="number" name='phone' className='w-full border rounded indent-1' value={shippingAddress.phone} onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} />
                        </div>
                    </div>

                    <div className='mt-6'>
                        {!checkoutId ? (
                            <button type='submit' className='w-full bg-black text-white rounded py-3 '>Continue to Payment</button>
                        )
                            :
                            <div>
                                <h3 className='text-lg mb-4'>Pay with Paypal</h3>
                                {/*Paypal component */}
                                <PayPalButton amount={100} onSuccess={handlePaymentSuccess} onError={(err) => alert("Payment failed.")} />
                            </div>}

                    </div>
                </form>

            </div>
            {/*Right Section */}
            <div className='bg-gray-50 p-6 rounded-lg'>
                <h3 className='text-lg mb-4'>Order Summary</h3>
                <div className='border-t py-4 mb-4'>
                    {cart.products.map((product, index) => {
                        return (
                            <div key={index} className='flex items-start justify-between py-2 border-b'>
                                <div className='flex items-start'>
                                    <img src={product.images} className='w-20 h-24 object-cover' alt="" />
                                </div>
                                <div>
                                    <h3 className='text-md'>{product.name}</h3>
                                    <p className='text-gray-500'>Size: {product.size}</p>
                                    <p className='text-gray-500'>Color: {product.color}</p>

                                </div>
                                <p className='text-xl'>${product.price?.toLocaleString()}</p>

                            </div>
                        )
                    })}
                </div>
                <div className='flex justify-between items-center text-lg mb-4'>
                    <p>Subtotal</p>
                    <p>${cart.totalPrice?.toLocaleString()}</p>
                </div>
                <div className='flex justify-between items-center text-lg'>
                    <p>Shipping</p>
                    <p>Free</p>
                </div>
                <div className='flex justify-between items-center text-lg mt-4 border-t pt-4'>
                    <p className='font-bold'>Total</p>
                    <p className='font-bold'>${cart.totalPrice?.toLocaleString()}</p>
                </div>

            </div>
        </div>
    )
}

export default Checkout