import { useState, Suspense, use } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { getPastOrders } from "../shared/api";
import { getPastOrder } from "../shared/api";
import Modal from "../layouts/Modal";
import { intl } from "../shared/utils";
import { BASE_URL } from "../shared/config/constants";
import ErrorBoundary from "../app/ErrorBoundary";

export const Route = createLazyFileRoute("/past")({
  component: PastOrdersWrappedWithErrorBoundary,
});

function PastOrdersWrappedWithErrorBoundary() {
  const [page, setPage] = useState(1);

  const loadedPromise = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000, // 30 seconds
  }).promise;

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <main className="min-h-screen bg-padre-background">
            <section className="bg-white border-b border-padre-border py-12 mb-8">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <h1 className="font-pacifico text-4xl text-padre-primary mb-4">Past Orders</h1>
                <p className="text-lg text-padre-muted">View your pizza order history</p>
              </div>
            </section>
            <div className="max-w-4xl mx-auto p-6">
              <div className="bg-white rounded-lg shadow-sm border border-padre-border p-8 text-center">
                <h2 className="font-pacifico text-2xl text-padre-primary mb-4">Loading your orders...</h2>
              </div>
            </div>
          </main>
        }
      >
        <PastOrders
          loadedPromise={loadedPromise}
          page={page}
          setPage={setPage}
        />
      </Suspense>
    </ErrorBoundary>
  );
}

function PastOrders({ loadedPromise, page, setPage }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const data = use(loadedPromise);

  const { data: pastOrderData, isLoading: isLoadingPastOrder } = useQuery({
    queryKey: ["past-order", selectedOrder],
    queryFn: () => getPastOrder(selectedOrder),
    staleTime: 86400000, // 1 day
    enabled: !!selectedOrder, // Only run if selectedOrder is set
  });

  // if (isLoading) {
  //   return (
  //     <div className="past-orders">
  //       <h2>Loading...</h2>
  //     </div>
  //   );
  // }
  // if (error) {
  //   return (
  //     <div className="past-orders">
  //       <h2>Error: {error.message}</h2>
  //     </div>
  //   );
  // }

  return (
    <main className="min-h-screen bg-padre-background transition-colors duration-200">
      <section className="bg-padre-background border-b border-padre-border py-12 mb-8 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-pacifico text-4xl text-padre-primary mb-4">Past Orders</h1>
          <p className="text-lg text-padre-muted">View your pizza order history</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto p-6">
      
        <section className="bg-white rounded-lg shadow-sm border border-padre-border" aria-label="Order history">
          <header className="bg-padre-light p-6 border-b border-padre-border">
            <h2 className="font-pacifico text-xl text-padre-primary text-center">Your Order History</h2>
          </header>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm" role="table">
              <caption className="sr-only">List of past pizza orders with dates and times</caption>
              <thead>
                <tr className="bg-padre-light border-b border-padre-border">
                  <th scope="col" className="py-4 px-6 text-center font-medium text-padre-primary">Order ID</th>
                  <th scope="col" className="py-4 px-6 text-center font-medium text-padre-primary">Date</th>
                  <th scope="col" className="py-4 px-6 text-center font-medium text-padre-primary">Time</th>
                </tr>
              </thead>
              <tbody>
                {data.map((order, index) => (
                  <tr key={order.order_id} className={`border-b border-padre-border hover:bg-padre-light transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-padre-light/50'}`}>
                    <td className="py-4 px-6 text-center">
                      <button 
                        onClick={() => setSelectedOrder(order.order_id)}
                        className="btn-secondary py-2 px-4 text-sm"
                        aria-label={`View details for order ${order.order_id}`}
                      >
                        #{order.order_id}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-center text-padre-primary">
                      <time dateTime={order.date} className="font-medium">{order.date}</time>
                    </td>
                    <td className="py-4 px-6 text-center text-padre-primary">
                      <time dateTime={order.time} className="font-medium">{order.time}</time>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      
        <nav aria-label="Pagination" className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page <= 1}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Go to previous page"
          >
            Previous
          </button>
          
          <div className="bg-white rounded-lg px-6 py-3 shadow-sm border border-padre-border">
            <span className="font-pacifico text-padre-secondary" aria-current="page">
              Page {page}
            </span>
          </div>
          
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={data.length < 10}
            className="btn-secondary disabled:bg-padre-muted disabled:cursor-not-allowed"
            aria-label="Go to next page"
          >
            Next
          </button>
        </nav>
      </div>

      {selectedOrder ? (
        <Modal>
          <article aria-labelledby="order-details-heading">
            <header className="text-center mb-6">
              <h2 id="order-details-heading" className="font-pacifico text-2xl text-padre-primary mb-4">
                Order #{selectedOrder}
              </h2>
              <div className="w-full h-px bg-padre-border"></div>
            </header>
            
            {!isLoadingPastOrder ? (
              <section aria-label="Order items">
                <div className="max-w-4xl">
                  <table className="w-full text-sm border border-padre-border rounded-lg overflow-hidden" role="table">
                    <caption className="sr-only">
                      Order items showing pizza details, quantities, and prices
                    </caption>
                    <thead>
                      <tr className="bg-padre-light border-b border-padre-border">
                        <th scope="col" className="py-3 px-4 text-center font-medium text-padre-primary">Image</th>
                        <th scope="col" className="py-3 px-4 text-center font-medium text-padre-primary">Pizza Name</th>
                        <th scope="col" className="py-3 px-4 text-center font-medium text-padre-primary">Size</th>
                        <th scope="col" className="py-3 px-4 text-center font-medium text-padre-primary">Qty</th>
                        <th scope="col" className="py-3 px-4 text-center font-medium text-padre-primary">Unit Price</th>
                        <th scope="col" className="py-3 px-4 text-center font-medium text-padre-primary">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pastOrderData?.orderItems.map((pizza, index) => (
                        <tr key={`${pizza.pizzaTypeId}_${pizza.size}`} className={`border-b border-padre-border ${index % 2 === 0 ? 'bg-white' : 'bg-padre-light/50'} hover:bg-padre-light transition-colors`}>
                          <td className="py-3 px-4 text-center">
                            <img 
                              src={`${BASE_URL}${pizza.image}`} 
                              alt={`${pizza.name} pizza`}
                              className="w-16 h-16 object-cover rounded-lg border border-padre-border mx-auto shadow-sm"
                              width="64"
                              height="64"
                            />
                          </td>
                          <th scope="row" className="py-3 px-4 text-center font-medium text-padre-primary">{pizza.name}</th>
                          <td className="py-3 px-4 text-center">
                            <span className="bg-padre-light text-padre-muted px-2 py-1 rounded text-xs font-medium">
                              <abbr title={`${pizza.size === 'S' ? 'Small' : pizza.size === 'M' ? 'Medium' : 'Large'}`}>
                                {pizza.size}
                              </abbr>
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <data value={pizza.quantity} className="font-medium text-padre-primary">{pizza.quantity}</data>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <data value={pizza.price} className="text-padre-muted">{intl.format(pizza.price)}</data>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <data value={pizza.total} className="font-semibold text-padre-secondary">{intl.format(pizza.total)}</data>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : (
              <div role="status" aria-live="polite" className="text-center py-8">
                <p className="text-padre-muted">Loading order details…</p>
              </div>
            )}
            
            <footer className="mt-6 text-center">
              <button 
                onClick={() => setSelectedOrder()} 
                className="btn-primary"
                aria-label="Close order details"
              >
                Close Details
              </button>
            </footer>
          </article>
        </Modal>
      ) : null}
    </main>
  );
}
