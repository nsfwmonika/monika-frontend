import { Button } from "@/components/ui/button";
import Link from "next/link";


interface CTAButtonProps {
  href?: string;
  text?: string;
}

const CTAButton =  ({ href, text }: CTAButtonProps) => {
  const styleBtn = {
    backgroundImage: "linear-gradient(135deg,#926aff 0%,#ff77b0 50%,#ffb367 100%)"
  }
  return (
    <Link
      href={href || "https://t.me/nsfwmonika_bot"}
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      <Button
        variant="default"
        className="flex items-center gap-2 text-white hero-btn"
        aria-label="Get Boilerplate"
        style={styleBtn}
      >
        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7832" width="25" height="25"><path d="M609.92 341.333333c0-62.933333 51.626667-113.92 115.413333-113.92v-28.16c-63.744 0-115.413333-50.986667-115.413333-113.92h-25.173333c0 62.933333-51.626667 113.92-115.413334 113.92v28.16c63.744 0 115.413333 50.986667 115.413334 113.92h25.173333zM597.333333 497.493333v-56.32c-127.488 0-230.826667-101.973333-230.826666-227.84H316.16c0 125.866667-103.338667 227.84-230.826667 227.84v56.32c127.488 0 230.826667 101.973333 230.826667 227.84h50.346667c0-125.866667 103.338667-227.84 230.826666-227.84z m298.666667-14.08v-28.16c-63.744 0-115.413333-50.986667-115.413333-113.92h-25.173334c0 62.933333-51.626667 113.92-115.413333 113.92v28.16c63.744 0 115.413333 50.986667 115.413333 113.92h25.173334c0-62.933333 51.626667-113.92 115.413333-113.92z m-213.333333 298.666667v-28.16c-63.744 0-115.413333-50.986667-115.413334-113.92h-25.173333c0 62.933333-51.626667 113.92-115.413333 113.92v28.16c63.744 0 115.413333 50.986667 115.413333 113.92h25.173333c0-62.933333 51.626667-113.92 115.413334-113.92z" p-id="7833" fill="#ffffff"></path></svg>
        Start creating
        <div className="hero-action-button-frames">
          <div className="hero-action-button-frame">
            <div></div>
          </div>

          <div className="hero-action-button-frame">
            <div></div>
          </div>

          <div className="hero-action-button-frame">
            <div></div>
          </div>

        </div>
      </Button>
    </Link>
  );
};

export default CTAButton;
