import React from "react";
import "./Home.module.css";
import Products from "../Products/Products";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import logo from "./../../assets/shopping-cart.png";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <div className="overflow-hidden whitespace-nowrap my-12">
        <div className="flex space-x-10 animate-marquee text-3xl font-bold text-main">
          {[...Array(20)].map((_, index) => (
            <p key={index} className="flex items-center space-x-2">
              <img src={logo} className="w-16 ms-10" alt="Fresh Cart Logo" />
              <span>Welcome to Our FreshCart Website!</span>
            </p>
          ))}
        </div>
      </div>
      <Products />
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart - Home</title>
      </Helmet>
    </>
  );
}
