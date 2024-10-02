import {
	SUPPORTED_DOCUMENT_FORMATS,
	SUPPORTED_IMAGE_FORMATS,
} from "@/const/supportedFormats";
import { isDate } from "date-fns";
import * as yup from "yup";

export const signInSchema = yup.object({
	Email: yup
		.string()
		.email("Invalid email format")
		.required("Email is required"),
	Password: yup.string().required("Password is required"),
});

export const updatePasswordSchema = yup.object({
	oldpassword: yup.string().required("Old Password is required"),
	newpassword: yup.string().required("New Password is required"),
	confirmpassword: yup
		.string()
		.oneOf([yup.ref("newpassword")], "Passwords must match")
		.required("Confirm Password is required"),
});

export const newUserSchema = yup.object({
	Firstname: yup.string().required("First Name is required"),
	Lastname: yup.string().required("Last Name is required"),
	Email: yup
		.string()
		.email("Invalid email address")
		.required("Email is required"),
	Phonenumber: yup.string().required("Phone number is required"),
	Gender: yup.string(),
	Dob: yup.string().nullable(),
	Usertypeid: yup.string().required("User Type is required"),
	Country: yup.string().required("Country is required"),
	CurrentLocation: yup.string().required("Current Location is required"),
	Password: yup.string().required("Password is required"),
	ConfirmPassword: yup
		.string()
		.oneOf([yup.ref("Password")], "Passwords must match")
		.required("Confirm Password is required"),
});

export const updateUserSchema = yup.object({
	UserAccountId: yup.string().required("User Account ID is required"),
	Firstname: yup.string().required("First Name is required"),
	Lastname: yup.string().required("Last Name is required"),
	Email: yup
		.string()
		.email("Invalid email address")
		.required("Email is required"),
	Dob: yup
		.mixed<Date | string>()
		.test("isValidDate", "DOB must be a valid date", (value) => {
			return !value || isDate(new Date(value as unknown as string));
		}),
	Gender: yup.string(),
	Country: yup.string().required("Phone number is required"),
	PositionInCompany: yup.string(),
	CurrentLocation: yup.string().required("Current Location is required"),
	Phonenumber: yup.string().required("Phone number is required"),
	Isactive: yup
		.string()
		.required("Is Active is required")
		.oneOf(["Yes", "No"], "Must be Yes or No"),
	SmsNotification: yup
		.string()
		.required("SMS Notification is required")
		.oneOf(["Yes", "No"], "Must be Yes or No"),
	EmailNotification: yup
		.string()
		.required("Email Notification is required")
		.oneOf(["Yes", "No"], "Must be Yes or No"),
	Usertypeid: yup.string().required("User Type is required"),
	EmailVerification: yup
		.string()
		.required("Email Verification is required")
		.oneOf(["Yes", "No"], "Must be Yes or No"),
	IsFeatured: yup.string(),
});

export const filterUserSchema = yup.object({
	UserTypeId: yup.string(),
	Isactive: yup.string(),
	SmsNotification: yup.string(),
	EmailNotification: yup.string(),
	EmailVerification: yup.string(),
	IsFeatured: yup.string(),
});

export const activityLogFilterSchema = yup.object({
	UserAccountId: yup.string(),
	CreatedAt: yup.string(),
	Action: yup.string(),
	Start: yup.string(),
	End: yup.string(),
});

export const newJobPostSchema = yup.object({
	UAccountId: yup.string().required("User Account ID is required"),
	JobTitle: yup.string().required("Job Title is required"),
	JobCountry: yup.string().required("Job Country is required"),
	JobState: yup.string().required("Job State is required"),
	JobDescription: yup.string().required("Job Description is required"),
	JobAddress: yup.string().required("Job Address is required"),
	ApplicationDeadline: yup
		.string()
		.required("Application Deadline is required"),
	WorkType: yup.string().required("Work Type is required"),
	CareerIndustryId: yup.string().required("Career Industry is required"),
	Salary: yup.string().required("Salary is required"),
	Currency: yup.string().required("Currency is required"),
	MinimumQualification: yup
		.string()
		.required("Minimum Qualification is required"),
	ExperienceLevel: yup.string().required("Experience Level is required"),
	ExperienceLength: yup.string().required("Experience Length is required"),
	EmailAddress: yup
		.string()
		.email("Invalid email format")
		.required("Email address is required"),
	JobType: yup.string().required("Job Type is required"),
});

export const newJobPost2Schema = yup.object({
	UAccountId: yup.string().required("User Account ID is required"),
	JobTitle: yup.string().required("Job Title is required"),
	JobCountry: yup.string().required("Job Country is required"),
	JobState: yup.string().required("Job State is required"),
	JobDescription: yup.string().required("Job Description is required"),
	JobAddress: yup.string().required("Job Address is required"),
	ApplicationDeadline: yup
		.string()
		.required("Application Deadline is required"),
	WorkType: yup.string().required("Work Type is required"),
	CareerIndustryId: yup.string().required("Career Industry is required"),
	Salary: yup.string().required("Salary is required"),
	Currency: yup.string().required("Currency is required"),
	MinimumQualification: yup
		.string()
		.required("Minimum Qualification is required"),
	ExperienceLevel: yup.string().required("Experience Level is required"),
	ExperienceLength: yup.string().required("Experience Length is required"),
	InternalPosterId: yup
		.string()
		.required("Internal Job Poster ID is required"),
	JobType: yup.string().required("Job Type is required"),
	EmailAddress: yup
		.string()
		.email("Invalid email format")
		.required("Email address is required"),
});

export const updateJobPostSchema = yup.object({
	PostId: yup.number().required("Post ID is required"),
	UAccountId: yup.string().required("User Account ID is required"),
	CareerIndustryId: yup.string().required("Career Industry is required"),
	JobTitle: yup.string().required("Job Title is required"),
	JobDescription: yup.string().required("Job Description is required"),
	JobCountry: yup.string().required("Job Country is required"),
	JobState: yup.string().required("Job State is required"),
	JobAddress: yup.string().required("Job Address is required"),
	JobType: yup.string().required("Job Type is required"),
	WorkType: yup.string().required("Work Type is required"),
	Salary: yup.string().required("Salary is required"),
	Currency: yup.string().required("Currency is required"),
	MinimumQualification: yup
		.string()
		.required("Minimum Qualification is required"),
	ExperienceLevel: yup.string().required("Experience Level is required"),
	ExperienceLength: yup.string().required("Experience Length is required"),
	Isactive: yup
		.string()
		.required("IS Active is required")
		.oneOf(["Yes", "No"], "Must be Yes or No"),
	ApplicationDeadline: yup
		.string()
		.required("Application Deadline is required"),
	PublishStatus: yup
		.string()
		.required("Published Status is required")
		.oneOf(
			["Published", "UnPublished"],
			"Must be Published or Unpublished"
		),
});

export const updateJobPostApprovalSchema = yup.object({
	UserAccountId: yup.string().required("User Account ID is required"),
	CareerIndustryId: yup.string().required("Career Industry is required"),
	JobTitle: yup.string().required("Job Title is required"),
	JobDescription: yup.string().required("Job Description is required"),
	JobCountry: yup.string().required("Job Country is required"),
	JobState: yup.string().required("Job State is required"),
	JobAddress: yup.string().required("Job Address is required"),
	JobType: yup.string().required("Job Type is required"),
	WorkType: yup.string().required("Work Type is required"),
	Salary: yup.string().required("Salary is required"),
	Currency: yup.string().required("Currency is required"),
	MinimumQualification: yup
		.string()
		.required("Minimum Qualification is required"),
	ExperienceLevel: yup.string().required("Experience Level is required"),
	ExperienceLength: yup.string().required("Experience Length is required"),
	ApplicationDeadline: yup
		.string()
		.required("Application Deadline is required"),
	EmailAddress: yup.string().required("Billing Email Address is required"),
});

export const jobApplicationsFilterSchema = yup.object({
	CompanyName: yup.string().nullable(),
	WorkType: yup.string().nullable(),
	Gender: yup.string().nullable(),
	ApplicationStatus: yup.string().nullable(),
	UserAccountId: yup.string().nullable(),
	PostId: yup.string().nullable(),
	ApplicationDate: yup.string().nullable(),
	CreatedDate: yup.string().nullable(),
	Start: yup.string().nullable(),
	End: yup.string().nullable(),
});

export const employerPackageSchema = yup.object({
	PackageName: yup.string().required("Package Name is required"),
	DisplayDays: yup.string().required("Display Days is required"),
	PackagePrice: yup.string().required("Package Price is required"),
	Percentage: yup.string() /* required('Percentage is required') */,
	NumberOfPost: yup.string().required("Number Of Post is required"),
});

export const employerPackageUpdateSchema = yup.object({
	Packageid: yup.number().required("Package ID is required"),
	PackageName: yup.string().required("Package Name is required"),
	DisplayDays: yup.string().required("Display Days is required"),
	PackagePrice: yup.string().required("Package Price is required"),
	Percentage: yup.string(),
	NumberOfPost: yup.string().required("Number Of Post is required"),
});

export const seekerPackageSchema = yup.object({
	PackageName: yup.string().required("Package Name is required"),
	PackagePrice: yup.string().required("Package Price is required"),
	Availability: yup
		.string()
		.required("Availability is required")
		.oneOf(["Yes", "No"], "Must be Yes or No"),
});

export const seekerPackageSchema2 = yup.object({
	PackageName: yup.string().required("Package Name is required"),
	PackagePrice: yup.string().required("Package Price is required"),
	PackageDays: yup.string().required("Package Days is required"),
	PackageAvailability: yup
		.string()
		.required("Availability is required")
		.oneOf(["Yes", "No"], "Must be Yes or No"),
	PackageOrder: yup.string().required("Package Order is required"),
});

export const seekerPackageUpdateSchema = yup.object({
	TrainingPackageId: yup.number().required("Training Package Id is required"),
	PackageName: yup.string().required("Package Name is required"),
	PackagePrice: yup.string().required("Package Price is required"),
	Availability: yup
		.string()
		.required("Availability is required")
		.oneOf(["Yes", "No"], "Must be Yes or No"),
});

export const seekerPackageUpdateSchema2 = yup.object({
	PackageName: yup.string().required("Package Name is required"),
	PackagePrice: yup.string().required("Package Price is required"),
	PackageDays: yup.string().required("Package Days is required"),
	PackageAvailability: yup
		.string()
		.required("Availability is required")
		.oneOf(["Yes", "No"], "Must be Yes or No"),
	PackageOrder: yup.string().required("Package Order is required"),
});

export const seekerPackageDescriptionSchema = yup.object({
	PackageId: yup.string().required("Package ID is required"),
	Description: yup.string().required("Description is required"),
	DescriptionOrder: yup.string().required("Description Order is required"),
});

export const updateSeekerPackageDescriptionSchema = yup.object({
	PackageId: yup.string().required("Package ID is required"),
	Description: yup.string().required("Description is required"),
	DescriptionOrder: yup.string().required("Description Order is required"),
});

export const blogPostCategorySchema = yup.object({
	CategoryName: yup.string().required("Category Name is required"),
});

export const blogPostCategoryUpdateSchema = yup.object({
	NewsCategoryId: yup.number().required("News Category ID is required"),
	CategoryName: yup.string().required("Category Name is required"),
	CategoryStatus: yup.string().required("Category Status is required"),
});

export const blogPostSchema = yup.object({
	NewsCategoryId: yup.string().required("News Category Id is required"),
	NewsTitle: yup.string().required("News Title is required"),
	NewsTags: yup.string().required("News Tags is required"),
	NewsBody: yup.string().required("Body is required"),
	CoverImage: yup
		.mixed<File>()
		.required("You need to provide a Cover Image")
		.test("fileSize", "The file is too large", (value) => {
			return value.size <= 5000000; // 5MB
		})
		.test("fileType", "Unsupported file format", (value) => {
			return value && SUPPORTED_IMAGE_FORMATS.includes(value.type);
		}),
});

export const blogPostUpdateSchema = yup.object({
	NewsCategoryId: yup.string().required("News Category Id is required"),
	NewsTitle: yup.string().required("News Title is required"),
	NewsTags: yup.string().required("News Tags is required"),
	NewsStatus: yup.string().required("News Status is required"),
	NewsBody: yup.string().required("Body is required"),
	CoverImage: yup
		.mixed<File>()
		.test("fileSize", "The file is too large", (value) => {
			return !value || value.size <= 5000000; // 5MB
		})
		.test("fileType", "Unsupported file format", (value) => {
			return !value || SUPPORTED_IMAGE_FORMATS.includes(value.type);
		}),
});

export const blogCommentUpdateSchema = yup.object({
	NewsCommentID: yup.number().required("News Comment Id is required"),
	NewsComment: yup.string().required("News Comment Id is required"),
	NewsCommentStatus: yup.string().required("News Comment Status is required"),
});

export const seekerProfileCreateUpdateSchema = yup.object().shape({
	UserAccountId: yup.string().required("User Account Id is required"),
	CareerIndustryId: yup.string().required("Career Industry Id is required"),
	CurrentSalary: yup.string().required("Current Salary is required"),
	Currency: yup.string().required("Currency is required"),
	Cvupload: yup
		.mixed<File>()
		.test("fileSize", "Max allowed size is 2MB", (value) => {
			return !value || (value && value.size <= 2000000); // 2MB
		})
		.test("fileType", "Unsupported file format", async (value) => {
			return (
				!value ||
				(value && SUPPORTED_DOCUMENT_FORMATS.includes(value.type))
			);
		}),
	Photo: yup
		.mixed<File>()
		.test("fileType", "Unsupported file format", async (value) => {
			return (
				!value ||
				(value && SUPPORTED_IMAGE_FORMATS.includes(value.type))
			);
		})
		.test("fileSize", "Max allowed size is 5MB", (value) => {
			return !value || (value && value.size <= 5000000); // 5MB
		}),
});

export const employerProfileCreateUpdateSchema = yup.object().shape({
	UserAccountId: yup.string().required("User Account Id is required"),
	CareerIndustryId: yup.string().required("Career Industry Id is required"),
	CompanyWebsiteUrl: yup.string().nullable(),
	EstablishmentDate: yup.string().required("Establishment Date is required"),
	OfficeAddress: yup.string().required("Office Address is required"),
	ProfileDescription: yup
		.string()
		.required("Business Profile Description is required"),
	Cac_Certificate: yup
		.mixed<File>()
		.test("fileSize", "Max allowed size is 2MB", (value) => {
			return !value || (value && value.size <= 2000000); // 2MB
		})
		.test("fileType", "Unsupported file format", async (value) => {
			return (
				!value ||
				(value && SUPPORTED_DOCUMENT_FORMATS.includes(value.type))
			);
		}),
	Company_Image: yup
		.mixed<File>()
		.test("fileType", "Unsupported file format", async (value) => {
			return (
				!value ||
				(value && SUPPORTED_IMAGE_FORMATS.includes(value.type))
			);
		})
		.test("fileSize", "Max allowed size is 5MB", (value) => {
			return !value || (value && value.size <= 5000000); // 5MB
		}),
});

export const replyMessageSchema = yup.object({
	subject: yup.string().required("Message Subject is required"),
	body: yup.string().required("Message Body is required"),
	messageID: yup.string().required("Message ID is required"),
});
