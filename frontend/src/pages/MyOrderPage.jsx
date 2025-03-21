import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyOrderPage = () => {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            const mockOrders = [
                {
                    _id: "12345",
                    createdAt: new Date(),
                    shippingAddress: { city: "Tenkasi", country: "India" },
                    orderItems: [
                        {
                            name: "Product 1",
                            image: "https://images.unsplash.com/photo-1636590416708-68a4867918f1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1lbiUyMGNhc3VhbCUyMHdlYXJ8ZW58MHx8MHx8fDA%3D",
                        },
                    ],
                    totalPrice: 100,
                    isPaid: true

                },
                {
                    _id: "1345",
                    createdAt: new Date(),
                    shippingAddress: { city: "Tenkasi", country: "Tamilnadu" },
                    orderItems: [
                        {
                            name: "Product 2",
                            image: "https://images.unsplash.com/photo-1709899684187-72d8fb998319?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tZW4lMjB0c2hpcnRzJTIwY2FzdWFsfGVufDB8fDB8fHww",
                        },
                    ],
                    totalPrice: 200,
                    isPaid: false

                }
            ];
            setOrders(mockOrders);
        }, 1000)
    }, [])

    const handleRowClick = (orderId) => {
        navigate(`/order/${orderId}`)
    }

    return (
        <div className='max-w-7xl m-auto p-4 sm:p-6'>
            <h2 className='text-4xl sm:text-2xl font-bold mb-6'>My Orders</h2>
            <div className='relative shadow-md sm:rounded-lg overflow-hidden'>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='py-2 px-4 sm:py-3'>Image</th>
                            <th className='py-2 px-4 sm:py-3'>Order Id</th>
                            <th className='py-2 px-4 sm:py-3'>Created</th>
                            <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
                            <th className='py-2 px-4 sm:py-3'>Items</th>
                            <th className='py-2 px-4 sm:py-3'>Price</th>
                            <th className='py-2 px-4 sm:py-3'>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order._id} onClick={() => handleRowClick(order._id)}
                                        className='border-b hover:border-gray-50 cursor-pointer'>
                                        <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                            <img src={order.orderItems[0].image} alt="" className='w-10 h-10 sm:w-12 object-cover rounded-lg' />

                                        </td>
                                        <td className='py-2 px-2 sm:py-4 sm:px-4'>#{order._id}</td>
                                        <td className='py-2 px-2 sm:py-4 sm:px-4'>{new Date(order.createdAt).toLocaleDateString()}{" "}
                                            {new Date(order.createdAt).toLocaleTimeString()}</td>
                                        <td className='py-2 px-2 sm:py-4 sm:px-4'>{order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}` : "N/A"}</td>
                                        <td className='py-2 px-2 sm:py-4 sm:px-4'>{order.orderItems.length}</td>
                                        <td className='py-2 px-2 sm:py-4 sm:px-4'>${order.totalPrice}</td>
                                        <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                            <span className={`${order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}>
                                                {order.isPaid ? "Paid" : "Pending"}
                                            </span>

                                        </td>

                                    </tr>
                                ))

                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 px-4 text-gray-500">
                                        You have no orders.
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default MyOrderPage