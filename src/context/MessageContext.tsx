/* eslint-disable react-refresh/only-export-components */
import { message } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import { createContext, useContext } from "react";

interface GlobalMessageContextType {
   messageApi: MessageInstance;
}

const GlobalMessageContext = createContext<GlobalMessageContextType | null>(null);

export const GlobalMessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [messageApi, contextHolder] = message.useMessage();

   return (
      <GlobalMessageContext.Provider value={{ messageApi }}>
         {contextHolder}
         {children}
      </GlobalMessageContext.Provider>
   );
};

export const useGlobalMessage = () => {
   const context = useContext(GlobalMessageContext);
   if (!context) {
      throw new Error("useGlobalMessage must be used within a GlobalMessageProvider");
   }
   return context.messageApi;
};
