import React, { useEffect, useState } from "react";
import "./Categories.module.css";
import Loader from "../Loader/Loader";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  let { categoryId } = useParams();

  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data, error, isLoading } = useQuery({
    queryKey: ["CategoriesKey"],
    queryFn: getCategories,
  });

  function getSubcategories(categoryId) {
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
      )
      .then((data) => {
        setSubCategories(data?.data.data);
      })
      .catch((err) => {
        console.log("Error fetching SubCategories!", err);
      });
  }

  useEffect(() => {
    if (categoryId) {
      getSubcategories(categoryId);
    }
  }, [categoryId]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {selectedCategory
            ? `FreshCart - ${selectedCategory.name}`
            : `FreshCart - Categories`}
        </title>
      </Helmet>
      {/* Categories Section */}
      <div className="container mx-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-3">
            {data?.data?.data.map((category) => (
              <div
                key={category._id}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedCategory(category);
                  getSubcategories(category._id);
                }}
              >
                <div className="product px-2 py-3 rounded-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-[250px] object-cover"
                  />
                  <h3 className="text-main text-lg text-center my-4 font-bold">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Sub Categories Section */}
      {selectedCategory && (
        <div className="container mx-auto mt-6">
          <h2 className="text-center text-2xl font-bold text-main mb-4">
            {selectedCategory.name} Subcategories
          </h2>
          <div className="flex flex-wrap pb-3">
            {subCategories?.length > 0 ? (
              subCategories.map((subcategory) => (
                <div
                  key={subcategory._id}
                  className="sm:w-full md:w-1/2 lg:w-1/3"
                >
                  <div className="product px-2 py-3 mx-1 my-2 rounded-lg border border-gray-200 shadow">
                    <h3 className="text-black text-lg text-center my-4 font-extrabold">
                      {subcategory.name}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center w-full text-gray-500 text-xl">
                No subcategories found!
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
