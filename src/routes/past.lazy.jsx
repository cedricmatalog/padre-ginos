import { useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import getPastOrders from "../api/getPastOrders";
import getPastOrder from "../api/getPastOrder";
import Modal from "../components/Modal";
import { intl } from "../utils";
import { BASE_URL } from "../lib/config";
import ErrorBoundary from "../ErrorBoundary";

export const Route = createLazyFileRoute("/past")({
  component: PastOrdersWrappedWithErrorBoundary,
});

function PastOrdersWrappedWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <PastOrders {...props} />
    </ErrorBoundary>
  );
}

function PastOrders() {
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000, // 30 seconds
  });

  const { data: pastOrderData, isLoading: isLoadingPastOrder } = useQuery({
    queryKey: ["past-order", selectedOrder],
    queryFn: () => getPastOrder(selectedOrder),
    staleTime: 86400000, // 1 day
    enabled: !!selectedOrder, // Only run if selectedOrder is set
  });

  if (isLoading) {
    return (
      <div className="past-orders">
        <h2>Loading...</h2>
      </div>
    );
  }
  if (error) {
    return (
      <div className="past-orders">
        <h2>Error: {error.message}</h2>
      </div>
    );
  }

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setSelectedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={data.length < 10}
        >
          Next
        </button>
      </div>

      {selectedOrder ? (
        <Modal>
          <h2>Order #{selectedOrder}</h2>
          {!isLoadingPastOrder ? (
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Size</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {pastOrderData?.orderItems.map((pizza) => (
                  <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                    <td>
                      <img src={`${BASE_URL}${pizza.image}`} alt={pizza.name} />
                    </td>
                    <td>{pizza.name}</td>
                    <td>{pizza.size}</td>
                    <td>{pizza.quantity}</td>
                    <td>{intl.format(pizza.price)}</td>
                    <td>{intl.format(pizza.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading …</p>
          )}
          <button onClick={() => setSelectedOrder()}>Close</button>
        </Modal>
      ) : null}
    </div>
  );
}
