import { intl } from "./utils";

const Cart = ({ cart }) => {
  return (
    <div className="cart">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.pizza.name} ({item.size}) - {intl.format(item.price)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
