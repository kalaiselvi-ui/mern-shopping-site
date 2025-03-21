import React from 'react'
import { Link } from 'react-router-dom'
import mensCollectionImg from '../../assets/mens-collection.webp'
import womensCollectionImg from '../../assets/womens-collection.webp'


const GenderCollections = () => {
    return (
        <div className='py-16 px-4 lg:px-0'>
            <div className='container mx-auto flex flex-col md:flex-row gap-8'>
                <div className='relative flex-1'>
                    <img src={womensCollectionImg} alt="" className='w-full h-[700px] object-cover' />
                    <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
                        <h2 className='text-2xl font-bold text-gray-900 mb-3'>Women's Collections</h2>
                        <Link className='text-gray-900 underline' to="/collections/all?gender=Women"
                        >
                            Show Now
                        </Link>

                    </div>
                </div>
                <div className='relative flex-1'>
                    <img src={mensCollectionImg} alt="" className='w-full h-[700px] object-cover' />
                    <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
                        <h2 className='text-2xl font-bold text-gray-900 mb-3'>Men's Collections</h2>
                        <Link className='text-gray-900 underline' to="/collections/all?gender=Men"
                        >
                            Show Now
                        </Link>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default GenderCollections