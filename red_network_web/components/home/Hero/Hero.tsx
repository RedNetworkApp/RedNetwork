import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { SearchItems } from "./SearchItems";
import { publicRequest } from "../../../requestMethod";

export const Hero = () => {
  // search
  const [value, setValue] = useState("");
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products/");
        setProduct(res.data);
      } catch (error) {}
    };
    getProducts();
  });

  const onChanage = (e) => {
    setValue(e.target.value);
  };

  const onSearch = (key) => {
    setValue(key);
  };
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>
            <label>
              Over <span>6,500</span> cross cultural
            </label>
            <br />
            <label>
              both <span>Modern & Traditional </span> outfits available.
            </label>
          </h1>
          <p>High-quality Designs from all over the world. </p>
          <div className="search">
            <span>All Categories</span>
            <hr />
            <input
              type="text"
              placeholder="Search Products..."
              onChange={onChanage}
              value={value}
            />
            <button onClick={() => onSearch(value)}>
              <BiSearch className="serachIcon heIcon" />
            </button>
          </div>
          <SearchItems products={product} value={value} onSearch={onSearch} />
          <p>Examples: skirt, trousers, shoes</p>
        </div>
      </section>
    </>
  );
};
