import React from 'react'
import Hero from '../components/Layout/Hero'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import GenderCollections from '../components/Products/GenderCollections'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'

const placeholderProducts = [

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
        price: 120,
        images: "https://images.unsplash.com/photo-1578870495764-9fd217ec7e65?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWVuJTIwamVhbnMlMjB3ZWFyfGVufDB8fDB8fHww"

    },
    {
        _id: 7,
        name: "Product 7",
        price: 120,
        images: "https://images.unsplash.com/photo-1665816152071-4cccdeeb1583?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWVuJTIwamVhbnMlMjB3ZWFyfGVufDB8fDB8fHww"

    },
    {
        _id: 8,
        name: "Product 7",
        price: 120,
        images: "https://images.unsplash.com/photo-1544839430-0db50362f8be?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWVuJTIwdHNoaXJ0JTIwd2VhcnxlbnwwfHwwfHx8MA%3D%3D"

    },


]

const Home = () => {
    return (
        <div>
            <Hero />
            <GenderCollections />
            <NewArrivals />
            {/*Best Seller */}
            <h2 className='text-center font-bold text-3xl'>Best Seller</h2>
            <ProductDetails />
            <div className='container mx-auto'>
                <h2 className='text-3xl text-center font-bold mb-4'>
                    Top Wears for women
                </h2>
                <ProductGrid products={placeholderProducts} />

            </div>

            <FeaturedCollection />
            <FeaturesSection />
        </div>
    )
}

export default Home