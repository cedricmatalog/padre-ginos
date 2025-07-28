import { formatPrice } from "../../../shared/utils/formatting";
import type { CartProps } from "../../../shared/types";

const Cart: React.FC<CartProps> = ({ cart, checkout }) => {
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <aside className="bg-padre-background rounded-lg shadow-sm p-6 sticky top-8 h-fit border border-padre-border transition-colors duration-200" aria-labelledby="cart-heading">
      <header className="mb-6">
        <h2 id="cart-heading" className="font-pacifico text-2xl text-padre-primary mb-4">
          Your Cart
        </h2>
        <div className="w-full h-px bg-padre-border"></div>
      </header>
      
      {cart.length === 0 ? (
        <div className="text-center py-8" role="status">
          <p className="text-padre-muted">Your cart is empty</p>
        </div>
      ) : (
        <section aria-label="Cart items">
          <ul className="space-y-4 mb-6" role="list">
            {cart.map((item, index) => (
              <li 
                key={`${item.pizza.id}-${item.size}-${index}`} 
                className="pb-4 border-b border-padre-border last:border-b-0"
                role="listitem"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-padre-light text-padre-muted px-2 py-1 rounded text-xs font-medium">
                        {item.size === 'S' ? 'Small' : item.size === 'M' ? 'Medium' : 'Large'}
                      </span>
                      {(item.quantity || 1) > 1 && (
                        <span className="bg-padre-secondary text-white px-2 py-1 rounded text-xs font-medium">
                          x{item.quantity || 1}
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-padre-primary">{item.pizza.name}</h3>
                  </div>
                  <data value={item.price} className="font-medium text-padre-primary">
                    {formatPrice(item.price)}
                  </data>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
      
      <footer>
        <div className="bg-padre-light rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-padre-primary">Total:</span>
            <data value={totalPrice} className="font-semibold text-xl text-padre-primary">
              {formatPrice(totalPrice)}
            </data>
          </div>
          <span className="sr-only">Total price: {formatPrice(totalPrice)}</span>
        </div>
        <button 
          className="btn-secondary w-full disabled:bg-padre-muted disabled:cursor-not-allowed"
          onClick={checkout} 
          disabled={cart.length === 0}
          aria-describedby="checkout-help"
        >
          Checkout {totalItems > 0 && `(${totalItems})`}
        </button>
        <div id="checkout-help" className="sr-only">
          Proceed to payment and complete your order
        </div>
      </footer>
    </aside>
  );
};

export default Cart;
