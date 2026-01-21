import React, { useState } from "react";
import { FiShoppingBag, FiSearch } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD } from "../../../controller/action";

export const ProductItems = ({ cartItems }) => {
  const dispatch = useDispatch();
  const addToCart = (e) => {
    dispatch(ADD(e));
  };

  const [openImage, setOpenImage] = useState(false);
  const [img, setImg] = useState("");
  const onOpenImage = (src) => {
    setImg(src);
    setOpenImage(true);
  };

  return (
    <>
      <div className="product_items">
        {cartItems.map((items) => (
          <div className="box" key={items.id}>
            <div className="img">
              <img src={items.img} alt="" />
              <div className="overlay">
                <button className="button" onClick={() => addToCart(items)}>
                  <FiShoppingBag />
                </button>
                <button className="button">
                  <AiOutlineHeart />
                </button>
                <button
                  className="button"
                  onClick={() => onOpenImage(items.img)}
                >
                  <FiSearch />
                </button>
              </div>
            </div>
            <div className="details">
              <Link to="/details">
                <h3>{items.title}</h3>
                <p>{items.desc}</p>
                <h4>PKR {items.price}</h4>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className={openImage ? "modelOpen" : "modelClose"}>
        <div className="onClickImage">
          <img src={img} alt="" />
          <button className="button" onClick={() => setOpenImage(false)}>
            <AiOutlineClose />
          </button>
        </div>
      </div>
    </>
  );
};
