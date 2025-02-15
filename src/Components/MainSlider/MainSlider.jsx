import React from "react";
import "./MainSlider.module.css";
import Slider from "react-slick";
import slider1 from "./../../assets/slider/slider-2.jpeg";
import slider2 from "./../../assets/slider/slider-image-1.jpeg";
import slider3 from "./../../assets/slider/slider-image-2.jpeg";
import slider4 from "./../../assets/slider/slider-image-3.jpeg";
import bannerImg1 from "./../../assets/slider/grocery-banner.png";
import bannerImg2 from "./../../assets/slider/grocery-banner-2.jpeg";

export default function MainSlider() {
  var settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    useCSS: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <>
      <div className="container mx-auto my-10">
        <div className="flex">
          <div className="w-3/4">
            <Slider {...settings}>
              <img src={slider1} className="h-[320px]" alt="" />
              <img src={slider2} className="h-[320px]" alt="" />
              <img src={slider3} className="h-[320px]" alt="" />
              <img src={slider4} className="h-[320px]" alt="" />
            </Slider>
          </div>
          <div className="w-1/4 items-center">
            <img src={bannerImg1} className="h-[160px]" alt="Banner Image" />
            <img src={bannerImg2} className="h-[160px]" alt="Banner Image" />
          </div>
        </div>
      </div>
    </>
  );
}
