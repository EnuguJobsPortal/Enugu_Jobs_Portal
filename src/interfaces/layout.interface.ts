import { IRoleObject } from "@/interfaces/general";
import { icons } from "lucide-react";

export interface IDropdownItems {
	label: string;
	path: string;
	icon: keyof typeof icons;
	isDropdownOpen?: boolean;
	allowedRoles?: Array<IRoleObject[keyof IRoleObject]>;
}

export interface ILink {
	key?: string;
	label: string;
	path: string;
	icon: keyof typeof icons;
	isDropdown?: boolean;
	isDropdownOpen?: boolean;
	dropdownItems?: IDropdownItems[];
	allowedRoles?: Array<IRoleObject[keyof IRoleObject]>;
}

export interface ISidebarData {
	section: string;
	links: ILink[];
}

export type LoaderProps = {
	showTitle?: boolean;
	title?: string;
};

export type HelmetProps = {
	children: React.ReactNode;
	title: string;
};
