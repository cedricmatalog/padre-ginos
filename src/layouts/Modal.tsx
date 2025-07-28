import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { ModalProps } from "../shared/types";

const Modal: React.FC<ModalProps> = ({ children }) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (modalRoot && elRef.current) {
      modalRoot.appendChild(elRef.current);

      // Focus management and escape key handling
      const previouslyFocusedElement = document.activeElement as HTMLElement;
      
      // Trap focus in modal
      const focusableElements = elRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusableElement = focusableElements[0] as HTMLElement;
      const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      // Focus first element
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              e.preventDefault();
              lastFocusableElement?.focus();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              e.preventDefault();
              firstFocusableElement?.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        if (modalRoot && elRef.current) {
          modalRoot.removeChild(elRef.current);
        }
        // Restore focus
        if (previouslyFocusedElement) {
          previouslyFocusedElement.focus();
        }
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);

  return elRef.current ? createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* Modal Content */}
      <div 
        role="dialog" 
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto border border-gray-200 p-6"
      >
        {children}
      </div>
    </div>, 
    elRef.current
  ) : null;
};

export default Modal;
