import React from "react";
import { Header } from "./components/common/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Footer } from "./components/common/Footer";
import { Details } from "./components/home/details/Details";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Checkout from "./components/pages/Checkout";
import Success from "./components/pages/Success";
import { useSelector } from "react-redux";

export const App = ({ cartItems }) => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home cartItems={cartItems} />
          </Route>
          <Route path="/details">
            <Details />
          </Route>
          <Route path="/Checkout">
            <Checkout />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
};
