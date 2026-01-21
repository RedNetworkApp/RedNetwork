"use client";
import React, { useState, useEffect } from "react";
import { Heading } from "../../common/Heading";
import { ProductItems } from "../product/ProductItems";
import { publicRequest } from "../../../requestMethod";

export const TopProduct = () => {
  // Define topProducts as a placeholder or fetch it if needed.
  // For now, I'll assume it's an empty array or will be populated by the API call.
  // The provided snippet implies `topProducts` is a predefined array, but it's not in the original code.
  // To make the provided snippet syntactically correct and functional, I'll initialize it as an empty array.
  // If `topProducts` is meant to be the initial state, the useEffect would need to be removed or modified.
  // Given the instruction "Add any to props and callbacks" and the provided snippet,
  // I will assume `topProducts` is meant to be the initial data source for filtering,
  // and the `useEffect` for fetching `cartItems` should still populate `cartItems`.
  // The snippet seems to be mixing two approaches (local `topProducts` and API fetch).
  // I will try to reconcile them by keeping the API fetch for `cartItems` and introducing `topProducts`
  // as a separate state to hold the *original* fetched items for filtering.

  const [cartItems, setCartItems] = useState<any>([]); // This will hold the currently displayed items
  const [allProducts, setAllProducts] = useState<any>([]); // This will hold all fetched products for filtering

  const allCategories = [
    "all",
    ...new Set(allProducts.map((item: any) => item.categories)),
  ];
  const [category, setCategory] = useState<any>(allCategories);

  //fetch products from the databse
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products/");
        setCartItems(res.data);
        setAllProducts(res.data); // Store all fetched products for filtering
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  const handleFilter = (category: any) => {
    const newItem = allProducts.filter((item: any) => item.categories === category);
    setCartItems(newItem);

    if (category === "all") {
      setCartItems(allProducts);
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
              {category.map((category: any) => (
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
