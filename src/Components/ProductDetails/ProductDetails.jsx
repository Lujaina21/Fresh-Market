import React, { useContext, useEffect, useState } from "react";
import "./ProductDetails.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  let { id, category } = useParams();

  //======Start of Add To Cart
  let { addToCart } = useContext(CartContext);
  //fn kobry 3shan mynf3sh ab3t el addToCart la2enha async w lazem a7ot ablha await fa h3ml fn kobry 3shan admn elawait
  async function addToCartProduct(productId) {
    let response = await addToCart(productId);
    console.log(response);
  }
  //=====End of Add To Cart

  //!Using useQuery()
  // function getProductDetails() {
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  // }

  // let { error, data, isError, isLoading } = useQuery({
  //   queryKey: ["ProductDetailsKey"],
  //   queryFn: getProductDetails,
  // });

  // console.log(data?.data.data);

  //!using useState()
  const [productDetails, setProductDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  var settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    useCSS: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  async function getProductDetails() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((data) => {
        setIsLoading(false);
        setProductDetails(data?.data.data);
        console.log("Product Details: ", data?.data.data);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
        console.log(err);
      });
  }

  async function getRelatedProducts() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((data) => {
        // console.log("Related Products: ", data?.data.data);
        let relatedProducts = data.data.data;
        //y3ml filter 3la product product 3la 7asab el category.name
        //yrga3ly elproduct ely cat.name bta3o nafs elcategory ely ana ba3taholk fl params
        relatedProducts = relatedProducts.filter(
          (product) => product.category.name == category
        );
        setRelatedProducts(relatedProducts);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    getProductDetails();
    getRelatedProducts();
  }, []);

  useEffect(() => {
    getProductDetails();
  }, [id]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart - Product Details</title>
      </Helmet>
      {/* Selected Product */}
      <div className="container mx-auto mt-20">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex my-10">
            <div className="w-1/4">
              <Slider {...settings}>
                {productDetails?.images?.map((src) => (
                  <img
                    src={src}
                    alt={productDetails?.title}
                    className="rounded-md"
                  />
                ))}
              </Slider>
            </div>
            <div className="w-3/4 mt-20 mx-6">
              <div className="my-7">
                <h1 className="text-black font-bold text-2xl">
                  {productDetails.title}
                </h1>
                <p className="font-semibold italic text-sm text-main">
                  {productDetails.category?.name}
                </p>
              </div>
              <h3 className="text-gray-700 font-semibold">
                {productDetails.description}
              </h3>
              <div className="flex justify-between align-center mt-10">
                <h5 className="font-mono text-2xl">
                  {productDetails.price} EGP
                </h5>
                <div className="text-lg font-semibold text-gray-600">
                  {productDetails.ratingsAverage}
                  <i className="rating-color fa fa-star ms-1"></i>
                </div>
              </div>
              <div>
                <button
                  onClick={() => addToCartProduct(productDetails._id)}
                  className="btn bg-main w-full rounded-lg text-white px-3 py-2 mt-3"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Related Products */}
      <div className="container mx-auto mt-20">
        <h1 className="my-3 text-xl font-semibold">Related Products: </h1>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap pb-3">
            {relatedProducts.map((product) => (
              <div key={product._id} className="sm:w-full md:w-1/4 lg:w-1/6">
                <div className="product px-2 py-3 mx-1 my-2 rounded-lg">
                  <Link
                    to={`/productDetails/${product._id}/${product.category.name}`}
                  >
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-[200px] h-[250px]"
                    />
                    <h3 className="font-semibold text-sm text-main mt-2">
                      {product.category.name}
                    </h3>
                    <h2 className="font-semibold">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h2>
                    <div className="flex justify-between align-center mt-3">
                      <h5 className="font-mono text-lg">{product.price} EGP</h5>
                      <div className="text-gray-600 font-semibold">
                        {product.ratingsAverage}
                        <i className="rating-color fa fa-star ms-1"></i>
                      </div>
                    </div>
                  </Link>
                  <Helmet>
                    <meta charSet="utf-8" />
                    <title>
                      FreshCart -{" "}
                      {product?.title.split(" ").slice(0, 3).join(" ")}
                    </title>
                  </Helmet>
                  <div>
                    <button
                      onClick={() => addToCartProduct(product._id)}
                      className="btn bg-main w-full rounded-lg text-white px-3 py-2"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
