import { IRoleObject } from "@/interfaces/general";
import React from "react";

interface ILayoutComponentProps {
	children: React.ReactNode;
}

export interface IBaseRoutes {
	path: string;
	component: React.LazyExoticComponent<() => JSX.Element>;
	allowedRoles?: Array<IRoleObject[keyof IRoleObject]>;
	layout?: React.FC<ILayoutComponentProps>;
	isAuthenticated?: boolean;
}

export interface IProtectedRoutes {
	children: React.ReactElement;
	allowedRoles: Array<IRoleObject[keyof IRoleObject]>;
}

export interface IRequiredRoles {
	children: React.ReactElement;
	allowedRoles: Array<IRoleObject[keyof IRoleObject]>;
}

export interface ProtectedComponentProps {
	element: React.ReactNode;
	allowedRoles: Array<IRoleObject[keyof IRoleObject]>;
}
