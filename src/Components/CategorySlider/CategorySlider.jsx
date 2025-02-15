import React from "react";
import "./CategorySlider.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";

export default function CategorySlider() {
  function getCatSlider() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data } = useQuery({
    queryKey: ["CategorySliderKey"],
    queryFn: getCatSlider,
  });
  console.log(data?.data.data);

  var settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    useCSS: true,
    autoplaySpeed: 2500,
    arrows: true,
  };

  return (
    <>
      <div className="container mx-auto my-10">
        <h1 className="my-3 text-xl font-semibold">Our Popular Categories</h1>
        <Slider {...settings}>
          {data?.data.data.map((cat) => (
            <div
              className="text-center flex content-center items-center"
              key={cat._id}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="h-[230px] w-full"
              />
              <p className="my-2 text-main font-semibold font-serif">
                {cat.name}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
