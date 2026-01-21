import React from "react";
import { Blog } from "../home/blog/Blog";
import { Hero } from "../home/Hero/Hero";
import { Product } from "../home/product/Product";
import { Testimonial } from "../home/testimonial/Testimonial";
import { TopProduct } from "../home/top/TopProduct";

export const Home = () => {
  return (
    <>
      <Hero />
      <Product />
      <TopProduct />
      <Testimonial />
      <Blog />
    </>
  );
};
