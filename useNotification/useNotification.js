import { useEffect, useState, useRef } from "react";

export const useNotification = (title, options) => {
  if (!("Notification" in window)) {
    return;
  } // 크롬 개발자 도구 콘솔에서 window.Notification 이렇게 할거거든

  const fireNotif = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
  };
  return fireNotif;
};

// const App = () => {
//   const triggerNotif = useNotification("Can I steal your kimchi?", {
//     body: "h"
//   });
//   return (
//     <div>
//       <button onClick={triggerNotif}>ss</button>
//     </div>
//   );
// };

// export default App;
