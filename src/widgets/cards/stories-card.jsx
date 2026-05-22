import React, { memo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react/components/Typography";
import { IconButton } from "@material-tailwind/react/components/IconButton";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// Import CSS for the carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Real Stories Carousel Component
export const RealStoriesSection = memo(function RealStoriesSection({ storiesData }) {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    beforeChange: (_, next) => setActiveIndex(next), // Update the active index when slide changes
  };

  const handlePrev = () => {
    const newIndex = (activeIndex - 1 + storiesData.length) % storiesData.length;
    setActiveIndex(newIndex);
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % storiesData.length;
    setActiveIndex(newIndex);
    sliderRef.current.slickNext();
  };

  return (
    <section className="relative bg-white py-24 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Carousel */}
          <div className="w-full">
            <div className="relative">
              <Slider ref={sliderRef} {...settings}>
                {storiesData.map(({ img, name }, index) => (
                  <div key={name} className="px-2">
                    <div className="relative flex justify-center items-center">
                      {/* Modern Avatar Container */}
                      <div className="group relative">
                        {/* Glowing Border */}
                        <div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        ></div>

                        {/* Avatar */}
                        <img
                          src={img}
                          alt={name}
                          width="288"
                          height="288"
                          loading="lazy"
                          decoding="async"
                          className="h-72 w-72 rounded-full border-4 border-white shadow-lg shadow-gray-500/25 relative z-10 transform transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>

              {/* Navigation Buttons */}
              <div className="flex justify-center mt-8 gap-4">
                <IconButton
                  variant="outlined"
                  color="blue-gray"
                  size="lg"
                  onClick={handlePrev}
                  aria-label="Previous story"
                  className="rounded-full"
                >
                  <ChevronLeftIcon strokeWidth={2} className="h-6 w-6" />
                </IconButton>
                <IconButton
                  variant="outlined"
                  color="blue-gray"
                  size="lg"
                  onClick={handleNext}
                  aria-label="Next story"
                  className="rounded-full"
                >
                  <ChevronRightIcon strokeWidth={2} className="h-6 w-6" />
                </IconButton>
              </div>
            </div>
          </div>

          {/* Right Side: Dynamic Content */}
          <div className="w-full">
            <Typography variant="h2" className="font-bold text-gray-800 mb-6">
              Real Stories, Real People, And Real Outcomes
            </Typography>
            <Typography variant="lead" className="text-[#A51B64] text-2xl mb-8">
              Discover The Difference With Member Testimonials!
            </Typography>
            <Typography className="text-gray-600 mb-8">
              "{storiesData[activeIndex].testimonial}"
            </Typography>
            <Typography variant="h5" className="font-bold text-gray-800">
              - {storiesData[activeIndex].name}
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
});

RealStoriesSection.propTypes = {
  storiesData: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      testimonial: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RealStoriesSection;
