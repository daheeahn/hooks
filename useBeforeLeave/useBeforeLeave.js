import { useEffect, useState, useRef } from "react";

export const useBeforeLeave = onBefore => {
    if (typeof onBefore !== "function") {
      return;
    }
  
    useEffect(() => {
      const handle = event => {
        const { clientY } = event;
        if (clientY <= 0) {
          onBefore();
          console.log(event.clientY);
        }
      };
      document.addEventListener("mouseleave", handle);
  
      return () => document.removeEventListener("mouseleave", handle);
    }, []);
  };