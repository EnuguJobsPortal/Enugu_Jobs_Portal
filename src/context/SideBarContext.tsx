import { ISidebarContextProps } from "@/interfaces/context.interface";
import React, { createContext, useContext, useState } from "react";

export const SidebarContext = createContext<ISidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ isExpanded, setIsExpanded ] = useState<boolean>(true)
    const [activeDropdownIndex, setActiveDropdownIndex] = useState<string | null>(null);
    const [scrollbarVisible, setScrollbarVisible] = useState<boolean>(false);
  
    const contextValue: ISidebarContextProps = {
        isExpanded,
        setIsExpanded,
        activeDropdownIndex,
        setActiveDropdownIndex,
        scrollbarVisible,
        setScrollbarVisible
    };
  
    return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>;
};

export const useSidebarContext = (): ISidebarContextProps => {
    const context = useContext(SidebarContext);
    
    if (!context) {
      throw new Error('useSidebarContext must be used within a SidebarProvider');
    }

    return context;
};