import {
	IActivityLogFilterDTO,
	IFilterUserDTO,
	IJobApplicationsFilterDTO,
	INewJobPostDTO,
	INewUserDTO,
} from "@/interfaces/dto";
import {
	IBlogCategoryResponse,
	IBlogCommentResponse,
	IBlogPostResponse,
	IJobPackageResponse,
	IJobPostApprovalResponse,
	IJobPostResponse,
	ISeekerPackageDescriptionResponse,
	ISeekerPackageResponse,
	ISeekerPackageResponse2,
	IUserResponse,
} from "@/interfaces/response.interface";

export interface INewUserFormProps {
	onNewUserSubmit: (values: INewUserDTO) => void;
}

export interface IUserFilterFormProps {
	handleFilterSubmit: (values: IFilterUserDTO) => void;
}

export interface IActivityLogFilterFormProps {
	handleFilterSubmit: (values: IActivityLogFilterDTO) => void;
}

export interface INewJobPostFormProps {
	onNewJobPostSubmit: (values: INewJobPostDTO) => void;
}

export interface IJobApplicationsFilterFormProps {
	handleFilterSubmit: (values: IJobApplicationsFilterDTO) => void;
}

export interface IUserUpdateFormProps {
	userData?: IUserResponse;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

export interface IJobUpdateFormProps {
	jobData?: IJobPostResponse;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

export interface IJobApprovalUpdateFormProps {
	jobData?: IJobPostApprovalResponse;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

export interface IEmployerPackageUpdateFormProps {
	pkgData?: IJobPackageResponse;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

export interface ISeekerPackageUpdateFormProps {
	pkgData?: ISeekerPackageResponse;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

export interface ISeekerPackageUpdateFormProps2 {
	pkgData: ISeekerPackageResponse2 | undefined;
	setPkgData: React.Dispatch<
		React.SetStateAction<ISeekerPackageResponse2 | undefined>
	>;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

export interface INewSeekerPackageDescriptionFormProps2 {
	pkgData: ISeekerPackageResponse2 | undefined;
	setPkgData: React.Dispatch<
		React.SetStateAction<ISeekerPackageResponse2 | undefined>
	>;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

export interface IUpdateSeekerPackageDescriptionFormProps {
	descriptionData: ISeekerPackageDescriptionResponse | undefined;
	setDescriptionData: React.Dispatch<
		React.SetStateAction<ISeekerPackageDescriptionResponse | undefined>
	>;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

export interface IBlogPostUpdateFormProps {
	blogData?: IBlogPostResponse;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

export interface IBlogPostCategoryUpdateFormProps {
	blogCategoryData?: IBlogCategoryResponse;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

export interface ISeekerProfileFormProps {
	seekerData?: IUserResponse;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

export interface IEmployerProfileFormProps {
	employerData?: IUserResponse;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}

export interface IBlogCommentUpdateFormProps {
	comment?: IBlogCommentResponse;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
}
