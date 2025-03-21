import React from 'react';


const checkout = {
    _id: "12223",
    createdAt: new Date(),
    checkoutItems: [
        {
            productId: "1",
            name: "Jeans",
            color: "Whsite",
            size: "M",
            price: 150,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBqZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
        },
        {
            productId: "2",
            name: "T-Shirt",
            color: "White",
            size: "L",
            price: 100,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1652794118671-c56680d1a8f7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAzfHx3b21lbiUyMHRzaGlydCUyMGNhc3VhbHxlbnwwfHwwfHx8MA%3D%3D"
        },
    ],
    shippingAddress: {
        address: "123 school street",
        city: "Tenkasi",
        zipcode: "627857",
        country: "India"
    }
}

const OrderConfirmation = () => {


    const calculateEstimatedDelivery = (createdAt) => {
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate() + 10);
        return orderDate.toLocaleDateString();
    }

    return (
        <div className='max-w-4xl mx-auto p-6 bg-white'>
            <h1 className='text-4xl font-bold text-center text-emerald-700 mb-8'>
                Thank You for Your Order!
            </h1>
            {
                checkout && (
                    <div className='p-6 rounded-lg border'>
                        <div className='flex justify-between mb-20'>
                            <div>
                                <h2 className='text-xl font-semibold'>Order Id:{checkout._id}</h2>
                                <p className='text-gray-500'>Order date: {new Date(checkout.createdAt).toLocaleDateString()}</p>
                            </div>
                            { /*estimated Delivery */}
                            <div>
                                <p className='text-emerald-700 text-sm'>Estimated Delivery: {""}
                                    {calculateEstimatedDelivery(checkout.createdAt)}
                                </p>
                            </div>

                        </div>

                        {/*Ordered Items */}
                        <div className='mb-20'>
                            {checkout.checkoutItems.map((item) => (
                                <div key={item.productId} className='flex items-center mb-4'>
                                    <img src={item.image} alt="" className='w-16 h-16 object-cover rounded-md mr-4' />
                                    <div>
                                        <h4 className='text-md font-semibold'>{item.name}</h4>
                                        <p className='text-sm text-gray-500'>{item.color} | {item.size}</p>
                                    </div>
                                    <div className='ml-auto text-right'>
                                        <p className='text-md'>${item.price}</p>
                                        <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>

                                    </div>

                                </div>
                            ))}
                        </div>
                        {/*Payment and Delivery Info */}
                        <div className='grid grid-cols-2 gap-8'>
                            <div>
                                <h4 className='text-lg font-semibold mb-2'>Payment</h4>
                                <p className='text-gray-600'>PayPal</p>
                            </div>
                            <div>
                                <h4 className='text-lg font-semibold mb-2'>Delivery</h4>
                                <p className='text-gray-600'>{checkout.shippingAddress.address}</p>
                                <p className='text-gray-600'>{checkout.shippingAddress.city},{" "}{checkout.shippingAddress.country}</p>
                            </div>

                        </div>

                    </div>
                )
            }

        </div>
    )
}

export default OrderConfirmation