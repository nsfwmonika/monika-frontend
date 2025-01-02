"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"
import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog";
import { useSearchParams } from 'next/navigation';
import { ImageItem } from "../../config/images/types"

interface ImagePost {
    id: number
    imageUrl: string
    likes: number
    comments: number
    views: number
    stars: number
}

const Browse = () => {
    const [isMenuActive, setIsMenuActive] = useState('Creation');

    const searchParams = useSearchParams()
    const [type, setType] = useState<string | null>(null)
    const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const typeParam = searchParams?.get('type')
        if (typeParam !== undefined) {
            setType(typeParam)
        }
    }, [searchParams])

    const links = [
        { label: "Face Swap", href: "#" },
        { label: "Anime-to-Real", href: "#" },
        { label: "Real-to-Anime", href: "#" },
        { label: "Deepfake", href: "#" },
    ];

    const images: ImagePost[] = [
        {
            id: 1,
            imageUrl: "/img/anime-transfer/anime-transfer-1-1.png",
            likes: 1410,
            comments: 305,
            views: 222,
            stars: 144
        },
        {
            id: 2,
            imageUrl: "/img/anime-transfer/anime-transfer-2-1.png",
            likes: 3359,
            comments: 422,
            views: 218,
            stars: 72
        },
        {
            id: 3,
            imageUrl: "/img/anime-transfer/anime-transfer-4-1.png",
            likes: 1410,
            comments: 305,
            views: 222,
            stars: 144
        },
        {
            id: 4,
            imageUrl: "/img/anime-transfer/anime-transfer-2-1.png",
            likes: 3359,
            comments: 422,
            views: 218,
            stars: 72
        },
        {
            id: 5,
            imageUrl: "/img/anime-transfer/anime-transfer-3-1.png",
            likes: 1410,
            comments: 305,
            views: 222,
            stars: 144
        },
        {
            id: 6,
            imageUrl: "/img/anime-transfer/anime-transfer-2-1.png",
            likes: 3359,
            comments: 422,
            views: 218,
            stars: 72
        },
        {
            id: 7,
            imageUrl: "/img/anime-transfer/anime-transfer-4-1.png",
            likes: 1410,
            comments: 305,
            views: 222,
            stars: 144
        },
        {
            id: 8,
            imageUrl: "/img/anime-transfer/anime-transfer-2-1.png",
            likes: 3359,
            comments: 422,
            views: 218,
            stars: 72
        },
        {
            id: 9,
            imageUrl: "/img/anime-transfer/anime-transfer-1-1.png",
            likes: 1410,
            comments: 305,
            views: 222,
            stars: 144
        },
        {
            id: 10,
            imageUrl: "/img/anime-transfer/anime-transfer-2-1.png",
            likes: 3359,
            comments: 422,
            views: 218,
            stars: 72
        },
        {
            id: 11,
            imageUrl: "/img/anime-transfer/anime-transfer-1-1.png",
            likes: 1410,
            comments: 305,
            views: 222,
            stars: 144
        },
        {
            id: 12,
            imageUrl: "/img/anime-transfer/anime-transfer-2-1.png",
            likes: 3359,
            comments: 422,
            views: 218,
            stars: 72
        },
        {
            id: 13,
            imageUrl: "/img/anime-transfer/anime-transfer-3-1.png",
            likes: 1410,
            comments: 305,
            views: 222,
            stars: 144
        },
        {
            id: 14,
            imageUrl: "/img/anime-transfer/anime-transfer-2-1.png",
            likes: 3359,
            comments: 422,
            views: 218,
            stars: 72
        }, {
            id: 15,
            imageUrl: "/img/anime-transfer/anime-transfer-4-1.png",
            likes: 1410,
            comments: 305,
            views: 222,
            stars: 144
        },
    ]

    const handleItemClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const [imageStyle, setImageStyle] = useState({});

    useEffect(() => {
        const updateImageStyle = () => {
            setImageStyle({
                width: window.innerWidth < 754 ? "100%" : "auto",
                maxHeight: `${window.innerHeight * 0.8 - 50}px`
            });
        };

        updateImageStyle();
        window.addEventListener('resize', updateImageStyle);

        return () => window.removeEventListener('resize', updateImageStyle);
    }, []);


    return (
        <main className="flex flex-col items-center">
            <div className="header-module">
                <ul className="hidden md:flex items-center justify-center gap-6 header-menu">
                    {links.map((link) => (
                        <li key={link.label} onClick={() => { setIsMenuActive(link.label) }}
                            className={isMenuActive === link.label ? "menu-active" : ""}>
                            <Link
                                href={`/${link.href}`}
                                aria-label={link.label}
                                className="tracking-wide transition-colors duration-200 font-normal"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-full px-2 sm:px-4 mt-8">
                <div className="columns-3 sm:columns-4 md:columns-5 lg:columns-6 xl:columns-7 gap-1 sm:gap-2 space-y-1 sm:space-y-2">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="px-1 break-inside-avoid rounded-lg overflow-hidden bg-background shadow hover:shadow-md transition-shadow duration-300"
                            onClick={(e) => handleItemClick(e)}
                        >
                            <div className="relative group">
                                <Image
                                    src={image.imageUrl}
                                    alt="Artwork"
                                    width={150}
                                    height={150}
                                    className="w-full h-auto object-cover rounded-[14px]"
                                />
                            </div>
                            <div className="p-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <Dialog open={open} onOpenChange={handleClose}>
                <DialogContent className="p-dialog flex flex-col w-full md:max-w-7xl md:max-w-[calc(100%-2rem)] rounded-3xl !p-0 !w-[calc(100vw-32px)] md:!w-fit !rounded-[32px] !max-w-full mx-4 md:mx-0">
                    <span className="close-icon" onClick={handleClose}>
                        <svg id="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                            <path d="M53.66,48,43.31,37.66a8,8,0,0,1,0-11.32L53.66,16,48,10.34,37.66,20.69a8,8,0,0,1-11.32,0L16,10.34,10.34,16,20.69,26.34a8,8,0,0,1,0,11.32L10.34,48,16,53.66,26.34,43.31a8,8,0,0,1,11.32,0L48,53.66Z"></path>
                        </svg>
                    </span>

                    <div className="mian-dialog">
                        <div className="flex items-center flex-col md:flex-row">
                            <div className="top-img-box" style={imageStyle}>
                                <img className="see-image" src={selectedImage?.result} style={imageStyle} alt="" />
                            </div>
                            <div className="tips">
                                <p className="title text-center">Image Prompt:</p>
                                <div className="bg-pageBackground rounded-2xl p-2 px-4 cursor-copy overflow-y-auto max-w-[280px]">
                                    <p className="text-style-longform text-sm">
                                        {selectedImage?.prompt}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="da-footer flex-col md:flex-row">
                            {
                                selectedImage?.child && (
                                    selectedImage.child.map((item, i) => (
                                        <div className="img-box mb-4 md:mr-8" key={(i)}>
                                            <img className="footer-image rounded-[14px]" src={item} alt="" />
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </main>
    );
};

export default Browse;

