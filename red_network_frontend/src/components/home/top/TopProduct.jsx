import React, { useState, useEffect } from "react";
import { Heading } from "../../common/Heading";
import { ProductItems } from "../product/ProductItems";
import { publicRequest } from "../../../requestMethod";

export const TopProduct = () => {
  const [cartItems, setCartItems] = useState([]);
  const allCategories = [
    "all",
    ...new Set(cartItems.map((item) => item.categories)),
  ];
  const [category, setCategory] = useState(allCategories);

  //fetch products from the databse
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products/");
        setCartItems(res.data);
      } catch (error) {}
    };
    getProducts();
  });

  const handleFilter = (category) => {
    const newItem = cartItems.filter((item) => item.categories === category);
    setCartItems(newItem);

    if (category === "all") {
      setCartItems(cartItems);
      return;
    }
  };
  return (
    <>
      <section className="topproduct">
        <div className="container">
          <div className="head">
            <Heading
              title="Top Selling Products"
              desc="Meet our newbies! Check the stylish outfits."
            />
            <div className="category">
              {category.map((category) => (
                <button
                  className="button"
                  onClick={() => handleFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <ProductItems cartItems={cartItems} />
        </div>
      </section>
    </>
  );
};
