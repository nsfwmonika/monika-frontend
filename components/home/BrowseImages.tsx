"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { images, type ImageItem } from '../../config/images';

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

const BrowseImages = ({ id }: { id: string }) => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [messageTime, setMessageTime] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [listImgWidth, setListImgWidth] = useState('0');
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

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

  const handleClickOpen = (image: ImageItem, index: number) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const imageStyle = {
    width:windowWidth<754? "100%":"auto",
    maxHeight: `${windowHeight * 0.8 - 50}px`
  };

  return (
    <>
      <section id={id} className="page-3 mx-auto w-full">
        <div className="mx-auto w-full px-4 sm:px-6 pb-16 pt-16">
          {/* <div className="w-full sm:pr-20 p-2-main flex">
            <ul className="mx-auto md:flex items-center justify-center gap-6 tabs-menu">
              <li className="px-2 md:px-6">Featured</li>
              <li className="px-2 md:px-6">Trending</li>
              <li className="px-2 md:px-6">Random</li>
              <li className="px-2 md:px-6">New</li>
              <li className="px-2 md:px-6">Following</li>
            </ul>
          </div> */}

          <div className="w-full img-flex">
            <div className="img-column flex-grid-container flex flex-wrap items-end isolate dropdown-container">
              {images.map((item, i) => (
                <div onClick={() => handleClickOpen(item, i)} className="col-item flex-grid-cell flex justify-center items-end" key={i}
                  style={{
                    width: windowWidth<754?"50%":listImgWidth + "px",
                    height: (Number(listImgWidth) + 8) + "px"
                  }}>
                  <div className="tag">
                    Mixer
                  </div>
                  <div className="image-card flex justify-end items-center flex-col w-full h-full">
                    {/* {messageTime && (
                      <div className="desc">
                        <div className="desc-p">
                        </div>
                      </div>
                    )} */}
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
          {/* <DialogContent className="p-dialog flex flex-col w-full md:max-w-7xl max-w-[calc(100%-2rem)] rounded-3xl !p-0 !w-fit !rounded-[32px] !max-w-full"> */}
          <DialogContent className="p-dialog flex flex-col w-full md:max-w-7xl md:max-w-[calc(100%-2rem)] rounded-3xl !p-0 !w-[calc(100vw-32px)] md:!w-fit !rounded-[32px] !max-w-full mx-4 md:mx-0">
            <span className="close-icon" onClick={handleClose}>
              <svg id="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <path d="M53.66,48,43.31,37.66a8,8,0,0,1,0-11.32L53.66,16,48,10.34,37.66,20.69a8,8,0,0,1-11.32,0L16,10.34,10.34,16,20.69,26.34a8,8,0,0,1,0,11.32L10.34,48,16,53.66,26.34,43.31a8,8,0,0,1,11.32,0L48,53.66Z"></path>
              </svg>
            </span>

            <div className="mian-dialog">
              <div className="flex items-center flex-col md:flex-row">
                <div className="top-img-box"  style={imageStyle}>
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
                    selectedImage.child.map((item,i) =>(
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
      </section>
    </>
  );
};

export default BrowseImages;

