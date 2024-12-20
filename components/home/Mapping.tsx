"use client";
import React from "react";

const Mapping = ({ id}: { id: string;}) => {
  return (
    <>
      <section id={id} className="page-2 mx-auto w-full md:mt-32 md:mb-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pb-16 pt-16 md:mt-4 flex flex-col md:flex-row">
          <div className="w-full md:w-2/5 sm:pr-20 p-2-main mb-8 md:mb-0">
            <h2 className="mx-full mt-6 max-w-2xl text-4xl tracking-tight text-slate-700 dark:text-slate-400 text-left">
            Creator
            </h2>
            <ul>
              <li className="mt-6 md:mt-10">
                Whether it is text, images, audio or video, our AI models can generate high-quality, creative content to meet the diverse needs of brand marketing, social media, entertainment media and other fields.
              </li>
              <li className="my-6 md:my-8">
                Digital people give content creation a vivid personality. Through real-time interaction, creators can create a more vivid, three-dimensional and warm content experience, and narrow the emotional distance with users.
              </li>
              <li>
                Choosing us means choosing an all-round content creation expert, a partner who understands creativity, marketing and technology. Let us work together to use the power of AI to unleash unlimited possibilities and open a new era of content creation.
              </li>
            </ul>
          </div>

          <div className="w-full md:w-3/5 img-flex">
          
            <div className="img-column">
              <img className="p-img-contain i-1" src="/img/c/c_1.png" alt=" " />
              
              <img className="p-img-contain i-2" src="/img/c/c_2.png" alt=" " />

            </div>
            <div className="img-column mx-3">
              <img className="p-img-contain i-3" src="/img/c/c_3.png" alt=" " />
              <img className="p-img-contain i-4" src="/img/c/c_4.png" alt=" " />
              <img className="p-img-contain i-5" src="/img/c/c_5.png" alt=" " />
            </div>
            <div className="img-column">
              <img className="p-img-contain i-6" src="/img/c/c_6.png" alt=" " />
              <img className="p-img-contain i-7" src="/img/c/c_7.png" alt=" " />
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default Mapping;

