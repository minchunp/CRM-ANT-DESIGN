/* eslint-disable react-refresh/only-export-components */
import type { User } from "../interfaces/user.interface";
import { getAccessTokenFromLS, getProfileFromLS } from "../utils/localStorage";
import { createContext, useContext, useState } from "react";

interface AppContext {
   isAuthenticated: boolean;
   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
   profile: User | null;
   setProfile: React.Dispatch<React.SetStateAction<User | null>>;
   reset: () => void;
}

const initialAppContext: AppContext = {
   isAuthenticated: Boolean(getAccessTokenFromLS()),
   setIsAuthenticated: () => null,
   profile: getProfileFromLS(),
   setProfile: () => null,
   reset: () => null,
};

export const AppContext = createContext<AppContext>(initialAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated);
   const [profile, setProfile] = useState<User | null>(initialAppContext.profile);

   const reset = () => {
      setIsAuthenticated(false);
      setProfile(null);
   };

   return <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile, reset }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
   const context = useContext(AppContext);
   if (!context) {
      throw new Error("useAppContext must be used within an AppProvider");
   }
   return context;
};
