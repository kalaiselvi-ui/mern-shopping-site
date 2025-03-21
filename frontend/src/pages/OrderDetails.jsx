import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const OrderDetails = () => {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const mockOrderDetails = {
            _id: id,
            createdAt: new Date(),
            isPaid: true,
            isDelivered: false,
            paymentMethod: "Paypal",
            shippingMethod: "Standard",
            shippingAddress: { city: "Tenkasi", country: "India" },
            orderItems: [
                {
                    productId: "1",
                    name: "Jeans",
                    price: 150,
                    quantity: 1,
                    image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBqZWFuc3xlbnwwfHwwfHx8MA%3D%3D",

                },
                {
                    productId: "2",
                    name: "T-Shirt",
                    price: 100,
                    quantity: 1,
                    image: "https://images.unsplash.com/photo-1652794118671-c56680d1a8f7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAzfHx3b21lbiUyMHRzaGlydCUyMGNhc3VhbHxlbnwwfHwwfHx8MA%3D%3D"
                },
            ]

        };
        setOrderDetails(mockOrderDetails);
    }, [id])

    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className='text-2xl md:text-3xl font-bold mb-6'>Order Details</h2>
            {
                !orderDetails ? (
                    <p>No Order details found</p>
                ) : (
                    <div className='p-4 sm:p-6 rounded-lg border'>
                        <div className='flex flex-col sm:flex-row justify-between mb-6'>
                            <div>
                                <h3 className='text-lg: md:text-xl font-semibold'>
                                    Order Id: #{orderDetails._id}
                                </h3>
                                <p className='text-gray-600'>
                                    {new Date(orderDetails.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className='flex flex-col gap-y-2 item-start sm:item-end mt-4 sm:mt-0'>
                                <span className={`${orderDetails.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}>
                                    {orderDetails.isPaid ? "Approved" : "Pending"}

                                </span>
                                <span className={`${orderDetails.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-red-700"} px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}>
                                    {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}

                                </span>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
                            <div>
                                <h4 className='text-lg font-semibold mb-2'>Payment Info</h4>
                                <p>Payment Method: {orderDetails.paymentMethod}</p>
                                <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
                            </div>
                            <div>
                                <h4 className='text-lg font-semibold mb-2'>Shipping Info</h4>
                                <p>Shipping Method: {orderDetails.shippingMethod}</p>
                                <p>Address: {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country} `}</p>
                            </div>
                        </div>

                        <div className='overflow-x-auto'>
                            <h4 className='text-lg font-semibold mb-4'>Products</h4>
                            <table className='min-w-full textx-gray-600 mb-4'>
                                <thead className='bg-gray-100'>
                                    <tr>
                                        <th className='py-2 px-4'>Name</th>
                                        <th className='py-2 px-4'>Unit Price</th>
                                        <th className='py-2 px-4'>Quantity</th>
                                        <th className='py-2 px-4'>Total</th>

                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        orderDetails.orderItems.map((item) => (
                                            <tr key={item.productId} className='border-b'>
                                                <td className='py-2 px-4 flex items-center'>
                                                    <img src={item.image} alt="" className='w-12 h-12 object-cover rounded-lg mr-4' />
                                                    <Link to={`/product/${item.productId}`} className='text-blue-500 hover:underline'>
                                                        {item.name}
                                                    </Link>
                                                </td>
                                                <td className='py-2 px-4'> ${item.price}
                                                </td>
                                                <td className='py-2 px-4'> ${item.quantity}
                                                </td>
                                                <td className='py-2 px-4'> ${item.price * item.quantity}
                                                </td>


                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>
                        </div>

                        <button onClick={() => navigate('/my-orders')} className='text-blue-500 hover:underline'>
                            Back to My Orders
                        </button>
                    </div>
                )
            }

        </div>
    )
}

export default OrderDetails