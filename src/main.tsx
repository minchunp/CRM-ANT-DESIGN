/* eslint-disable react-refresh/only-export-components */
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme, App as AntApp } from "antd";
import viVN from "antd/lib/locale/vi_VN";
import App from "./App.tsx";
import { AppProvider } from "./context/AppContext.tsx";
import { ThemeProvider, useTheme } from "./context/ThemeContext.tsx";
import { GlobalMessageProvider } from "./context/MessageContext.tsx";
import "./styles/index.css";
import "./styles/theme.css";

export const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         retry: 0,
      },
   },
});

const AppWithTheme = () => {
   const { theme: currentTheme } = useTheme();

   return (
      <ConfigProvider
         locale={viVN}
         theme={{
            algorithm: currentTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
         }}
      >
         <AntApp>
            <App />
         </AntApp>
      </ConfigProvider>
   );
};

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
               <ThemeProvider>
                  <GlobalMessageProvider>
                     <AppWithTheme />
                  </GlobalMessageProvider>
               </ThemeProvider>
            </AppProvider>
         </QueryClientProvider>
      </BrowserRouter>
   );
});
