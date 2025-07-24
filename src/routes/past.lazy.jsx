import { useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import getPastOrders from "../api/getPastOrders";

export const Route = createLazyFileRoute("/past")({
  component: PastOrders,
});

function PastOrders() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useQuery({
    queryKey: ["pastOrders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000, // 30 seconds
  });

  console.log("PastOrders data:", data);

  if (isLoading) {
    return (
      <div className="past-orders">
        <h2>Loading...</h2>;
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
              <td>{order.order_id}</td>
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
    </div>
  );
}
