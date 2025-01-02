'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const Slider = dynamic(() => import('react-slick'), {
    ssr: false,
})

const images = [{
    pc: '/banner/1.png',
    app: "/banner/1-app.png",
    title:"FaceSwapping",
    desc:"Material and replacement"
}, {
    pc: '/banner/2.png',
    app: "/banner/2-app.png",
    title:"Replacement",
    desc:""
},
{
    pc: '/banner/5.png',
    app: "/banner/5-app.png",
    title:"Image-to-Image Translation",
    desc:"Convert real person pictures to anime"
}, {
    pc: '/banner/6.png',
    app: "/banner/6-app.png",
    title:"Text to Image",
    desc:""
},{
    pc: '/banner/7.png',
    app: "/banner/7-app.png",
    title:"Image-to-Image Translation",
    desc:""
},{
    pc: '/banner/8.png',
    app: "/banner/8-app.png",
    title:"Virtual Character",
    desc:""
},
]

export default function Banner() {
    const [isClient, setIsClient] = useState(false)
    const [messageTime, setMessageTime] = useState(false);
    const [headerImgNumber, setHeaderImgNumber] = useState(3)
    const [isVisible, setIsVisible] = useState(false)

    const calculateListImgWidth = (w: number) => {
        if (w < 754) {
            return 1;
        } else if (w >= 754 && w < 992) {
            return 1;
        } else if (w >= 992 && w < 1235) {
            return 1;
        } else if (w >= 1235 && w < 1472) {
            return 1;
        } else if (w >= 1472 && w < 1680) {
            return 3;
        } else {
            return 3;
        }
    };

    useEffect(() => {
        setIsClient(true);

        const timer = setTimeout(() => {
            setMessageTime(true);
        }, 3000);

        const handleResize = () => {
            if (typeof window !== 'undefined') {
                const w = window.innerWidth;
                const newHeaderImgNumber = calculateListImgWidth(w);
                setHeaderImgNumber(newHeaderImgNumber);
            }
        };

        handleResize();

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
        }

        const visibilityTimer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }
            clearTimeout(timer);
            clearTimeout(visibilityTimer);
        };

    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: headerImgNumber,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 30000,
        arrows: true,
        centerMode: true,
        centerPadding: '350px',
        className: "w-full mx-auto",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '50px',
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '30px',
                }
            }
        ]
    }

    if (!isClient) {
        return (
            <div className="w-full max-w-6xl mx-auto h-[400px] bg-gray-10 animate-pulse" />
        )
    }

    return (
        <div className={`banner-container w-full mx-auto md:px-8 transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="relative">
                        <div className="relative h-[170px] md:h-[350px] lg:h-[240px] xl:h-[250px] 2xl:h-[250px] overflow-hidden !rounded-[18px] transition-all duration-300 bg-gray-10"
                            style={{
                                backgroundImage: `url('/banner/card-background${index+1}.png')`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover"
                            }}
                        >
                            <Image
                                src={image.pc}
                                alt={`Slide ${index + 1}`}
                                fill
                                className="banner-pc hidden md:block object-contain transition-transform duration-300 hover:scale-105"
                                priority={index === 0}
                            />
                            <Image
                                src={image.app}
                                alt={`Slide ${index + 1}`}
                                fill
                                className="banner-app md:hidden object-contain transition-transform duration-300 hover:scale-105"
                                priority={index === 0}
                            />
                            <div className='absolute px-2 px-4 md:py-2 text-white bottom-1 md:bottom-2 flex items-center'
                                style={{
                                    color: "#191b20",
                                }}>
                                <span className='font-bold' style={{
                                    lineHeight: "20px",
                                    fontFamily:"SemiBold",
                                    fontWeight:"700"
                                }}>{image.title}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

