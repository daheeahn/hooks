import { useEffect, useState, useRef } from "react";

export const useHover = onHover => {
  if (typeof onHover !== "function") {
    return;
  }

  const element = useRef();

  useEffect(() => {
    // useEffect는 mount되었을 때 이곳을 call. didupdate도 (Deps가 존재하지 않는한.). 근데 deps정해주면 그 안에 있는것만 바뀌었을 때 여길 실행하는거야.
    if (element.current) {
      // 이 모든 것은 ref 덕에 동작하는거야!
      element.current.addEventListener("mouseenter", onHover); // didupdate때마다 호출되면 안되니까, deps = [] 로!
    }

    // willunmount
    return () => {
      // function을 리턴한다. useEffect를 return 받은 그 함수는 componentWillUnMount 때 호출될거야.
      if (element.current) {
        element.current.removeEventListener("mouseenter", onHover);
      }
      // 너가 function 을 return 받았다면, 그 함수는 willunmount로부터 호출된거야.
    };
  }, []);
  return element;
};