import {
	IActivityLogFilterDTO,
	IBlogCommentUpdateDTO,
	IBlogPostCategoryDTO,
	IBlogPostCategoryUpdateDTO,
	IBlogPostDTO,
	IBlogPostUpdateDTO,
	IEmployerPackageDTO,
	IEmployerPackageUpdateDTO,
	IEmployerProfileCreateUpdateDTO,
	IFilterUserDTO,
	IJobApplicationsFilterDTO,
	IJobPostApprovalUpdateDTO,
	IJobPostUpdateDTO,
	INewJobPost2DTO,
	INewJobPostDTO,
	INewSeekerPackageDescriptionDTO,
	INewUserDTO,
	IReplyMessageDTO,
	ISeekerPackage2DTO,
	ISeekerPackageDTO,
	ISeekerPackageUpdate2DTO,
	ISeekerPackageUpdateDTO,
	ISeekerProfileCreateUpdateDTO,
	ISignInDTO,
	IUpdatePasswordDTO,
	IUpdateSeekerPackageDescriptionDTO,
	IUserUpdateDTO,
} from "@/interfaces/dto";

export const signInDefaultValues: ISignInDTO = {
	Email: "",
	Password: "",
};

export const updatePasswordDefaultValues: IUpdatePasswordDTO = {
	oldpassword: "",
	newpassword: "",
	confirmpassword: "",
};

export const newUserDefaultValues: INewUserDTO = {
	Firstname: "",
	Lastname: "",
	Email: "",
	Phonenumber: "",
	Gender: "",
	Dob: "",
	Usertypeid: "",
	Country: "",
	CurrentLocation: "",
	Password: "",
	ConfirmPassword: "",
};

export const userUpdateDefaultValues: IUserUpdateDTO = {
	UserAccountId: "",
	Firstname: "",
	Lastname: "",
	Email: "",
	Dob: "",
	Gender: "",
	Country: "",
	PositionInCompany: "",
	CurrentLocation: "",
	Phonenumber: "",
	Isactive: "",
	SmsNotification: "",
	EmailNotification: "",
	Usertypeid: "",
	EmailVerification: "",
	IsFeatured: "",
};

export const filterUserDefaultValues: IFilterUserDTO = {
	UserTypeId: "",
	Isactive: "",
	SmsNotification: "",
	EmailNotification: "",
	EmailVerification: "",
	IsFeatured: "",
};

export const activityLogFilterDefaultValues: IActivityLogFilterDTO = {
	UserAccountId: "",
	CreatedAt: "",
	Action: "",
	Start: "",
	End: "",
};

export const newJobPostDefaultValues: INewJobPostDTO = {
	UAccountId: "",
	JobTitle: "",
	JobCountry: "",
	JobState: "",
	JobDescription: "",
	JobAddress: "",
	ApplicationDeadline: "",
	WorkType: "",
	CareerIndustryId: "",
	Salary: "",
	Currency: "",
	MinimumQualification: "",
	ExperienceLevel: "",
	ExperienceLength: "",
	EmailAddress: "",
	JobType: "",
};

export const newJobPost2DefaultValues: INewJobPost2DTO = {
	UAccountId: "",
	JobTitle: "",
	JobCountry: "",
	JobState: "",
	JobDescription: "",
	JobAddress: "",
	ApplicationDeadline: "",
	WorkType: "",
	CareerIndustryId: "",
	Salary: "",
	Currency: "",
	MinimumQualification: "",
	ExperienceLevel: "",
	ExperienceLength: "",
	InternalPosterId: "",
	JobType: "",
	EmailAddress: "",
};

export const updateJobPostDefaultValues: IJobPostUpdateDTO = {
	PostId: 0,
	UAccountId: "",
	CareerIndustryId: "",
	JobTitle: "",
	JobDescription: "",
	JobCountry: "",
	JobState: "",
	JobAddress: "",
	JobType: "",
	WorkType: "",
	Salary: "",
	Currency: "",
	MinimumQualification: "",
	ExperienceLevel: "",
	ExperienceLength: "",
	Isactive: "",
	ApplicationDeadline: "",
	PublishStatus: "",
};

export const updateJobPostApprovalDefaultValues: IJobPostApprovalUpdateDTO = {
	UserAccountId: "",
	CareerIndustryId: "",
	JobTitle: "",
	JobDescription: "",
	JobCountry: "",
	JobState: "",
	JobAddress: "",
	JobType: "",
	WorkType: "",
	Salary: "",
	Currency: "",
	MinimumQualification: "",
	ExperienceLevel: "",
	ExperienceLength: "",
	ApplicationDeadline: "",
	EmailAddress: "",
};

export const jobApplicationsFilterDefaultValues: IJobApplicationsFilterDTO = {
	CompanyName: "",
	WorkType: "",
	Gender: "",
	ApplicationStatus: "",
	UserAccountId: "",
	PostId: "",
	ApplicationDate: "",
	CreatedDate: "",
	Start: "",
	End: "",
};

export const employerPackageDefaultValues: IEmployerPackageDTO = {
	PackageName: "",
	DisplayDays: "",
	PackagePrice: "",
	Percentage: "",
	NumberOfPost: "",
};

export const employerPackageUpdateDefaultValues: IEmployerPackageUpdateDTO = {
	Packageid: 0,
	PackageName: "",
	DisplayDays: "",
	PackagePrice: "",
	Percentage: "",
	NumberOfPost: "",
};

export const seekerPackageDefaultValues: ISeekerPackageDTO = {
	PackageName: "",
	PackagePrice: "",
	Availability: "",
};

export const seekerPackageDefaultValues2: ISeekerPackage2DTO = {
	PackageName: "",
	PackagePrice: "",
	PackageDays: "",
	PackageAvailability: "",
	PackageOrder: "",
};

export const seekerPackageUpdateDefaultValues: ISeekerPackageUpdateDTO = {
	TrainingPackageId: 0,
	PackageName: "",
	PackagePrice: "",
	Availability: "",
};

export const seekerPackageUpdateDefaultValues2: ISeekerPackageUpdate2DTO = {
	PackageName: "",
	PackagePrice: "",
	PackageDays: "",
	PackageAvailability: "",
	PackageOrder: "",
};

export const seekerPackageDescriptionDefaultValues: INewSeekerPackageDescriptionDTO =
	{
		PackageId: "",
		Description: "",
		DescriptionOrder: "",
	};

export const updateSeekerPackageDescriptionDefaultValues: IUpdateSeekerPackageDescriptionDTO =
	{
		PackageId: "",
		Description: "",
		DescriptionOrder: "",
	};

export const blogPostCategoryDefaultValues: IBlogPostCategoryDTO = {
	CategoryName: "",
};

export const blogPostCategoryUpdateDefaultValues: IBlogPostCategoryUpdateDTO = {
	NewsCategoryId: 0,
	CategoryName: "",
	CategoryStatus: "",
};

export const blogPostDefaultValues: IBlogPostDTO = {
	NewsCategoryId: "",
	NewsTitle: "",
	CoverImage: undefined!,
	NewsTags: "",
	NewsBody: "",
};

export const blogPostUpdateDefaultValues: IBlogPostUpdateDTO = {
	NewsCategoryId: "",
	NewsTitle: "",
	CoverImage: undefined,
	NewsTags: "",
	NewsStatus: "",
	NewsBody: "",
};

export const blogCommentUpdateDefaultValues: IBlogCommentUpdateDTO = {
	NewsCommentID: 0,
	NewsComment: "",
	NewsCommentStatus: "",
};

export const seekerProfileCreateUpdateDefaultValues: ISeekerProfileCreateUpdateDTO =
	{
		UserAccountId: "",
		CareerIndustryId: "",
		CurrentSalary: "",
		Currency: "",
		Cvupload: undefined,
		Photo: undefined,
	};

export const employerProfileCreateUpdateDefaultValues: IEmployerProfileCreateUpdateDTO =
	{
		UserAccountId: "",
		CareerIndustryId: "",
		CompanyWebsiteUrl: "",
		EstablishmentDate: "",
		OfficeAddress: "",
		ProfileDescription: "",
		Cac_Certificate: undefined,
		Company_Image: undefined,
	};

export const replyMessageDefaultValues: IReplyMessageDTO = {
	subject: "",
	body: "",
	messageID: "",
};
