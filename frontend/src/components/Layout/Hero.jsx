import React from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../../assets/heroImg.webp'

const Hero = () => {
    return (
        <div>
            <section className='relative'>
                <img src={heroImg} alt="" className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover' />
                <div className='absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center'>
                    <div className='text-center text-white p-6'>
                        <h1 className='text-4xl md:text-9xl tracking-tighter mb-4 uppercase font-bold'>Vocation
                            <br />Ready</h1>
                        <p className='text-sm tracking-tighter md:text-lg mb-6'>Explore our vocation-ready outfits with a fast worldwide shipping.</p>
                        <Link to="#" className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg hover:bg-white/55">Shop Now</Link>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Hero