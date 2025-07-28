import { use } from "react";
import { CartContext } from "../shared/contexts/contexts";
import { Link } from "@tanstack/react-router";

export default function Header() {
  const [cart] = use(CartContext);
  const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  
  return (
    <header role="banner" className="bg-white border-b border-padre-border shadow-sm">
      <nav className="w-full flex justify-between items-center sticky top-0 z-50 px-8 py-6" aria-label="Main navigation">
        <div className="flex-1" aria-hidden="true"></div>
        
        <Link to="/" className="flex-1 flex justify-center group" aria-label="Padre Gino's home page">
          <img
            src="/padre_gino.svg"
            alt="Padre Gino's Pizza & Art logo"
            className="h-12 transition-transform duration-200 group-hover:scale-105"
            width="120"
            height="48"
          />
        </Link>
        
        <div className="flex-1 flex justify-end items-center">
          <button 
            className="relative p-3 text-padre-primary hover:text-padre-secondary transition-colors duration-200"
            aria-label={`Shopping cart with ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19" />
            </svg>
            {totalItems > 0 && (
              <span 
                className="bg-padre-secondary text-white flex items-center justify-center absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full font-medium min-w-5"
                aria-hidden="true"
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
