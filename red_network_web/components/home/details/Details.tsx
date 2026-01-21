import React, { useEffect, useState } from "react";
import { MdStarRate } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { ADD, DELETE, REMOVE_INT } from "../../../controller/action";

export const Details = () => {
  const [data, setData] = useState([]);
  const { _id } = useParams();

  const getdata = useSelector((state) => state.cartReducer.carts);

  useEffect(() => {
    const compare = () => {
      let compareData = getdata.filter((e) => {
        return e.id === _id;
      });
      setData(compareData);
    };
    compare();
  }, [_id]);

  // delete item
  const history = useHistory();
  const deletes = (id) => {
    dispatch(DELETE(id));
    history.push("/");
  };

  // increment item
  const dispatch = useDispatch();
  const increment = (e) => {
    dispatch(ADD(e));
  };

  // descriment item
  const decrement = (item) => {
    dispatch(REMOVE_INT(item));
  };

  return (
    <>
      <article>
        <section className="details">
          <h2 className="details_title">Product Details Pages</h2>
          {data.map((item) => (
            <div className="details_content">
              <div className="details_content_img">
                <img src={item.img} alt="" />
              </div>
              <div className="details_content_detail">
                <h1>{item.title}</h1>
                <div className="rating">
                  <MdStarRate />
                  <MdStarRate />
                  <MdStarRate />
                  <MdStarRate />
                  <MdStarRate />
                  <label htmlFor="">(1 customer review)</label>
                </div>
                {/*<h3> ${item.price * item.qty}</h3>*/}
                <h3> PKR {item.price}</h3>
                <div className="qty">
                  <div className="count">
                    <button onClick={() => increment(item)}>
                      <AiOutlinePlus />
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={
                        item.qty <= 1
                          ? () => deletes(item._id)
                          : () => decrement(item)
                      }
                    >
                      <AiOutlineMinus />
                    </button>
                  </div>
                  <button className="button">Add To Cart</button>
                </div>
                <div className="desc">
                  <h4>PRODUCTS DESCRIPTION</h4>
                  <p>{item.desc}</p>
                  <h4> PRODUCT DETAILS</h4>
                  <ul>
                    <li>
                      <p> Type: {item.categories}</p>
                    </li>
                    <li>
                      <p>Color: {item.color}</p>
                    </li>
                    <li>
                      <p>Size: {item.size}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>
      </article>
    </>
  );
};
