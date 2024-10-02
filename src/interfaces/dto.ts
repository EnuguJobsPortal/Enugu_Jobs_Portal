import { IBaseQueryParams } from "@/interfaces/general";

/**************************** USER DTOs  *******************************/
export interface INewUserDTO {
	Firstname: string;
	Lastname: string;
	Email: string;
	Phonenumber: string;
	Gender?: string;
	Dob?: string | null;
	Usertypeid: string;
	Country: string;
	CurrentLocation: string;
	Password: string;
	ConfirmPassword: string;
}

export interface IUserUpdateDTO {
	UserAccountId: string;
	Firstname: string;
	Lastname: string;
	Email: string;
	Dob?: Date | string;
	Gender?: string;
	Country: string;
	PositionInCompany?: string;
	CurrentLocation: string;
	Phonenumber: string;
	Isactive: string;
	SmsNotification: string;
	EmailNotification: string;
	Usertypeid: string;
	EmailVerification: string;
	IsFeatured?: string;
}

export interface IUserUpdateRequest {
	payload: IUserUpdateDTO;
	useraccountid: string;
}

export interface IFilterUserDTO {
	UserTypeId?: string;
	Isactive?: string;
	SmsNotification?: string;
	EmailNotification?: string;
	EmailVerification?: string;
	IsFeatured?: string;
}

export type GetAllUserTypesRequestParams = {
	id?: number;
	usertype?: string;
} & IBaseQueryParams;

export type GetAllUsersRequestParams = {
	UserTypeId?: string;
	Isactive?: string;
	SmsNotification?: string;
	EmailNotification?: string;
	EmailVerification?: string;
	IsFeatured?: string;
} & IBaseQueryParams;

export type GetAllSeekerProfileRequestParams = {
	useraccountid?: string;
	gender?: string;
	currentlocation?: string;
	isActive?: string;
} & IBaseQueryParams;

export type GetAllEmployerProfileRequestParams = {
	useraccountid?: string;
	isprofileupdated?: string;
	isfeatured?: string;
	careerindustryid?: string;
	usertype?: string;
	emailnotification?: string;
	smsnotification?: string;
	isActive?: string;
} & IBaseQueryParams;

/*******************************AUTH DTOs**************************/

export interface ISignInDTO {
	Email: string;
	Password: string;
}

export interface IUpdatePasswordDTO {
	oldpassword: string;
	newpassword: string;
	confirmpassword: string;
}

export interface IPasswordUpdateRequest {
	payload: IUpdatePasswordDTO;
	useraccount_id: string;
}

/**********************************ACTIVITY LOG DTOs *******************/
export interface IActivityLogFilterDTO {
	UserAccountId?: string;
	Action?: string;
	CreatedAt?: string;
	Start?: string;
	End?: string;
}

/*************************************JOB POST DTOs *********************/
export interface INewJobPostDTO {
	UAccountId: string;
	JobTitle: string;
	JobCountry: string;
	JobState: string;
	JobDescription: string;
	JobAddress: string;
	ApplicationDeadline: string;
	WorkType: string;
	CareerIndustryId: string;
	Salary: string;
	Currency: string;
	MinimumQualification: string;
	ExperienceLevel: string;
	ExperienceLength: string;
	EmailAddress: string;
	JobType: string;
}

export interface INewJobPost2DTO {
	UAccountId: string;
	JobTitle: string;
	JobCountry: string;
	JobState: string;
	JobDescription: string;
	JobAddress: string;
	ApplicationDeadline: string;
	WorkType: string;
	CareerIndustryId: string;
	Salary: string;
	Currency: string;
	MinimumQualification: string;
	ExperienceLevel: string;
	ExperienceLength: string;
	InternalPosterId: string;
	JobType: string;
	EmailAddress: string;
}

export interface IJobPostUpdateDTO {
	PostId: number;
	UAccountId: string;
	CareerIndustryId: string;
	JobTitle: string;
	JobDescription: string;
	JobCountry: string;
	JobState: string;
	JobAddress: string;
	JobType: string;
	WorkType: string;
	Salary: string;
	Currency: string;
	MinimumQualification: string;
	ExperienceLevel: string;
	ExperienceLength: string;
	Isactive: string;
	ApplicationDeadline: string;
	PublishStatus: string;
}

export interface IJobPostApprovalUpdateDTO {
	UserAccountId: string;
	CareerIndustryId: string;
	JobTitle: string;
	JobDescription: string;
	JobCountry: string;
	JobState: string;
	JobAddress: string;
	JobType: string;
	WorkType: string;
	Salary: string;
	Currency: string;
	MinimumQualification: string;
	ExperienceLevel: string;
	ExperienceLength: string;
	ApplicationDeadline: string;
	EmailAddress: string;
}

export interface IJobPostApprovalDTO {
	PostId: number;
	ApprovedBy: string;
}

export type GetAllJobPostsRequestParams = {
	posterAccountID?: string;
	WorkType?: string;
	IsActive?: string;
	createddate?: string;
	publishstatus?: string;
	carrerindustryid?: string;
	paymentstatus?: string;
} & IBaseQueryParams;

export type GetAllJobPostApprovalRequestParams = {
	UserAccountId?: string;
	InternalPosterId?: string;
	Status?: string;
	DateApproved?: string;
	DatePostedForApproval?: string;
	StartDate?: string;
	EndDate?: string;
} & IBaseQueryParams;

export type GetAllJobPackageRequestParams = {
	numberofpost?: string;
	percentage?: string;
	displaydays?: string;
	packagename?: string;
	packageprice?: string;
} & IBaseQueryParams;

export interface IUpdateJobPostRequest {
	payload: IJobPostUpdateDTO;
	postid: number;
}

export interface IJobPostApprovalUpdateRequest {
	payload: IJobPostApprovalUpdateDTO;
	approval_id: number;
}

export interface IJobPostApprovalRequest {
	payload: IJobPostApprovalDTO;
	approval_id: number;
}

/********************************* JOB APPLICATIONS DTOs  *****************/
export interface IJobApplicationsFilterDTO {
	CompanyName?: string | null;
	WorkType?: string | null;
	Gender?: string | null;
	CurrentLocation?: string | null;
	ApplicationStatus?: string | null;
	UserAccountId?: string | null;
	PostId?: string | null;
	ApplicationDate?: string | null;
	CreatedDate?: string | null;
	Start?: string | null;
	End?: string | null;
}

export type GetAllJobApplicationsRequestParams = {
	CompanyName: string;
	WorkType?: string;
	Gender?: string;
	CurrentLocation?: string;
	ApplicationStatus?: string;
	UserAccountId?: string;
	PostId?: string;
	ApplicationId?: string;
	ApplicationDate?: string;
	Start?: string;
	End?: string;
	CreatedDate?: string;
} & IBaseQueryParams;

/******************************** ACTIVITY LOG DTOs **********************/
export type GetAllActivitiesRequestParams = {
	UserAccountId?: string;
	Action?: string;
	CreatedAt?: string;
	Start?: string;
	End?: string;
} & IBaseQueryParams;

/******************************** ACTIVITY TESTIMONIALS DTOs **********************/
export type GetAllTestimonialsRequestParams = {
	country?: string;
	gender?: string;
	user_type?: string;
} & IBaseQueryParams;

/******************************** PAYMENT DTOs *******************************/
export interface IVerifyJobPostPaymentDTO {
	postId: string;
	reference: string;
	email: string;
	amountpaid: string;
	paymentdate: string;
	paymentstatus: string;
	paymenttype: string;
}

export interface IVerifyJobPostPaymentRequest {
	payload: IVerifyJobPostPaymentDTO;
}

/**************************** PACKAGES DTOs **********************************/
export interface IEmployerPackageDTO {
	PackageName: string;
	DisplayDays: string;
	PackagePrice: string;
	Percentage?: string;
	NumberOfPost: string;
}

export interface IEmployerPackageUpdateDTO {
	Packageid: number;
	PackageName: string;
	DisplayDays: string;
	PackagePrice: string;
	Percentage?: string;
	NumberOfPost: string;
}

export type GetAllEmployerPackageRequestParams = {
	numberofpost?: string;
	percentage?: string;
	packageprice?: string;
	displaydays?: string;
	packagename?: string;
	packageid?: string;
} & IBaseQueryParams;

export interface IUpdateEmployerPackageRequest {
	payload: IEmployerPackageUpdateDTO;
	packageid: number;
}

export interface ISeekerPackageDTO {
	PackageName: string;
	PackagePrice: string;
	Availability: string;
}

export interface ISeekerPackage2DTO {
	PackageName: string;
	PackagePrice: string;
	PackageDays: string;
	PackageAvailability: string;
	PackageOrder: string;
}

export type GetAllSeekerPackageRequestParams = {
	availability?: string;
	packageprice?: string;
	packagename?: string;
	trainingpackageid?: string;
} & IBaseQueryParams;

export type GetAllSeekerPackageSubscriptionRequestParams = {
	SubscriptionId?: string;
	UserAccountId?: string;
	PackageId?: string;
	PackageName?: string;
	EmailAddress?: string;
	SubscriptionDate?: string;
	TransactionReference?: string;
	TransactionStatus?: string;
	Amount?: string;
	StartDate?: string;
	EndDate?: string;
} & IBaseQueryParams;

export type GetAllSeekerPackageRequestParams2 = {
	PackageId?: string;
	PackageName?: string;
	PackagePrice?: string;
	PackageDays?: string;
} & IBaseQueryParams;

export interface ISeekerPackageUpdateDTO {
	TrainingPackageId: number;
	PackageName: string;
	PackagePrice: string;
	Availability: string;
}

export interface ISeekerPackageUpdate2DTO {
	PackageName: string;
	PackagePrice: string;
	PackageDays: string;
	PackageAvailability: string;
	PackageOrder: string;
}

export interface INewSeekerPackageDescriptionDTO {
	PackageId: string;
	Description: string;
	DescriptionOrder: string;
}

export interface IUpdateSeekerPackageDescriptionDTO {
	PackageId: string;
	Description: string;
	DescriptionOrder: string;
}

export interface IUpdateSeekerPackageRequest {
	payload: ISeekerPackageUpdateDTO;
	packageid: number;
}

export interface IUpdateSeekerPackageRequest2 {
	payload: ISeekerPackageUpdate2DTO;
	packageId: string;
}

export interface IUpdateSeekerPackageDescriptionRequest {
	payload: IUpdateSeekerPackageDescriptionDTO;
	descriptionId: string;
}

export interface ISeekerProfileCreateUpdateDTO {
	UserAccountId: string;
	CareerIndustryId: string;
	Cvupload?: File;
	Photo?: File;
	Currency: string;
	CurrentSalary: string;
}

export interface IEmployerProfileCreateUpdateDTO {
	UserAccountId: string;
	CareerIndustryId: string;
	Cac_Certificate?: File;
	Company_Image?: File;
	CompanyWebsiteUrl?: string | null;
	EstablishmentDate: string;
	OfficeAddress: string;
	ProfileDescription: string;
}

/****************************************** BLOG DTOs ************************************/
export interface IBlogPostCategoryDTO {
	CategoryName: string;
}

export interface IBlogPostCategoryUpdateDTO {
	NewsCategoryId: number;
	CategoryName: string;
	CategoryStatus: string;
}

export interface IBlogPostDTO {
	NewsCategoryId: string;
	NewsTitle: string;
	CoverImage: File;
	NewsTags: string;
	NewsBody: string;
}

export interface IBlogPostUpdateDTO {
	NewsCategoryId: string;
	NewsTitle: string;
	CoverImage?: File;
	NewsTags: string;
	NewsStatus: string;
	NewsBody: string;
}

export type GetAllBlogPostRequestParams = {
	NewsCategoryId?: string;
	NewsStatus?: string;
	AuthorId?: string;
	NewsId?: string;
	Start?: string;
	End?: string;
} & IBaseQueryParams;

export interface IUpdateBlogPostCategoryRequest {
	payload: IBlogPostCategoryUpdateDTO;
}

export type GetAllBlogCommentsRequestParams = {
	commentstatus?: string;
	commenterid?: string;
	newsid?: string;
	newstitle?: string;
	commentername?: string;
} & IBaseQueryParams;

export interface IBlogCommentUpdateDTO {
	NewsCommentID: number;
	NewsComment: string;
	NewsCommentStatus: string;
}

export interface IUpdateBlogCommentRequest {
	payload: IBlogCommentUpdateDTO;
}

/*******************************************DASHBOARD DTO *****************************************/
export type GetJobPostChartRequestParams = {
	year: string;
};

export type GetJobApplicationsChartRequestParams = {
	year: string;
};

export type GetMonthlySalesStatisticsRequestParams = {
	year: string;
};

/***************************************** MESSAGES DTO *******************************************/
export type GetAllMessagesRequestParams = {
	MessageId?: string;
	FullName?: string;
	Email?: string;
	Subject?: string;
	UserMessage?: string;
	Status?: string;
} & IBaseQueryParams;

export interface IUpdateMessageStatusRequest {
	payload: null;
	MessageId: string;
	Status: "read" | "unread";
}

export interface IReplyMessageDTO {
	subject: string;
	body: string;
	messageID: string;
}

export type GetAllMailingListRequestParams = {
	SubscriberId?: string;
	SubscriberEmail?: string;
} & IBaseQueryParams;
