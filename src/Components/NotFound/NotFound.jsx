import React from "react";
import "./NotFound.module.css";
import notFound from "./../../assets/404.webp";

export default function NotFound() {
  return (
    <>
      <div className="container mx-auto">
        <img src={notFound} className="w-full" alt="Not Found !" />
      </div>
    </>
  );
}
