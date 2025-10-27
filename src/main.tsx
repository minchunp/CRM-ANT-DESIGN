import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import viVN from "antd/lib/locale/vi_VN";
import App from "./App.tsx";
import "./index.css";
import { AppProvider } from "./context/AppContext.tsx";

export const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         retry: 0,
      },
   },
});

const prepare = async () => {
   if (import.meta.env.DEV) {
      const { worker } = await import("./mocks/browser.ts");
      return worker.start({ onUnhandledRequest: "bypass" });
   }
   return Promise.resolve();
};

prepare().then(() => {
   ReactDOM.createRoot(document.getElementById("root")!).render(
      <BrowserRouter>
         <QueryClientProvider client={queryClient}>
            <AppProvider>
               <ConfigProvider locale={viVN}>
                  <App />
               </ConfigProvider>
            </AppProvider>
         </QueryClientProvider>
      </BrowserRouter>
   );
});
