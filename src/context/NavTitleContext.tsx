import { INavTitle, INavTitleContext } from "@/interfaces/context.interface";
import { IChildren } from "@/interfaces/general";
import React, { useContext } from "react";

export const NavTitleContext = React.createContext<INavTitleContext>({
	title: {
		title: "",
	},
});

export const NavTitleProvider = ({ children }: IChildren) => {
	const [title, setTitle] = React.useState<INavTitle>({
		title: "",
	});

	return <NavTitleContext.Provider value={{ setTitle, title }}>{children}</NavTitleContext.Provider>;
};

export const useNavTitleContext = (): INavTitleContext => {
    const context = useContext(NavTitleContext);
    
    if (!context) {
      throw new Error('useNavTitleContext must be used within a SidebarProvider');
    }

    return context;
};
