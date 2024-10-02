export interface IMessageResponse {
	error: boolean;
	message: string;
}

export interface IEducationalDetailResponse {
	EducationalId: number;
	UserAccountId: number;
	CertificateDegreeName: string;
	SchoolAttended: string;
	GraduationDate: string;
	SchoolType: string;
}

export interface IUserActivityReponse {
	ActivityId: number;
	UserAccountId: number;
	Firstname: string;
	Lastname: string;
	EmailAddress: string;
	Action: string;
	IpAddress: string;
	UserAgent: string;
	Longitude: string;
	Latitude: string;
	CreatedAt: string;
}

export interface IExperienceDetailResponse {
	ExperienceId: number;
	UserAccountId: number;
	Startdate: string;
	Enddate: string;
	Jobtitle: string;
	Companyname: string;
	JoblocationState: string;
	JoblocationCountry: string;
	Description: string;
}

export interface IJobApplicationResponse {
	ApplicationId: number;
	PostId: number;
	UserAccountId: number;
	CvUploadLink: string | null;
	MotivationStatement: string | null;
	ApplicationDate: string;
	ApplicationStatus: string;
	ApplicantName: string;
	Email: string;
	CurrentLocation: string;
	Gender: string;
	Country: string;
	Phonenumber: string;
	Dob: string;
	JobTitle: string;
	JobState: string;
	JobCountry: string;
	JobAddress: string;
	CreatedDate: string;
	Salary: string;
	Currency: string;
	WorkType: string;
	SeekerProfilePhoto: string | null;
	OriginalCv: string | null;
	CompanyName: string;
}

export interface IJobPackageResponse {
	Packageid: number;
	PackageName: string;
	DisplayDays: string;
	PackagePrice: string;
	Percentage: string;
	NumberOfPost: string;
}

export interface IJobWishListResponse {
	Wishlistid: number;
	UserAccountId: number;
	PostId: number;
}

export interface IUserResponse {
	UserAccountId: number | null;
	Firstname: string | null;
	Lastname: string | null;
	Email: string | null;
	Password: string | null;
	Dob: string | null;
	Gender: string | null;
	Country: string | null;
	PositionInCompany: string | null;
	CurrentLocation: string | null;
	Phonenumber: string | null;
	RegistrationDate: string | null;
	IsFeatured: string;
	Isactive: string | null;
	SmsNotification: string | null;
	EmailNotification: string | null;
	EmailVerification: string | null;
	Salt: string | null;
	SaltTimestamp: string | null;
	CV_downloadLink: string | null;
	UserTypeId: string | null;
	Usertype: IUserTypeResponse | null;
	EducationalDetails: IEducationalDetailResponse[] | null;
	ExperienceDetails: IExperienceDetailResponse[] | null;
	JobApplications: IJobApplicationResponse[] | null;
	JobWishLists: IJobWishListResponse[] | null;
}

export interface ISeekerResponse {
	UserAccountId: number;
	Firstname: string;
	Lastname: string;
	Email: string;
	Country: string;
	Gender: string;
	CareerIndustryId: number | null;
	CurrentLocation: string;
	Phonenumber: string;
	RegistrationDate: string;
	Isactive: string;
	Dob: string;
	SmsNotification: string;
	EmailNotification: string;
	EmailVerification: string;
	UserType: string;
	CurrentSalary: string | null;
	Currency: string | null;
	ProfilePhoto: string | null;
	PhotoKey: string | null;
	Cv: string | null;
	CvKey: string | null;
}

export interface ILoginResponse {
	error: boolean;
	message: string;
	user: IUserResponse;
	token: string;
}

export interface IActivityLogResponse {
	ActivityId: number;
	UserAccountId: number;
	Username: string | null;
	EmailAddress: string | null;
	Action: string | null;
	IpAddress: string | null;
	UserAgent: string | null;
	Longitide: string | null;
	Latitiude: string | null;
	CreatedAt: string | null;
}

export interface ITestimonyResponse {
	Testimonyid: number | null;
	UserAccountId: number | null;
	Writeup: string | null;
	ProfilePhoto: string | null;
	UserType: string | null;
	CurrentLocation: string | null;
	Gender: string | null;
	Country: string | null;
	Testifier: string | null;
}

export interface IJobPostResponse {
	PostId: number;
	Postedby: string | null;
	PosterAccountId: number | null;
	JobTitle: string | null;
	JobDescription: string | null;
	JobCountry: string | null;
	JobState: string | null;
	JobAddress: string | null;
	CareerIndustryId: number | null;
	PublishStatus: string | null;
	JobType: string | null;
	WorkType: string | null;
	Salary: string | null;
	Currency: string | null;
	MinimumQualification: string | null;
	ExperienceLevel: string | null;
	ExperienceLength: string | null;
	CreatedDate: string | null;
	PostDueDate: string | null;
	Isactive: string | null;
	IndustryName: string | null;
	ProfileDescription: string | null;
	CacCert: string | null;
	CompanyImage: string | null;
	CompanyWebsiteUrl: string | null;
	PaymentType: string | null;
	PaymentDate: string | null;
	PaymentStatus: string | null;
	AmountPaid: string | null;
	IsFeatured: string | null;
	Email: string | null;
	PhoneNumber: string | null;
	OfficeAddress: string | null;
	ApplicationDeadline: string | null;
	TransactionReference: string | null;
}

export interface IJobApplication {
	ApplicationId: number | null;
	PostId: number | null;
	UserAccountId: number | null;
	CvUploadLink: string | null;
	MotivationStatement: string | null;
	ApplicationDate: string | null;
	ApplicationStatus: string | null;
	ApplicantName: string | null;
	Email: string | null;
	CurrentLocation: string | null;
	Gender: string | null;
	Country: string | null;
	Phonenumber: string | null;
	Dob: string | null;
	JobTitle: string | null;
	JobState: string | null;
	JobCountry: string | null;
	JobAddress: string | null;
	CreatedDate: string | null;
	Salary: string | null;
	Currency: string | null;
	WorkType: string | null;
	SeekerProfilePhoto: string | null;
	OriginalCv: string | null;
	CompanyName: string | null;
}

export interface IContactMessageResponse {
	MessageId: number;
	FullName: string;
	Email: string;
	Subject: string;
	UserMessage: string;
	Status: "unread" | "read";
	DateCreated: string;
}

export interface IUserTypeResponse {
	UserTypeId: number;
	usertype: string;
}

export interface ICareerIndustryResponse {
	CareerIndustryId: number;
	IndustryName: string;
}

export interface IMailingListResponse {
	SubscriberId: number;
	SubscriberEmail: string;
}

export interface GetAllUserTypeResponse {
	error: boolean;
	message: string;
	data: IUserTypeResponse[];
	count: number;
}

export interface GetAllUsersResponse {
	error: boolean;
	message: string;
	pagesize: number;
	pagenumber: number;
	totalrecords: number;
	totalpages: number;
	data: IUserResponse[];
	count: number;
}

export interface GetAllContactMessageResponse {
	error: boolean;
	message: string;
	pagesize: number;
	pagenumber: number;
	totalrecords: number;
	totalpages: number;
	data: IContactMessageResponse[];
	count: number;
}

export interface GetAllActivityLogResponse {
	error: boolean;
	message: string;
	pagesize: number;
	pagenumber: number;
	totalrecords: number;
	totalpages: number;
	data: IUserActivityReponse[];
	count: number;
}

export interface GetAllTestimonialsResponse {
	error: boolean;
	message: string;
	pagesize: number;
	pagenumber: number;
	totalrecords: number;
	totalpages: number;
	data: ITestimonyResponse[];
	count: number;
}

export interface GetAllJobPostsResponse {
	error: boolean;
	message: string;
	pagesize: number;
	pagenumber: number;
	totalrecords: number;
	totalpages: number;
	data: IJobPostResponse[];
	count: number;
}

export interface GetAllCareerIndustryResponse {
	error: boolean;
	message: string;
	data: ICareerIndustryResponse[];
	count: number;
}

export interface GetAllJobPackagesResponse {
	error: boolean;
	message: string;
	data: IJobPackageResponse[];
	count: string;
}

export interface INewJobPostResponse {
	error: boolean;
	message: string;
	amount: string;
	emailaddress: string;
	postId: string;
}

export type ApiDataResponse<DataType> = {
	error: boolean;
	message: string;
	data: DataType;
};

export interface GetAllJobApplicationsResponse {
	error: boolean;
	message: string;
	pagesize: number;
	pagenumber: number;
	totalrecords: number;
	totalpages: number;
	data: IJobApplicationResponse[];
	count: number;
}

export interface IEmployerPackagResponse {
	Packageid: number;
	PackageName: string;
	DisplayDays: string;
	PackagePrice: string;
	Percentage: string;
	NumberOfPost: string;
}

export interface GetAllEmployerPackageResponse {
	error: boolean;
	message: string;
	pagesize: number;
	pagenumber: number;
	totalrecords: number;
	totalpages: number;
	data: IEmployerPackagResponse[];
	count: number;
}

export interface ISeekerPackageResponse {
	TrainingPackageId: number;
	PackageName: string;
	PackagePrice: string;
	Availability: string;
}

export interface GetAllSeekerPackageResponse {
	error: boolean;
	message: string;
	pagesize: number;
	pagenumber: number;
	totalrecords: number;
	totalpages: number;
	data: ISeekerPackageResponse[];
	count: number;
}

export interface IBlogCategoryResponse {
	NewsCategoryId: number;
	CategoryName: string;
	CategoryStatus: string;
}

export interface GetAllBlogCategoryResponse {
	error: boolean;
	message: string;
	pagesize: number;
	pagenumber: number;
	totalrecords: number;
	totalpages: number;
	data: IBlogCategoryResponse[];
	count: number;
}

export interface IBlogPostResponse {
	NewsId: number;
	AuthorId: number;
	AuthorName: string | null;
	NewsCategoryId: number;
	NewsTitle: string;
	NewsCoverImage: string;
	NewsCoverImageKey: string | null;
	NewsBody: string;
	NewsTags: string;
	NewsCategoryName: string;
	NewsTimestamp: string | null; // Change the type based on the actual data type
	NewsStatus: string;
	NewsComments: IBlogPostCommentResponse2[];
}

export interface IBlogPostCommentInfoResponse {
	UserAccountId: number | null;
	Username: string | null;
	Email: string | null;
}

export interface IBlogPostCommentResponse {
	NewsCommentId: number;
	CommenterId: number | null;
	NewsId: number | null;
	NewsComment: string | null;
	NewsCommentTimestamp: string;
	NewsCommentStatus: string;
	CommenterName: string | null;
	NewsCategoryId: number | null;
	NewsTitle: string | null;
	ProfilePhoto: string | null;
	CompanyImage: string | null;
	commentsInfo: IBlogPostCommentInfoResponse[];
}

export interface IBlogPostCommentResponse2 {
	NewsCommentId: number;
	CommenterId: number;
	NewsId: number;
	NewsComment1: string;
	NewsCommentTimestamp: string;
	NewsCommentStatus: string;
}

export interface IBlogPostItemResponse {
	jobsnews: IBlogPostResponse;
	jobnewscomments: IBlogPostCommentResponse[];
}

export interface GetAllBlogPostResponse {
	pagenumber: number;
	pagesize: number;
	totalpages: number;
	totalrecords: number;
	data: IBlogPostResponse[];
	error: boolean;
	message: string;
	count: number;
}

export interface IBlogCommentResponse {
	NewsCommentId: number;
	CommenterId: number;
	NewsId: number;
	NewsComment: string;
	NewsCommentTimestamp: string;
	NewsCommentStatus: string;
	CommenterName: string;
	NewsCategoryId: number;
	NewsTitle: string;
}

export interface GetAllBlogCommentResponse {
	pagenumber: number;
	pagesize: number;
	totalpages: number;
	totalrecords: number;
	data: IBlogCommentResponse[];
	error: boolean;
	message: string;
	count: number;
}

export interface GetAllSeekerResponse {
	error: boolean;
	message: string;
	pagesize: number;
	pagenumber: number;
	totalrecords: number;
	totalpages: number;
	data: ISeekerResponse[];
	count: number;
}

export interface IEmployerResponse {
	UserAccountId: number;
	Firstname: string;
	Lastname: string;
	Email: string;
	Password: string;
	Country: string;
	Gender: string;
	CurrentLocation: string;
	Phonenumber: string;
	RegistrationDate: string;
	Isactive: string;
	SmsNotification: string;
	EmailNotification: string;
	EmailVerification: string;
	IsFeatured: string;
	UserType: string;
	CareerIndustryId: number | null;
	ProfileDescription: string | null;
	EstablishmentDate: string | null;
	CacCert: string | null;
	CompanyImage: string | null;
	CompanyWebsiteUrl: string | null;
	CacCertKey: string | null;
	CompanyImageKey: string | null;
	OfficeAddress: string | null;
}

export interface GetAllEmployerResponse {
	error: boolean;
	message: string;
	pagesize: number;
	pagenumber: number;
	totalrecords: number;
	totalpages: number;
	data: IEmployerResponse[];
	count: number;
}

export interface IDashboardStatResponse {
	TotalJobPost: number;
	JobPostToday: number;
	TotalApplications: number;
	ApplicationToday: number;
	TotalUserRegistration: number;
	UserRegistrationToday: number;
	ApplicationYesterday: number;
	JobPostYesterday: number;
	UsersYesterday: number;
}

export interface GetAllDashboardStatResponse {
	error: boolean;
	message: string;
	data: IDashboardStatResponse;
}

export interface IJobPostChartResponse {
	January: number;
	February: number;
	March: number;
	April: number;
	May: number;
	June: number;
	July: number;
	August: number;
	September: number;
	October: number;
	November: number;
	December: number;
}

export interface GetAllJobPostChartResponse {
	error: boolean;
	message: string;
	data: IJobPostChartResponse;
}

export interface GetAllMailingListResponse {
	error: boolean;
	message: string;
	pagesize: number;
	pagenumber: number;
	totalrecords: number;
	totalpages: number;
	data: IMailingListResponse[];
	count: number;
}

export interface ISalesStatisticsResponse {
	totalSales: number;
	yesterday_sales: number;
	today_sales: number;
}

export interface IMonthlySalesStatisticsResponse {
	January: number;
	February: number;
	March: number;
	April: number;
	May: number;
	June: number;
	July: number;
	August: number;
	September: number;
	October: number;
	November: number;
	December: number;
}

export interface GetAllSalesStatisticsResponse {
	error: boolean;
	message: string;
	data: ISalesStatisticsResponse;
}

export interface GetAllMonthlySalesStatisticsResponse {
	error: boolean;
	message: string;
	data: IMonthlySalesStatisticsResponse;
}

export interface IJobPostApprovalResponse {
	ApprovalId: number;
	PostId: number;
	UserAccountId: number;
	CareerIndustryId: string;
	Status: string;
	ApprovedBy: string;
	DateApproved: string;
	JobTitle: string;
	EmployerName: string;
	WorkType: string;
	JobType: string;
	JobDescription: string;
	JobCountry: string;
	JobState: string;
	JobAddress: string;
	Salary: string;
	Currency: string;
	MinimumQualification: string;
	ExperienceLevel: string;
	ExperienceLength: string;
	CreatedDate: string;
	OfficeAddress: string;
	Email: string;
	Industry: string;
	AmountPaid: string;
	ApplicationDeadline: string;
	DatePostedForApproval: string;
}

export interface GetAllJobPostApprovalResponse {
	error: boolean;
	message: string;
	pagesize: number;
	pagenumber: number;
	totalrecords: number;
	totalpages: number;
	data: IJobPostApprovalResponse[];
	count: number;
}

export interface ISeekerPackageDescriptionResponse {
	PackageDescriptionId: string;
	PackageId: string;
	Description: string;
	DescriptionOrder: string;
}

export interface ISeekerPackageResponse2 {
	PackageId: string;
	PackageName: string;
	PackagePrice: string;
	PackageDays: string;
	PackageAvailability: string;
	PackageOrder: string;
	SeekerPackageDescriptions: ISeekerPackageDescriptionResponse[];
}

export interface GetAllSeekerPackageResponse2 {
	error: boolean;
	message: string;
	pagesize: number;
	pagenumber: number;
	totalrecords: number;
	totalpages: number;
	data: ISeekerPackageResponse2[];
	count: number;
}

export interface IJobSeekerPackageSubscriptionResponse {
	SubscriptionId: string;
	UserAccountId: number;
	PackageId: string;
	PackageName: string;
	EmailAddress: string;
	SubscriptionDate: string;
	TransactionReference: string;
	TransactionStatus: string;
	Amount: string;
}

export interface GetAllJobSeekerPackageSubscriptionResponse {
	error: boolean;
	message: string;
	pagesize: number;
	pagenumber: number;
	totalrecords: number;
	totalpages: number;
	data: IJobSeekerPackageSubscriptionResponse[];
	count: number;
}
