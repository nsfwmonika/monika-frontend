"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const Reward = ({ id, }: { id: string; }) => {
  return (
    <>
      <section id={id} className="page-reward mx-auto w-full px-4 sm:px-6 lg:px-20 xl:px-30 2xl:px-36 pb-16 pt-16 md:pt-24 md:px-8 text-center">
        <div className="reward-content flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2 aspect-[3/2] relative overflow-hidden image-left flex items-center justify-center">
            <div className="link-bj w-full h-full relative flex items-center justify-center">
              <img className="rounded-lg" src="/Register.png" alt="" />
            </div>
          </div>
          <div className="w-full md:w-1/2 text-left">
            <h2 className="font-semibold mb-4 text-4xl">Register</h2>
            <div className="text-gray-400 text-base my-[30px] text-2xl">
              <p>
                Exciting News! We&apos;re thrilled to announce our exclusive invitation and registration event, designed to introduce you to the groundbreaking world of our AI content creation platform and digital human technology.
              </p>
              <p className="my-4">
                Don&apos;t miss out on this incredible opportunity to transform your content strategy and unlock new possibilities for your brand. Register now and join the ranks of forward-thinking companies who are leveraging the power of AI and blockchain to create, innovate, and inspire.
              </p>
              <p>
                We can&apos;t wait to welcome you to our community and embark on this exciting journey together. Sign up today and let&apos;s start creating the future of content!
              </p>

            </div>

            <div className="card-btn mt-8">
              <div className="btn-item">
                <img className="btn-bj" src="/btn.png" alt="" />

                <Button
                  variant="default"
                  className="flex items-center gap-2 text-white hero-btn"
                  aria-label="Get Boilerplate"
                >
                  <Link
                    href="https://t.me/nsfwmonika_bot"
                    target="_blank"
                    aria-label="Register"
                    className="flex items-center space-x-1 font-bold text-2xl"
                  >
                    Register
                  </Link>

                </Button>

              </div>
            </div>
          </div>
        </div>

        <div className="reward-content flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8 my-[100px]">
          <div className="w-full md:w-1/2 text-left">
            <h2 className="font-semibold mb-4 text-4xl">Invite</h2>
            <div className="text-gray-400 text-base my-[30px] text-4xl">
              <p>
                Exciting News! We&apos;re thrilled to announce our exclusive invitation event, designed to introduce you to the groundbreaking world of our AI content creation platform and digital human technology.
              </p>
              <p className="mt-4">
                Invite friends to join through your exclusive link and enjoy points rewards. You can also get cash rewards up to <em style={{
                  fontWeight: "700",
                  color: "#ffffff",
                  fontSize: "18px"
                }}>
                  50%</em> of the user&apos;s recharge amount.
              </p>
            </div>
            <div className="card-btn mt-8">
              <div className="btn-item">
                <img className="btn-bj" src="/btn.png" alt="" />
                <Button
                  variant="default"
                  className="flex items-center gap-2 text-white hero-btn"
                  aria-label="Get Boilerplate"
                >
                  <Link
                    href="https://t.me/nsfwmonika_bot"
                    target="_blank"
                    aria-label="Invite"
                    className="flex items-center space-x-1 font-bold text-2xl"
                  >
                    Invite
                  </Link>
                </Button>
              </div>
            </div>

          </div>

          <div className="w-full md:w-[50%] relative"
            style={{
              aspectRatio: "4/3",
            }}>
            <img src="/Invite.png" alt="" className="absolute inset-0 w-full object-contain" />
          </div>
        </div>

      </section>
    </>
  );
};

export default Reward;
