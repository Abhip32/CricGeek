import React from 'react'
import Image from 'next/image'

interface HeroProps {
    image?: string;
    title1?: string;
    title2?: string;
    subtitle?: string;
}

const Hero = ({ image, title1, title2, subtitle }: HeroProps) => {
    return (
        <div>
            <section
                style={{
                    backgroundImage: image ? `url('${image}')` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative'
                }}
            >
                <div
                    className="absolute inset-0 bg-black/10 bg-gradient-to-r from-black/95 to-transparent"
                ></div>

                <div
                    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-[80vh] lg:items-center lg:px-8"
                >
                    <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                            {title1}
                            <strong className="block font-extrabold text-red-700">
                                {title2}
                            </strong>
                        </h1>
                        <h4 className='text-white'>{subtitle}</h4>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero