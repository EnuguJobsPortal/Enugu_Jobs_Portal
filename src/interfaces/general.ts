import { SelectOption } from "@/interfaces/controlnput.interface";
import {
	IContactMessageResponse,
	ITestimonyResponse,
} from "@/interfaces/response.interface";
import { JwtPayload } from "jwt-decode";
import { icons } from "lucide-react";
import { DateRange } from "react-day-picker";

export type IRolesType = "Super admin" | "Admin" | "JobSeeker" | "Employer";

export interface IRoleObject {
	SUPERADMIN: string;
	ADMIN: string;
	EMPLOYEE: string;
	JOB_SEEKER: string;
}

export interface IUserDecoded extends JwtPayload {
	UserAccountID: number;
	Firstname: string;
	Lastname: string;
	Email: string;
	Dob: string;
	Gender: string;
	Country: string;
	CurrentLocation: string;
	Phonenumber: string;
	RegistrationDate: string;
	Isactive: string;
	SmsNotification: string;
	EmailNotification: string;
	UserType: string;
}

export interface IconProps {
	name: keyof typeof icons; // keyof typeof icons represents the valid icon names
	color?: string;
	size?: number;
}

export type IChildren = {
	children: React.ReactNode;
};

export interface AvatarProps {
	name: string;
	size?: number;
	backgroundColor?: string;
	textColor?: string;
}

export interface AvatarProps2 {
	name: string;
	className?: string;
	initialsClass?: string;
}

export type IBreadCrumb = {
	label: string;
	value: string;
};

export type IBreadCrumbProps = {
	links?: IBreadCrumb[];
	current: string;
	isBack?: boolean;
	//   back: boolean;
};

export interface IDashboardCardProps {
	label: string;
	totalCount: number;
	yesterdayCount: number;
	todayCount: number;
	path: string;
	id?: string;
	isLoading?: boolean;
}

export interface ILoadingProps {
	color?: string;
	size?: number;
}

export type ParseQueryParams = Record<
	string | symbol | number,
	string | string[] | boolean
>;

export type IBaseQueryParams = {
	PageNumber?: number;
	PageSize?: number;
	Search?: string;
	Sort?: string;
	FilterBy?: string;
};

export type ITablePaginationFunction = React.Dispatch<
	React.SetStateAction<ITablePagination>
>;

export type Pagination = {
	total: number;
	pageNumber: number;
	pageSize: number;
	totalPage?: number;
};

export interface ITablePagination {
	search: string;
	sort?: string;
	filterBy?: string | number;
	pagination: Pagination;
}

export interface IPagination {
	pageIndex: number;
	pageSize: number;
}

export interface IPaystackPaymentParams {
	email: string;
	amount: number;
	onSuccess: (ref: string) => void;
	onClose: () => void;
}

export interface IPaystackResponse {
	reference: string;
	status: string;
}

export type UseErrorQueryHandlerProps = {
	message?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error?: any;
	isSuccess?: boolean;
	isError?: boolean;
};

export interface ITableCellMenuItem {
	label: string;
	icon: keyof typeof icons;
	iconColor: string;
	handleClick: () => void;
}

export interface ITableCellActionMenuProps {
	menuLabel?: string;
	menuItems: ITableCellMenuItem[];
}

export interface ISelectDropDownProps {
	selected: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
	options: SelectOption[];
	className?: string;
	placeholder?: string;
	allowEmpty?: boolean;
	isLoading?: boolean;
	onEndOfRow?: (_x: boolean) => void;
	onValueChange?: (value: string) => void;
}

export interface IMessageDetailsProps {
	message: IContactMessageResponse | undefined;
	onReplyClick: (messageID: string) => void;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

export interface ITestimonyDetailsProps {
	testimony: ITestimonyResponse | undefined;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

export interface DateRangePickerProps {
	selected: DateRange | undefined;
	onChange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
	placeHolder?: string;
	disableFuture?: boolean;
	dateFormat?: string;
	className?: React.HTMLAttributes<HTMLDivElement>;
	buttonClassName?: string;
	iconClassName?: string;
	calendarClassName?: string;
}

export interface DatePickerProps {
	selected: Date | undefined;
	onChange: React.Dispatch<React.SetStateAction<Date | undefined>>;
	placeHolder?: string;
	disableFuture?: boolean;
	dateFormat?: string;
	className?: React.HTMLAttributes<HTMLDivElement>;
	buttonClassName?: string;
	iconClassName?: string;
	calendarClassName?: string;
}
