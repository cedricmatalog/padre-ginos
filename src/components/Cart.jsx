import React from "react";
import { intl } from "../utils";

const Cart = ({ cart, checkout }) => {
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={`${item.pizza.id}-${item.size}-${index}`}>
              <span className="size">{item.size}</span> -
              <span className="type">{item.pizza.name}</span> -
              <span className="price">{intl.format(item.price)}</span>
            </li>
          ))}
        </ul>
      )}
      <p>Total: {intl.format(totalPrice)}</p>
      <button onClick={checkout} disabled={cart.length === 0}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
