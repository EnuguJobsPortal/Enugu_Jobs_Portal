import { ActionButtonContextProps, ActionButtonState } from "@/interfaces/context.interface";
import { IChildren } from "@/interfaces/general";
import React, { useContext } from "react";

export const ActionButtonContext = React.createContext<ActionButtonContextProps>({});

export const ActionButtonProvider = ({ children }: IChildren) => {
	const [actionBtn, setActionBtn] = React.useState<ActionButtonState[]>([]);
	
	return (
		<ActionButtonContext.Provider value={{ actionBtn, setActionBtn }}>
			{children}
		</ActionButtonContext.Provider>
	);
};

export const useActionButtonContext = (): ActionButtonContextProps => {
    const context = useContext(ActionButtonContext);
    
    if (!context) {
      throw new Error('useActionButtonContext must be used within a ActionButtonProvider');
    }

    return context;
};