"use client";
import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { videoMo, type VideoItem } from '../../config/video';

const calculateListImgWidth = (w: number) => {
  if (w < 754) {
    return `${(w - 110) / 2}`;
  } else if (w >= 754 && w < 992) {
    return `${(w - 150) / 3}`;
  } else if (w >= 992 && w < 1235) {
    return `${(w - 150) / 4}`;
  } else if (w >= 1235 && w < 1472) {
    return `${(w - 180) / 5}`;
  } else if (w >= 1472 && w < 1680) {
    return `${(w - 210) / 6}`;
  } else {
    return `${(w - 210) / 6}`;
  }
};

const VideoModel = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [messageTime, setMessageTime] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [listImgWidth, setListImgWidth] = useState('0');
  const [selectedImage, setSelectedImage] = useState<VideoItem | null>(null);
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    setListImgWidth(calculateListImgWidth(window.innerWidth));

    const timer = setTimeout(() => {
      setMessageTime(true);
    }, 3000);

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      const w = window.innerWidth;
      setWindowWidth(w);
      setListImgWidth(calculateListImgWidth(w));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = (videoMo: VideoItem, index: number) => {
    setSelectedImage(videoMo);
    setOpen(true);
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    setOpen(false);
  };

  const imageStyle = {
    maxWidth: windowWidth < 754 ? "100%" : "auto",
    height: "100%",
  };

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
    <>
      <section className="page-3 mx-auto w-full">
        <div className="mx-auto w-full px-4 sm:px-6 pb-16">
          <div className="w-full img-flex">
            <div className="img-column flex-grid-container flex flex-wrap items-end isolate dropdown-container">
              {videoMo.map((item, i) => (
                <div onClick={() => handleClickOpen(item, i)} className="col-item flex-grid-cell flex justify-center items-end" key={i}
                  style={{
                    width: windowWidth < 754 ? "50%" : listImgWidth + "px",
                    height: (Number(listImgWidth) + 8) + "px"
                  }}>
                  <div className="tag">
                    Mixer
                  </div>
                  <div className="play">
                    <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4591" width="60" height="60"><path d="M512 64C264.576 64 64 264.576 64 512s200.576 448 448 448 448-200.576 448-448S759.424 64 512 64zM414.656 726.272 414.656 297.728l311.616 190.464L414.656 726.272z" fill="#bfbfbf" p-id="4592"></path></svg>
                  </div>
                  <div className="image-card flex justify-end items-center flex-col w-full h-full">
                    <img
                      className="image block relative shadow-[0_0_0_1px_rgba(0,0,0,0.1)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.1)] rounded-[14px]"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: 'cover',
                        borderRadius: '14px !important'
                      }}
                      src={item.result}
                      alt="Mixer"
                    />
                  </div>
                </div>
              ))}
            </div>
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
                    <source src={selectedImage?.original} type="video/mp4" />
                  </video>

                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
};

export default VideoModel;

