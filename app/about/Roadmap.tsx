"use client";
import React from "react";
const Roadmap = ({ id }: { id: string }) => {
  return (
    <>
      <section id={id} className="page-roadmap mx-auto w-full md:pt-10">
        <div className="roadmap text-center">
          <h3>Roadmap</h3>
        </div>
        <div className="roadmap-main mx-auto w-full max-w-7xl px-4 sm:px-6 pb-16 pt-16 md:mt-14">
          <div className="map-left">
            <img className="map-img" src="/map-ai.png" alt=" " />
          </div>

          <div className="q-box q-box-active mx-auto w-full max-w-5xl  flex items-center ">
            <div className="q-left">
            </div>
            <div className="q-box-active-main">
              <div className="q-content p-4 px-6 !rounded-[14px]">
                <div className="roadmap-img">
                  <img className="line-img" src="/logo.png" alt=" " />
                </div>
                <p className="q-title text-1xl">Now</p>

                <div className="q-lable">
                  <img className="card-item-img" src="/creator.png" alt=" " />
                  1.Chat companion
                </div>
                <div className="q-lable">
                  2.Multimodal creation of images, videos and audios
                </div>
                <div className="q-lable">
                  3.Creating a personalized digital human
                </div>
                <div className="q-lable">
                  4.Agent automation capabilities
                </div>
              </div>
            </div>

          </div>
          <div className="q-box q-box-line mx-auto w-full max-w-5xl  flex items-center ">
            <div className="q-left">
            </div>
            <div className="q-content p-4 px-6 !rounded-[14px]">
              <img className="card-item-img" src="/networks.png" alt=" " />
              <div className="q-lable">
                1.Add more creative capabilities
              </div>
              <div className="q-lable">
                2.Support serialization of works
              </div>
              <div className="q-lable">
                3.Digital people can operate autonomously and make profits
              </div>
            </div>
          </div>
          <div className="q-box mx-auto w-full max-w-5xl  flex items-center ">
            <div className="q-left">
            </div>
            <div className="q-content p-4 px-6 !rounded-[14px]">
              <img className="card-item-img" src="/blockchain.png" alt=" " />
              <div className="q-lable  pt-10">
                1.Introducing NFT copyright certification
              </div>
              <div className="q-lable">
                2.Open Heuristic Digital Human
              </div>
              <div className="q-lable">
                3.Digital people learn and issue tokens, and conduct on-chain transactions
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Roadmap;
