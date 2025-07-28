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

      return () => {
        if (modalRoot && elRef.current) {
          modalRoot.removeChild(elRef.current);
        }
      };
    }
  }, []);

  return elRef.current ? createPortal(<div>{children}</div>, elRef.current) : null;
};

export default Modal;
