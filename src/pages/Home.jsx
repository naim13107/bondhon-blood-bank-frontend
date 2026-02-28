import HeroCarousel from "../components/Carousel/HeroCarousel";
import Features from "../components/Features";
import WorldBloodDonorDaySection from "../components/WorldBloodDonor";
import DonorListSection from "../components/DonorListSection"
import HowItWorks from "../components/HowItWorks";

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <DonorListSection />
      <Features />
      <WorldBloodDonorDaySection/>
      <HowItWorks/>
    </div>
  );
};

export default Home;