"use client";
import CTAButton from "@/components/home/CTAButton";
const Hero = ({ id, }: { id: string;}) => {

  return (
    <>
      <section id={id} className="page-1 mx-auto w-full px-4 sm:px-6 lg:px-20 xl:px-30 2xl:px-36 pb-16 md:pt-24 md:px-8 text-center">
        <h1 className="heading">
          <p className="ps-1">Heuristic <em className="">Agent</em></p>
          <p className="md:mt-4 ps-2">easily implement your creativity</p>
        </h1>

        <p className="ps-3 mx-auto mt-10 max-w-4xl text-2xl tracking-tight dark:text-slate-400">
        Our AI platform and digital humans are versatile intelligent creation engines. From text and images to audio and video, we provide creators with high-quality, creative content while actively integrating blockchain technology to explore new frontiers of content monetization.
        </p>
      </section>
      <CTAButton></CTAButton>
    </>
  );
};

export default Hero;
