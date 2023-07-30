import { useEffect, useRef } from "react";

export function useComponentHideAndShow(setOpen) {
  const ref = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [ref, setOpen]);

  return { ref };
}
