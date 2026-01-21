import { useState, useEffect } from "react";
import { Heading } from "../../common/Heading";
import { ProductItems } from "./ProductItems";
import { publicRequest } from "../../../requestMethod";

export const Product = () => {
  const [cartItems, setCartItems] = useState([]);

  //fetch products from database

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products/");
        setCartItems(res.data);
      } catch (error) {}
    };
    getProducts();
  });
  return (
    <>
      <section className="product">
        <div className="container">
          <Heading
            title="Trendings Products"
            desc="Check the stylish outfits."
          />

          <ProductItems cartItems={cartItems} />
        </div>
      </section>
    </>
  );
};
