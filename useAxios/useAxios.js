import { useEffect, useState, useRef } from "react";

export const useAxios = (options, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null
  });
  const [trigger, setTrigger] = useState(0);
  if (!options.url) {
    return;
  }

  const refetch = () => {
    setState({
      ...state,
      loading: true
    });
    setTrigger(Date.now()); // 15235234 이런 숫자 나오는거 알지 매번 달라지니까~
  };
  useEffect(() => {
    axiosInstance(options)
      .then(data => {
        console.log(data);
        setState({
          ...state,
          loading: false,
          data
        });
      })
      .catch(error => {
        setState({ ...state, loading: false, error });
      });
  }, [trigger]); // trigger가 발생됐다 ! 버튼 클릭함으로써!!!! 그래서 useEffect가 다시 실행된다!!!!
  return { ...state, refetch };
};

// const App = () => {
//   const { loading, error, data, refetch } = useAxios({
//     url: "https://yts.mx/api/v2/list_movies.json"
//   });
//   console.log(loading, error, JSON.stringify(data));
//   return (
//     <div>
//       <h1>{data && data.status}</h1>
//       <h2>{loading && "Loading"}</h2>
//       <button onClick={refetch}>Refetch</button>
//     </div>
//   );
// };