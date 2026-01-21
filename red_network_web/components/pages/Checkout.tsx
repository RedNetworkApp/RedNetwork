import React, { useState } from "react";
import "../../style/login.css";

function Checkout() {
  return (
    <div className="login-page">
      <form>
        <h2>Check Out</h2>
        <input type="name" name="name" required placeholder="User name" />
        <input type="email" name="email" required placeholder="Email" />

        <input
          type="mobile number"
          name="mobile number"
          required
          placeholder="Mobile Number"
        />
        <input type="address" name="address" required placeholder="Address" />
        <div className="row">
          <button className="button" type="submit" onClick="">
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
