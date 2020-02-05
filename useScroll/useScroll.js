import { useEffect, useState, useRef } from "react";

export const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0
  });
  useEffect(() => {
    const onScroll = () => {
      // 여기에 (event) => 이렇게 해도 event 알 수 있다. 원래 그런건가봐
      console.log("y ", window.scrollY, "x ", window.scrollX);
      setState({ y: window.scrollY, x: window.scrollX });
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return state;
};

// 이런 식으로 응용
// const App = () => {
//   const { y } = useScroll();
//   return (
//     <div style={{ height: "1000vh" }}>
//       <h1
//         style={{
//           color: y > 100 ? "red" : "blue",
//           position: "fixed"
//         }}
//       >
//         hi
//       </h1>
//     </div>
//   );
// };