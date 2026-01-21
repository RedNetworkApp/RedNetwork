import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import cartimg from "../assets/images/cart.png";
import Clogo from "../assets/images/Clogo.jpeg";
import { BiSearch } from "react-icons/bi";
import { BsBagCheck } from "react-icons/bs";
import { RiUser3Line } from "react-icons/ri";
import {
  AiOutlineHeart,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineDelete,
} from "react-icons/ai";
import { navlist } from "../assets/data/data";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { DELETE } from "../../controller/action";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";
//import getStripe from "../../getStripe"
import StripeCheckout from "react-stripe-checkout";

export const Header = () => {
  // navbar
  const [mobile, setMobile] = useState(false);
  const [cartList, setCartList] = useState(false);
  const [price, setPrice] = useState(0);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  const KEY = process.env.REACT_STRIPE_CHECKOUT_KEY;

  // cart open and close
  const handleClose = () => {
    setCartList(null);
  };
  // scroll navbar
  window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header");
    header.classList.toggle("active", this.window.scrollY > 100);
  });

  // cart add in shop
  const getdata = useSelector((state) => state.cartReducer.carts);
  //console.log(getdata)

  // delete cart
  const dispatch = useDispatch();
  const delet = (_id) => {
    dispatch(DELETE(_id));
  };

  // total prcie

  useEffect(() => {
    const totals = () => {
      let price = 0;
      getdata.map((e, i) => {
        price = parseFloat(e.price) * e.qty + price;
      });
      setPrice(price);
    };
    totals();
  }, [getdata]);

  {
    /*const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await userRequest("/checkout/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartList),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };*/
  }

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: price,
        });
        history.push("/success", { data: res.data });
      } catch (error) {}
    };
    stripeToken && price >= 1 && makeRequest();
  }, [stripeToken, price, history]);

  //stripe checkout
  {
    /* const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: price,
        });
        history.push("/success", { data: res.data });
      } catch (error) {}
    };
    stripeToken && price >= 1 && makeRequest();
  }, [stripeToken, price, history]) */
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <nav>
            <div className="toggle">
              <button onClick={() => setMobile(!mobile)}>
                {mobile ? (
                  <AiOutlineClose className="close heIcon" />
                ) : (
                  <AiOutlineMenu className="open heIcon" />
                )}
              </button>
            </div>
            <div className="left">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="center">
              <ul className={mobile ? "mobile-nav" : "menu"}>
                {navlist.map((nav, i) => (
                  <li key={i}>
                    <Link to={nav.path}>{nav.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="right">
            <div className="right_search">
              <input type="text" placeholder="Search Products..." />
              <BiSearch className="serachIcon heIcon" />
            </div>
            <div className="right_user">
              <RiUser3Line className="userIcon heIcon" />
              <AiOutlineHeart className="userIcon heIcon" />
            </div>
            <div className="right_card">
              <button className="button" onClick={() => setCartList(!cartList)}>
                <BsBagCheck className="shop heIcon" />
                MY CART<span> ({getdata.length})</span>
              </button>
              <div className={cartList ? "showCart" : "hideCart"}>
                {getdata.length ? (
                  <section className="details">
                    <div className="details_title">
                      <h3>Photo</h3>
                      <p>Product Name</p>
                    </div>
                    {getdata.map((e) => (
                      <div className="details_content">
                        <div className="details_content_img">
                          <Link to={`/cart/${e._id}`} onClick={handleClose}>
                            <img src={e.img} alt="" />
                          </Link>
                        </div>
                        <div className="details_content_detail">
                          <div className="details_content_detail_price">
                            <p>{e.title.slice(0, 20)}...</p>
                            <p>Price : PKR {e.price}</p>
                            <p>Quantity : {e.qty}</p>
                          </div>
                        </div>
                        <div className="details_content_detail_icon">
                          <i onClick={() => delet(e._id)}>
                            <AiOutlineDelete />
                          </i>
                        </div>
                      </div>
                    ))}
                    <div className="details_total">
                      <h4>Total : PKR {price}</h4>
                    </div>
                    <StripeCheckout
                      name="Red Network"
                      image={Clogo}
                      billingAddress
                      shippingAddress
                      description={`Your total is $${price}`}
                      token={onToken}
                      stripeKey={KEY}
                    >
                      <button className="button">Checkout</button>
                    </StripeCheckout>
                  </section>
                ) : (
                  <div className="empty">
                    <p>Your cart is empty</p>
                    <img src={cartimg} alt="" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    amount: state.amount,
  };
};
connect(mapStateToProps)(Header);
