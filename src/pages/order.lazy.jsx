import { createLazyFileRoute } from "@tanstack/react-router";

import Pizza from "../features/pizzas/components/Pizza";
import Cart from "../features/cart/components/Cart";
import { useOrder } from "../shared/hooks/useOrder";
import { BASE_URL } from "../shared/config/constants";

export const Route = createLazyFileRoute("/order")({
  path: "/order",
  component: Order,
});

function Order() {
  const {
    pizzaTypes,
    pizzaType,
    pizzaSize,
    cart,
    loading,
    price,
    selectedPizza,
    checkout,
    handlePizzaTypeChange,
    handlePizzaSizeChange,
    handleSubmit,
  } = useOrder();

  // Moved to constants file - import { PIZZA_SIZES } from "../shared/config/constants";
  const pizzaSizes = [
    { label: "Small", value: "S" },
    { label: "Medium", value: "M" },
    { label: "Large", value: "L" },
  ];

  return (
    <main className="min-h-screen bg-padre-background">
      {/* Hero Section */}
      <section className="bg-white border-b border-padre-border py-12 mb-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-pacifico text-4xl mb-4 text-padre-primary">Order Your Pizza</h1>
          <p className="text-lg text-padre-muted">Choose from our authentic Italian recipes</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Pizza Selection */}
          <section className="xl:col-span-3 space-y-8">
            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-padre-secondary text-white rounded-full flex items-center justify-center font-medium text-sm">1</div>
                  <span className="ml-2 font-medium text-padre-primary">Choose Pizza</span>
                </div>
                <div className="w-12 h-px bg-padre-border"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-padre-secondary text-white rounded-full flex items-center justify-center font-medium text-sm">2</div>
                  <span className="ml-2 font-medium text-padre-primary">Select Size</span>
                </div>
                <div className="w-12 h-px bg-padre-border"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-padre-light text-padre-muted rounded-full flex items-center justify-center font-medium text-sm">3</div>
                  <span className="ml-2 text-padre-muted">Add to Cart</span>
                </div>
              </div>
            </div>

            <form action={handleSubmit} aria-label="Pizza order form" className="space-y-8">
              {/* Pizza Type Selection */}
              <div className="bg-white rounded-lg shadow-sm border border-padre-border p-8">
                <h2 className="font-pacifico text-2xl text-padre-primary mb-6 text-center">Step 1: Choose Your Pizza</h2>
                <div className="max-w-md mx-auto">
                  <label htmlFor="pizza-type" className="block text-lg text-gray-800 font-bold mb-4 text-center">
                    Select Your Favorite
                  </label>
                  <select
                    id="pizza-type"
                    name="pizza-type"
                    value={pizzaType}
                    onChange={handlePizzaTypeChange}
                    className="block text-lg p-4 w-full border-2 border-padre-border rounded-lg bg-white focus:border-padre-secondary focus:outline-none transition-colors text-padre-primary"
                    required
                    aria-describedby="pizza-type-help"
                  >
                    {pizzaTypes.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <div id="pizza-type-help" className="sr-only">
                    Choose from our available pizza varieties
                  </div>
                </div>
              </div>

              {/* Pizza Size Selection */}
              <div className="bg-white rounded-lg shadow-sm border border-padre-border p-8">
                <h2 className="font-pacifico text-2xl text-padre-primary mb-6 text-center">Step 2: Pick Your Size</h2>
                <fieldset>
                  <legend className="sr-only">Pizza Size Selection</legend>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                    {pizzaSizes.map(({ label, value }) => (
                      <div key={value} className="relative">
                        <input
                          checked={pizzaSize === value}
                          type="radio"
                          name="pizza-size"
                          value={value}
                          id={`pizza-${value}`}
                          onChange={handlePizzaSizeChange}
                          className="sr-only"
                          required
                        />
                        <label 
                          htmlFor={`pizza-${value}`}
                          className={`block p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 text-center ${
                            pizzaSize === value 
                              ? 'border-padre-secondary bg-padre-light shadow-sm' 
                              : 'border-padre-border hover:border-padre-muted'
                          }`}
                          aria-describedby={`size-${value}-desc`}
                        >
                          <div className={`font-semibold text-lg mb-1 ${pizzaSize === value ? 'text-padre-secondary' : 'text-padre-primary'}`}>
                            {label}
                          </div>
                          <div className={`text-sm ${pizzaSize === value ? 'text-padre-secondary' : 'text-padre-muted'}`}>
                            {value === 'S' ? '10 inch' : value === 'M' ? '12 inch' : '14 inch'}
                          </div>
                          {pizzaSize === value && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-padre-secondary text-white rounded-full flex items-center justify-center text-xs">
                              ✓
                            </div>
                          )}
                        </label>
                        <div id={`size-${value}-desc`} className="sr-only">
                          {value === 'S' ? 'Small 10 inch pizza' : value === 'M' ? 'Medium 12 inch pizza' : 'Large 14 inch pizza'}
                        </div>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Pizza Preview */}
              <div className="bg-white rounded-lg shadow-sm border border-padre-border p-8">
                <h2 className="font-pacifico text-2xl text-padre-primary mb-6 text-center">Your Selection</h2>
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-1">
                    {loading ? (
                      <div className="flex flex-col items-center" role="status" aria-live="polite">
                        <div className="w-64 h-64 bg-padre-light rounded-lg animate-pulse mb-4" aria-hidden="true"></div>
                        <div className="h-8 bg-padre-light mb-2 rounded animate-pulse w-48" aria-hidden="true"></div>
                        <div className="h-4 bg-padre-light rounded animate-pulse w-32" aria-hidden="true"></div>
                        <span className="sr-only">Loading pizza preview...</span>
                      </div>
                    ) : selectedPizza ? (
                      <div className="text-center">
                        <figure className="mb-4 relative">
                          <img
                            src={selectedPizza.image ? `${BASE_URL}${selectedPizza.image}` : "https://picsum.photos/300"}
                            alt={`${selectedPizza.name} pizza`}
                            width="300"
                            height="300"
                            className="w-64 h-64 object-cover rounded-lg mx-auto shadow-sm border border-padre-border"
                          />
                          <div className="absolute -bottom-2 -right-2 bg-padre-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                            {pizzaSize}
                          </div>
                        </figure>
                        <h3 className="font-pacifico text-xl text-padre-secondary mb-2">{selectedPizza.name}</h3>
                        <p className="text-padre-muted mb-4 max-w-md mx-auto">{selectedPizza.description}</p>
                        <div className="text-2xl font-semibold text-padre-primary">
                          <span className="sr-only">Price: </span>
                          <data value={selectedPizza.sizes[pizzaSize]}>{price}</data>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                
                {selectedPizza && !loading && (
                  <div className="text-center mt-8">
                    <button type="submit" className="btn-secondary py-4 px-8 text-lg" aria-describedby="add-to-cart-help">
                      Add to Cart - {price}
                    </button>
                    <div id="add-to-cart-help" className="sr-only">
                      Add the selected pizza to your shopping cart
                    </div>
                  </div>
                )}
              </div>
            </form>
          </section>

          {/* Cart Sidebar */}
          <aside className="xl:col-span-1">
            <div className="sticky top-8">
              <Cart cart={cart} checkout={checkout} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
