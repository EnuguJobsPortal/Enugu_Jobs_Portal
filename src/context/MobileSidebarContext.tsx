import { IMobileSidebarContextProps } from "@/interfaces/context.interface";
import React, { createContext, useContext, useState } from "react";

export const MobileSidebarContext = createContext<IMobileSidebarContextProps | undefined>(undefined);

export const MobileSidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ open, setOpen ] = useState<boolean>(false);
    const [activeDropdownIndex, setActiveDropdownIndex] = useState<string | null>(null);
    const [scrollbarVisible, setScrollbarVisible] = useState<boolean>(false);
  
    const contextValue: IMobileSidebarContextProps = {
        open,
        setOpen,
        activeDropdownIndex,
        setActiveDropdownIndex,
        scrollbarVisible,
        setScrollbarVisible
    };
  
    return <MobileSidebarContext.Provider value={contextValue}>{children}</MobileSidebarContext.Provider>;
};

export const useMobileSidebarContext = (): IMobileSidebarContextProps => {
    const context = useContext(MobileSidebarContext);
    
    if (!context) {
      throw new Error('useMobileSidebarContext must be used within a MobileSidebarProvider');
    }

    return context;
};