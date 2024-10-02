import { IBreadCrumbContext, IBreadCrumbProvider, IBreadCrumbState } from "@/interfaces/context.interface";
import React, { useContext } from "react";

export const BreadCrumbContext = React.createContext<IBreadCrumbContext>({
	breadCrumb: {
		current: "",
	},
});
  
export const BreadCrumbProvider = ({ children }: IBreadCrumbProvider) => {
	const [breadCrumb, setBreadCrumb] = React.useState<IBreadCrumbState>({
		current: "",
	});

	return (
		<BreadCrumbContext.Provider value={{ breadCrumb, setBreadCrumb }}>
			{children}
		</BreadCrumbContext.Provider>
	);
};
  
export const useBreadCrumbContext = (): IBreadCrumbContext => {
    const context = useContext(BreadCrumbContext);
    
    if (!context) {
      throw new Error('useBreadcrumbContext must be used within a BreadCrumbProvider');
    }

    return context;
};