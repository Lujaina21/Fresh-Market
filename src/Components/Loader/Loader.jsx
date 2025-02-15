import React from "react";
import "./Loader.module.css";
import { ThreeCircles } from "react-loader-spinner";

export default function Loader() {
  return (
    <>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class h-screen flex justify-center items-center"
      />
    </>
  );
}
