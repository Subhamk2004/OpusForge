"use client"
import React, { useState, useEffect } from 'react'
import Marquee from 'react-fast-marquee'

function Testimonials({ whichPage }) {
    const [loadedCards, setLoadedCards] = useState([]);

    const testimonialsData = [
        {
            username: 'Darkars33',
            feedback: 'Finally built my portfolio without touching a single line of code. Took me 8 minutes start to finish!',
            image: 'https://res.cloudinary.com/dpazarvil/image/upload/v1756011539/assets/nb8kjx32rixiarw5iemo.webp',
            timestamp: '2 days ago'
        },
        {
            username: 'Shorabh9',
            feedback: 'The GitHub integration is seamless. My portfolio went live automatically - I didn\'t even realize it happened.',
            image: 'https://res.cloudinary.com/dpazarvil/image/upload/v1756011586/assets/y5pekmfavpjha9pmuswf.webp',
            timestamp: '5 days ago'
        },
        {
            username: 'Pranay Rahar',
            feedback: 'Resume auto-fill actually works! Saved me hours of copying and pasting content into different sections.',
            image: 'https://res.cloudinary.com/dpazarvil/image/upload/v1756011568/assets/pezuwueabydg5gql3zfj.webp',
            timestamp: '1 week ago'
        },
        {
            username: 'Drockparashar',
            feedback: 'No more explaining git commands to my designer friends. Just send them this link and they\'re done.',
            image: 'https://res.cloudinary.com/dpazarvil/image/upload/v1756011551/assets/jko7y43dtzqnrdlxlnyz.webp',
            timestamp: '3 days ago'
        },
        {
            username: 'Subhamk2004',
            feedback: 'cant believe how easy this was. Like editing a text document!',
            image: 'https://res.cloudinary.com/dpazarvil/image/upload/v1756011524/assets/mesec5fhxzepwwjeu9si.webp',
            timestamp: '6 days ago',
            short: true
        },
        {
            username: 'Argus-66',
            feedback: 'Love that I get clean HTML/CSS code I can modify later. Not locked into some platform forever.',
            image: 'https://res.cloudinary.com/dpazarvil/image/upload/v1756011497/assets/gfwrj4afixlpooljlasx.jpg',
            timestamp: '4 days ago'
        },
        {
            username: 'Mereoleona22',
            feedback: 'GitHub integration just works. Love it!',
            image: 'https://res.cloudinary.com/dpazarvil/image/upload/v1756011581/assets/vamxymc4yysocupzrzpl.webp',
            timestamp: '1 day ago',
            short: true
        },
        {
            username: 'Sahilsb369',
            feedback: 'Thanks to OpusForge, it helped me land my first internship. The recruiters were impressed!',
            image: 'https://res.cloudinary.com/dpazarvil/image/upload/v1756011563/assets/cflwqpugmpwbms0prf2m.webp',
            timestamp: '1 week ago'
        },
        {
            username: 'Kaushalvyasofficial',
            feedback: 'Really needed that live preview feature. Made tweaking the design so much easier.',
            image: 'https://res.cloudinary.com/dpazarvil/image/upload/v1756011512/assets/w0dahiywrgknp7fkzisp.webp',
            timestamp: '5 days ago'
        }
    ]

    // Staggered loading animation
    useEffect(() => {
        testimonialsData.forEach((_, index) => {
            setTimeout(() => {
                setLoadedCards(prev => [...prev, index]);
            }, index * 150);
        });
    }, []);

    const getBorderRadius = (index) => {
        const radiuses = ['rounded-2xl', 'rounded-[18px]', 'rounded-[20px]', 'rounded-[16px]'];
        return radiuses[index % radiuses.length];
    };

    const getBackgroundOpacity = (index) => {
        const opacities = ['bg-opacity-20', 'bg-opacity-25', 'bg-opacity-15', 'bg-opacity-30'];
        return opacities[index % opacities.length];
    };

    const getHoverTransform = (index) => {
        const transforms = [
            'hover:-rotate-2 hover:translate-x-1',
            'hover:rotate-1 hover:-translate-x-1',
            'hover:-rotate-1 hover:translate-y-1',
            'hover:rotate-2 hover:-translate-y-1'
        ];
        return transforms[index % transforms.length];
    };

    return (
        <div className="w-full mt-10 mb-5">
            {/* Heading */}
            <div className="text-center">
                {
                    whichPage === 'signin' ? (
                        <p className="text-gray-500 text-sm lg:text-base">
                            Join 500+ creators building better portfolios
                        </p>
                    ) : null
                }
                {
                    whichPage === "home" && (
                        <div className='mb-0 lg:my-10 text-2xl md:text-3xl lg:text-5xl font-semibold'>
                            <h2 className=" mb-2">
                                Don't take our word for it
                            </h2>
                            <h2 className="mb-2">
                                Hear it from <span className='text-textPurple'>500+</span> users
                            </h2>
                        </div>
                    )
                }
            </div>

            {/* Testimonials Marquee */}
            <Marquee pauseOnHover={true} speed={40} gradient={false}>
                <div className="flex gap-6 md:gap-8 lg:gap-10 p-4 md:p-5">
                    {testimonialsData.map((testimonial, index) => (
                        <div 
                            key={index} 
                            className={`
                                w-[100px] md:w-[550px] lg:w-[350px] h-auto min-w-[250px] md:max-w-[300px] lg:max-w-[350px] 
                                bg-[#cacac0] ${getBackgroundOpacity(index)} backdrop-blur-lg ${getBorderRadius(index)} 
                                p-4 lg:p-5 flex flex-col items-center text-center shadow-md 
                                hover:shadow-lg ${getHoverTransform(index)} hover:scale-105 
                                transition-all duration-300 ease-out
                                ${loadedCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                            `}
                           
                        >
                            <div className='flex flex-row justify-start items-center mb-4 gap-4 w-full'>
                                <div className="relative">
                                    <img 
                                        src={testimonial.image} 
                                        alt={testimonial.username} 
                                        className="w-10 md:w-16 h-10 md:h-16 rounded-full object-cover ring-2 ring-white ring-opacity-50" 
                                    />
                                   
                                </div>
                                <div className="flex-1 text-left">
                                    <h3 className="text-base md:text-lg lg:text-xl font-semibold">{testimonial.username}</h3>
                                    {/* <p className="text-xs text-gray-500">{testimonial.timestamp}</p> */}
                                </div>
                            </div>

                            {/* Quote with icon */}
                            <div className="w-full">
                                <div className="flex justify-start mb-2">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                                    </svg>
                                </div>
                                <div className="rounded flex justify-center">
                                    <p className={`
                                        text-xs md:text-sm lg:text-base italic font-medium text-gray-900 
                                        w-[85%] leading-relaxed text-left
                                        ${testimonial.short ? 'text-center font-semibold' : ''}
                                    `}>
                                        {testimonial.feedback}
                                    </p>
                                </div>
                                <div className="flex justify-end mt-2">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400 rotate-180" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Marquee>
        </div>
    )
}

export default Testimonials