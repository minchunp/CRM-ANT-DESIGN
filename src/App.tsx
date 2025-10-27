import { Fragment, useEffect } from "react";
import useRouterElements from "./useRouterElements";
import { useAppContext } from "./context/AppContext";
import { LocalStorageEventTarget } from "./utils/localStorage";

function App() {
   const routeElements = useRouterElements();
   const { reset } = useAppContext();

   useEffect(() => {
      LocalStorageEventTarget.addEventListener("clearLS", reset);
      return () => {
         LocalStorageEventTarget.removeEventListener("clearLS", reset);
      };
   }, [reset]);

   return (
      <Fragment>
         <div>{routeElements}</div>
      </Fragment>
   );
}

export default App;
