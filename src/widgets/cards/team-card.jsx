import React, { memo, useRef } from "react";
import PropTypes from "prop-types";
import { Card } from "@material-tailwind/react/components/Card";
import { IconButton } from "@material-tailwind/react/components/IconButton";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 800,
  slidesToShow: 9,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 2000,
  cssEase: "ease-in-out",
  pauseOnHover: true,
  arrows: false,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 6, slidesToScroll: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 4, slidesToScroll: 1 } },
    { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 1 } },
  ],
};

export const SkeletonCard = memo(function SkeletonCard() {
  return (
    <Card color="transparent" shadow={false} className="text-center mx-2 animate-pulse">
      <div
        className="h-[12rem] w-[7rem] bg-gray-300 rounded-2xl mx-auto"
      />
      <div className="mt-2 mb-1 h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
    </Card>
  );
});

export const TeamCard = memo(function TeamCard({ img, name, position, socials }) {
  return (
    <Card color="transparent" shadow={false} className="text-center mx-2  ">
      <img
        src={img}
        alt={name}
        width="112"
        height="192"
        loading="lazy"
        decoding="async"
        className="h-[12rem] w-[7rem]   object-cover shadow-xl rounded-2xl"
      />
    <p className="mt-2 mb-1  font-semibold break-words text-center w-full">
  {name}
</p>


      {/* {position && (
        <Typography className="text-gray-500 text-sm">{position}</Typography>
      )} */}

    </Card>
  );
});

TeamCard.defaultProps = {
  position: "",
  socials: null,
};

TeamCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string,
  socials: PropTypes.node,
};

export const TeamSlider = memo(function TeamSlider({ teamData,loading }) {
  const sliderRef = useRef(null);

  const handlePrev = () => {
    if (sliderRef.current) sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    if (sliderRef.current) sliderRef.current.slickNext();
  };
  const skeletonCards = Array(9).fill().map((_, index) => (
    <div key={`skeleton-${index}`} className="px-2">
      <SkeletonCard />
    </div>
  ));
  return (
    <div className="relative">
      {/* Slider */}
      <Slider ref={sliderRef} {...sliderSettings}>
        {loading ?
                  skeletonCards :
                  teamData.map(({ img, name, position }) => (
                    <div key={name} className="px-2">
                      <TeamCard
                        img={img}
                        name={name}
                        position={position}
                      />
                    </div>
                  ))
                }
      </Slider>

      {/* Navigation Buttons (Modern Floating Glassmorphism Style) */}
      <div className="absolute top-1/2 -left-6 transform -translate-y-1/2">
        <IconButton
          variant="filled"
          size="lg"
          onClick={handlePrev}
          aria-label="Previous partners"
          className="rounded-full p-3 bg-white/30 backdrop-blur-md shadow-lg hover:bg-white/50 transition duration-300"
        >
          <ChevronLeftIcon strokeWidth={2} className="h-6 w-6 text-gray-800" />
        </IconButton>
      </div>

      <div className="absolute top-1/2 -right-6 transform -translate-y-1/2">
        <IconButton
          variant="filled"
          size="lg"
          onClick={handleNext}
          aria-label="Next partners"
          className="rounded-full p-3 bg-white/30 backdrop-blur-md shadow-lg hover:bg-white/50 transition duration-300"
        >
          <ChevronRightIcon strokeWidth={2} className="h-6 w-6 text-gray-800" />
        </IconButton>
      </div>
    </div>
  );
});

TeamSlider.propTypes = {
  teamData: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      position: PropTypes.string,
      socials: PropTypes.array,
    })
  ).isRequired,
};

export default TeamSlider;
