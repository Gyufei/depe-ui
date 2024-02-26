import { useState, useEffect } from "react";

export default function useScrollTop() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop === 0) {
        setHide(true);
      } else {
        setHide(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    hide,
  };
}
