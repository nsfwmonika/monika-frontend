"use client";
import { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button"
import Link from "next/link";
import Image from "next/image"
import { updateActiveMenu } from '@/utils/updateActiveMenu';
import CTAButton from "@/components/CTAButton";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { VideoItem } from "../../config/video/types"

interface GridVideoProps {
  title?: string
  modelNames: string,
  description?: string
  items: VideoItem[]
  viewAllLink?: string
  onItemClick?: (item: VideoItem) => void
}

export function GridVideoList({
  title = "Trends",
  modelNames,
  description = "",
  items,
  viewAllLink = "#",
  onItemClick
}: GridVideoProps) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<VideoItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<VideoItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [imageStyle, setImageStyle] = useState({});
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateLayout = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = 240;
        const gap = 16;
        const isMobileView = window.innerWidth < 768;
        setIsMobile(isMobileView);

        if (isMobileView) {
          setVisibleItems(items);
        } else {
          const itemsPerRow = Math.floor((containerWidth + gap) / (itemWidth + gap));
          const maxVisibleItems = itemsPerRow * 2;
          setVisibleItems(items.slice(0, maxVisibleItems));
        }
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [items, isClient]);

  const handleItemClick = (e: React.MouseEvent, item: VideoItem) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedItem(item);
    setOpen(true);
  }

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    setOpen(false);
  };

  useEffect(() => {
    const updateImageStyle = () => {
        setImageStyle({
          maxWidth: window.innerWidth < 754 ? "100%" : "auto",
          height: "100%",
        });
    };

    updateImageStyle();
    window.addEventListener('resize', updateImageStyle);

    return () => window.removeEventListener('resize', updateImageStyle);
}, []);



  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  useEffect(() => {
    if (open && videoRef.current) {
      const playVideo = async () => {
        try {
          videoRef.current!.muted = true;
          await videoRef.current?.play()
          setIsPlaying(true)
        } catch (error) {
        }
      }
      playVideo()
    } else {
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
        setIsPlaying(false)
      }
    }
  }, [open])

  return (
    <div className="w-full sm:px-6 py-2 md:py-10 mt-4" >
      <div className="mx-auto relative px-4 md:px-[60px] max-w-[1640px]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold"style={{
            fontSize:"16px"
          }}>{title}</h2>
          <Link
            href="https://t.me/nsfwmonika_bot"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="md:hidden"
          >
            <Button
              variant="outline"
              className="w-fit "
              onClick={() => {
                updateActiveMenu('Browse')
                window.location.href = `/browse?modelNames=${modelNames}`
              }}
              style={{
                borderRadius:"24px",
                height:"32px"
              }}
            >
              Start
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="M5 12l14 0"></path><path d="M13 18l6 -6"></path><path d="M13 6l6 6"></path></svg> */}
            </Button>
          </Link>
          <div className=" hidden md:flex">
            <CTAButton></CTAButton>
          </div>
        </div>

        <div
          ref={containerRef}
          className={`
          ${isMobile
              ? 'flex overflow-x-auto space-x-4 pb-4 gap-0 snap-x snap-mandatory'
              : 'grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-4 auto-rows-[220px]'
            }
        `}
          style={isMobile ? {} : { maxHeight: '456px', overflow: 'hidden' }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={index}
              className={`
              group 
              ${isMobile ? 'flex-shrink-0 w-[110px] md:w-[260px] snap-start' : ''}
            `}
              onClick={(e) => handleItemClick(e, item)}
            >
              <div className="relative w-full h-[180px] md:h-[180px] rounded-lg overflow-hidden cursor-pointer">
                <Image
                  src={item.result}
                  alt={item.prompt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  draggable={false}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{
                }}>
                  <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4591" width="40" height="40"><path d="M512 64C264.576 64 64 264.576 64 512s200.576 448 448 448 448-200.576 448-448S759.424 64 512 64zM414.656 726.272 414.656 297.728l311.616 190.464L414.656 726.272z" fill="#bfbfbf" p-id="4592"></path></svg>
                </div>
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

          <div className="video-dialog">
            <div className="video-container flex items-center flex-col md:flex-row">
              <div className="aspect-video w-full relative" style={imageStyle}>
                <video
                  ref={videoRef}
                  className="w-full object-cover"
                  playsInline
                  autoPlay
                  loop
                  preload="auto"
                  controls
                >
                  <source src={selectedItem?.original} type="video/mp4" />
                </video>

              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}

