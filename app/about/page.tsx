import Hero from "@/app/about/Hero";
import Mapping from "@/app/about/Mapping";
import Roadmap from "@/app/about/Roadmap";
import Reward from "@/app/about/Reward";

import "./about.scss";

const About = () => {
    return (
        <>
            <main>
                <Hero />
                <Mapping id="Creation" />
                <Reward id="Reward"></Reward>
                <Roadmap id="Roadmap"></Roadmap>
            </main>
        </>
    );
};

export default About;

