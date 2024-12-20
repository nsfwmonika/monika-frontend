import BrowseImages from "@/components/home/BrowseImages";
import Hero from "@/components/home/Hero";
import Mapping from "@/components/home/Mapping";
import Roadmap from "@/components/home/Roadmap";
import Reward from "@/components/home/Reward";

export default async function HomeIndex() {

  return (
    <>
      <Hero id="About"/>
      <Mapping id="Creation"/>
      <BrowseImages id="Browse" />
      <Reward id="Reward"></Reward>
      <Roadmap id="Roadmap"></Roadmap>
    </>
  );
}
