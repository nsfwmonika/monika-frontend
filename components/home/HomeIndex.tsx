import BrowseImages from "@/components/home/BrowseImages";
import Hero from "@/components/home/Hero";
import Mapping from "@/components/home/Mapping";
import Roadmap from "@/components/home/Roadmap";
import Reward from "@/components/home/Reward";
import VideoModel from "@/components/home/VideoModel";

export default async function HomeIndex() {

  return (
    <>
      <Hero id="About"/>
      <Mapping id="Creation"/>
      <BrowseImages id="Browse" />
      <VideoModel></VideoModel>
      <Reward id="Reward"></Reward>
      <Roadmap id="Roadmap"></Roadmap>
    </>
  );
}
