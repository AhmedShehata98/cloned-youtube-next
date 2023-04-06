import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: any) => {
  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.querySelector("#download-window")!)
    : null;
};

export default Portal;
