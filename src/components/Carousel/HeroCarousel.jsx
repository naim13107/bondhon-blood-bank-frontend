import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import { Autoplay, Pagination, Navigation } from "swiper/modules";


import CarouselSlide from "./CarouselSlide";


import img1 from "../../assets/images/image1.webp";
import img2 from "../../assets/images/image2.webp";
import img3 from "../../assets/images/image3.webp";
import img4 from "../../assets/images/image4.webp";

const Banner = () => {
  
  const slides = [
    {
      title: "Donate Blood, Save Lives",
      subtitle: "Your contribution can make a difference. Join our community of heroes today.",
      image: img1,
      buttonText: "Donate Now",
      buttonLink: "/requests",
    },
    {
      title: "Urgent Need for Blood",
      subtitle: "Our reserves are critically low. We need donors for all blood types immediately.",
      image: img2,
      buttonText: "See Requests",
      buttonLink: "/requests",
    },
    {
      title: "Safe & Simple Process",
      subtitle: "Donating blood is quick, easy, and performed by certified medical professionals.",
      image: img3,
      buttonText: "How It Works",
      buttonLink: "/about",
    },
    {
      title: "Be Someone's Lifeline",
      subtitle: "From surgeries to emergencies, your single donation powers modern medicine.",
      image: img4,
      buttonText: "Join Us",
      buttonLink: "/register",
    },
  ];

  return (
    <>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full h-[600px] shadow-sm"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <CarouselSlide
              title={slide.title}
              subtitle={slide.subtitle}
              image={slide.image}
              buttonText={slide.buttonText}
              buttonLink={slide.buttonLink}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Banner;