"use client";

import React, { useState } from "react";
import { FiShoppingBag, FiSearch } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { ADD } from "../../../redux/action";

//from products in productItems filter during search
export const SearchItems = ({ products, value, onSearch }: any) => {
  const dispatch = useDispatch();
  const [openImage, setOpenImage] = useState(false);
  const [img, setImg] = useState("");
  const onOpenImage = (src: any) => {
    setImg(src);
    setOpenImage(true);
  };
  const addToCart = (e: any) => {
    dispatch(ADD(e));
  };

  return (
    <>
      <section className="searchItems">
        <div className="product_items">
          {products
            .filter((items: any) => {
              if (value === "") {
                return items;
              } else if (
                items.title.toLowerCase().includes(value.toLowerCase())
              ) {
                return items;
              }
            })
            .map((items: any) => (
              <div
                className="box"
                onClick={() => onSearch(items.title)}
                key={items.id}
              >
                <div className="img">
                  <img src={items.img} alt="" />
                  <div className="overlay">
                    <button className="button" onClick={() => addToCart(items)}>
                      <FiShoppingBag />
                    </button>
                    <button className="button">
                      <AiOutlineHeart />
                    </button>
                    <button className="button">
                      <FiSearch />
                    </button>
                  </div>
                </div>
                <div className="details">
                  <h3>{items.title}</h3>
                  <p>{items.desc}</p>
                  <h4>${items.price}</h4>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};
