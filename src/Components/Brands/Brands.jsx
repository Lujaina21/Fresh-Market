import React, { useEffect, useState } from "react";
import "./Brands.module.css";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../Redux/ProductSlice";
import { Modal } from "flowbite-react";
import brandsCover from "../../assets/Popular-Brands-cover.jpg";
import { Helmet } from "react-helmet";

export default function Brands() {
  //! Redux =======
  let dispatch = useDispatch();
  const { brands, isLoading } = useSelector((state) => state.productRed);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  //! Modal Handling
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  function openModal(brand) {
    setSelectedBrand(brand);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setSelectedBrand(null);
  }

  return (
    <div className="container mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {selectedBrand
            ? `FreshCart - ${selectedBrand.name}`
            : "FreshCart - Brands"}
        </title>
      </Helmet>
      <h1 className="text-center text-4xl text-main font-extrabold mt-12 mb-5">
        All Brands
      </h1>
      <div className="w-full mt-10 mb-3">
        <img
          src={brandsCover}
          alt="Popular Brands"
          className="w-full h-[400px]"
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-3">
          {brands?.map((brand) => (
            <div key={brand._id} className="px-2 py-3 cursor-pointer">
              <div
                className="product rounded-lg"
                onClick={() => openModal(brand)}
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-[250px] object-cover rounded-md"
                />
                <h3 className="text-black text-xl text-center my-4 font-bold">
                  {brand.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
      {/*** Modal ***/}
      {selectedBrand && (
        <Modal
          show={modalIsOpen}
          onClose={closeModal}
          size="md"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-transform transform animate-slideIn"
        >
          <Modal.Header>{selectedBrand.name}</Modal.Header>
          <Modal.Body>
            <div className="gap-2 flex sm:flex-col md:flex-row items-center p-4 md:p-5 space-y-4">
              <div>
                <h2 className="text-main font-bold text-2xl my-3">
                  {selectedBrand.name}
                </h2>
                <p className="text-gray-600">{selectedBrand.slug}</p>
              </div>
              <div className="ms-7">
                <img
                  src={selectedBrand.image}
                  alt={selectedBrand.name}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={closeModal}
              className="ms-auto py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-md font-medium focus:outline-none transition-all"
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
