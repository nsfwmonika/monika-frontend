"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { updateActiveMenu } from '@/utils/updateActiveMenu';
import CTAButton from "@/components/CTAButton";
import Link from "next/link";

import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog";
import { ImageItem } from "../../config/images/types"

interface GridImgProps {
    title?: string
    modelNames: string
    description?: string
    items: ImageItem[]
    viewAllLink?: string
    onItemClick?: (item: ImageItem) => void
}

export function GridImgList({
    title = "Face transplant",
    modelNames,
    description = "",
    items,
    viewAllLink = "#",
    onItemClick
}: GridImgProps) {
    const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const [displayItems, setDisplayItems] = useState<ImageItem[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [gridHeight, setGridHeight] = useState(360);
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [imageStyle, setImageStyle] = useState({});
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const calculateGridHeight = () => {
            setTimeout(() => {
                if (introRef.current) {
                    const introHeight = introRef.current.offsetHeight;
                    // setGridHeight(items.length > 2 ? introHeight * 2 + 16 : introHeight + 16);
                    setGridHeight(introHeight + 16);
                }
            }, 100);
        };

        calculateGridHeight();
        if (isClient) {
            window.addEventListener('resize', calculateGridHeight);
            return () => window.removeEventListener('resize', calculateGridHeight);
        }
    }, [items.length, isClient]);

    useEffect(() => {
        setIsContentVisible(true);

        const visibilityTimer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(visibilityTimer);
    }, []);


    useEffect(() => {
        const calculateVisibleItems = () => {
            if (!containerRef.current) return;

            const containerWidth = containerRef.current.clientWidth;
            const itemWidth = 200;
            const gap = 10;
            const introWidth = 420;

            const firstRowItems = Math.floor((containerWidth - introWidth - gap) / (itemWidth + gap));
            const secondRowItems = Math.floor(containerWidth / (itemWidth + gap));

            const maxItems = firstRowItems + secondRowItems;
            setDisplayItems(items.slice(0, maxItems));
        };

        calculateVisibleItems();
        window.addEventListener('resize', calculateVisibleItems);
        return () => window.removeEventListener('resize', calculateVisibleItems);
    }, [items]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || window.innerWidth >= 768) return;
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !containerRef.current || window.innerWidth >= 768) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleItemClick = (e: React.MouseEvent, item: ImageItem) => {
        if (isDragging) return;
        e.preventDefault();
        e.stopPropagation();
        setSelectedImage(item);
        setOpen(true);
    }
    useEffect(() => {
        setIsClient(true);
    }, []);
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

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={`w-full overflow-hidden py-4 md:py-10 transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative px-4 md:px-[60px] mx-auto max-w-[1640px]">
                <div className="flex justify-between block md:hidden mb-3">
                    <span className="text-xl mb-2" style={{
                        fontSize: "16px"
                    }}>{title}</span>
                    <Link
                        href="https://t.me/nsfwmonika_bot"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                    >
                        <Button
                            variant="outline"
                            className="w-fit"
                            style={{
                                borderRadius: "24px",
                                height: "32px"
                            }}
                        >
                            Start
                        </Button>
                    </Link>
                </div>

                {/* pc */}
                <div
                    ref={containerRef}
                    className="hidden md:grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4"
                    style={{
                        height: `${gridHeight}px`,
                        overflow: 'hidden',
                    }}
                >
                    {isContentVisible && (
                        <>
                            <div className="col-span-2 p-4">
                                <h4 className="text-xl font-bold mb-8">{title}</h4>
                                <CTAButton href=""></CTAButton>
                            </div>
                            {displayItems.map((item, index) => (
                                <div
                                    key={`desktop-${index}`}
                                    className="image-item"
                                    onClick={(e) => handleItemClick(e, item)}
                                >
                                    <div
                                        ref={introRef}
                                        className="relative cursor-pointer w-full rounded-[14px] overflow-hidden"
                                        style={{ aspectRatio: '7/9' }}
                                    >
                                        <Image
                                            src={item.result}
                                            alt={item.prompt}
                                            fill
                                            className="object-cover rounded-[14px]  transition-transform duration-300 hover:scale-110"
                                            draggable={false}
                                        />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
                {/* app-x */}
                <div
                    ref={containerRef}
                    className="md:hidden flex gap-2 overflow-x-auto no-scrollbar"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    style={{
                        cursor: isDragging ? 'grabbing' : 'grab'
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={`mobile-${index}`}
                            className="flex-none w-[110px]"
                            onClick={(e) => handleItemClick(e, item)}
                            style={{
                                display: item.show ? "block" : "none"
                            }}
                        >
                            <div
                                className="relative cursor-pointer w-full"
                                style={{ aspectRatio: '7/9' }}
                            >
                                <Image
                                    src={item.result}
                                    alt={item.prompt}
                                    fill
                                    className="object-cover rounded-[14px]"
                                    draggable={false}
                                />
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
        </div>
    )
}

