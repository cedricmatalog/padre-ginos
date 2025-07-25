import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { CartContext } from "../contexts";
import Header from "../components/Header";
import PizzaoOfTheDay from "../components/PizzaoOfTheDay";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ErrorBoundary from "../ErrorBoundary";

export const Route = createRootRoute({
  component: () => {
    const cartHook = useState([]);
    return (
      <>
        <CartContext.Provider value={cartHook}>
          <div>
            <Header />
            <Outlet />
            <PizzaoOfTheDay />
          </div>
        </CartContext.Provider>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  },
});
