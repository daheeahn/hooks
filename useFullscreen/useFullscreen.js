import { useEffect, useState, useRef } from "react";

export const useFullscreen = callback => {
  const element = useRef();
  const runCallback = isFull => {
    if (callback && typeof callback === "function") {
      callback(isFull);
    }
  }
  const triggerFull = () => {
    if (element.current) {
      if (element.current.requestFullscreen) {
        element.current.requestFullscreen();
      } else if (element.current.mozRequestFullScreen) { // Full Screen ? S ??
        element.current.mozRequestFullScreen() // firefox
      } else if (element.current.webkitRequestFullscreen) { // opera
        element.current.webkitRequestFullscreen()
      } else if (element.current.msRequestFullscreen) { // micro soft
        element.current.msRequestFullscreen()
      }
      runCallback(true)
    }
  };
  const exitFull = () => {
    // fullscreen 들어갈 땐 element인데, 나갈 땐 document야. 왜그런지는 나도 모름
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    runCallback(false);
  };
  return { element, triggerFull, exitFull };
};

// const App = () => {
//   const callback = isFull => {
//     console.log(isFull ? "We are full" : "We are small");
//   };
//   const { element, triggerFull, exitFull } = useFullscreen(callback);
//   return (
//     <div>
//       <div ref={element}>
//         <img src="https://img.hankyung.com/photo/201911/AB.20878479.1.jpg" />
//         <button onClick={exitFull}>Exit</button>
//       </div>
//       <button onClick={triggerFull}>Make fullscreen</button>
//     </div>
//   );
// };

// export default App;
