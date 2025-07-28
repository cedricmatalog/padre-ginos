import { use } from "react";
import { CartContext } from "../shared/contexts/contexts";
import { useTheme } from "../shared/contexts/ThemeContext";
import { Link } from "@tanstack/react-router";

export default function Header() {
  const [cart] = use(CartContext);
  const { isDark, toggle } = useTheme();
  const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  
  
  return (
    <header role="banner" className="bg-padre-background border-b border-padre-border shadow-sm transition-colors duration-200">
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
        
        <div className="flex-1 flex justify-end items-center gap-4">
          <button 
            onClick={toggle}
            className="p-3 text-padre-primary hover:text-padre-secondary transition-colors duration-200"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            type="button"
          >
            {!isDark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
          
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
