import {
	activityLogFilterSchema,
	blogCommentUpdateSchema,
	blogPostCategorySchema,
	blogPostCategoryUpdateSchema,
	blogPostSchema,
	blogPostUpdateSchema,
	employerPackageSchema,
	employerPackageUpdateSchema,
	employerProfileCreateUpdateSchema,
	filterUserSchema,
	jobApplicationsFilterSchema,
	newJobPost2Schema,
	newJobPostSchema,
	newUserSchema,
	replyMessageSchema,
	seekerPackageDescriptionSchema,
	seekerPackageSchema,
	seekerPackageSchema2,
	seekerPackageUpdateSchema,
	seekerPackageUpdateSchema2,
	seekerProfileCreateUpdateSchema,
	signInSchema,
	updateJobPostApprovalSchema,
	updateJobPostSchema,
	updatePasswordSchema,
	updateSeekerPackageDescriptionSchema,
	updateUserSchema,
} from "@/validations/schemas";
import { yupResolver } from "@hookform/resolvers/yup";

export const signInResolver = yupResolver(signInSchema);
export const updatePasswordResolver = yupResolver(updatePasswordSchema);
export const newUserResolver = yupResolver(newUserSchema);
export const updateUserResolver = yupResolver(updateUserSchema);
export const filterUserResolver = yupResolver(filterUserSchema);
export const activityLogFilterResolver = yupResolver(activityLogFilterSchema);
export const newJobPostResolver = yupResolver(newJobPostSchema);
export const newJobPost2Resolver = yupResolver(newJobPost2Schema);
export const updateJobPostResolver = yupResolver(updateJobPostSchema);
export const updateJobPostApprovalResolver = yupResolver(
	updateJobPostApprovalSchema
);
export const jobApplicationsFilterResolver = yupResolver(
	jobApplicationsFilterSchema
);
export const employerPackageResolver = yupResolver(employerPackageSchema);
export const employerPackageUpdateResolver = yupResolver(
	employerPackageUpdateSchema
);
export const seekerPackageResolver = yupResolver(seekerPackageSchema);
export const seekerPackageResolver2 = yupResolver(seekerPackageSchema2);
export const seekerPackageUpdateResolver = yupResolver(
	seekerPackageUpdateSchema
);
export const seekerPackageUpdateResolver2 = yupResolver(
	seekerPackageUpdateSchema2
);
export const seekerPackageDescriptionResolver = yupResolver(
	seekerPackageDescriptionSchema
);
export const updateSeekerPackageDescriptionResolver = yupResolver(
	updateSeekerPackageDescriptionSchema
);
export const blogPostCategoryResolver = yupResolver(blogPostCategorySchema);
export const blogPostCategoryUpdateResolver = yupResolver(
	blogPostCategoryUpdateSchema
);
export const blogPostResolver = yupResolver(blogPostSchema);
export const blogPostUpdateResolver = yupResolver(blogPostUpdateSchema);
export const blogCommentUpdateResolver = yupResolver(blogCommentUpdateSchema);
export const seekerProfileCreateUpdateResolver = yupResolver(
	seekerProfileCreateUpdateSchema
);
export const employerProfileCreateUpdateResolver = yupResolver(
	employerProfileCreateUpdateSchema
);
export const replyMessageResolver = yupResolver(replyMessageSchema);
