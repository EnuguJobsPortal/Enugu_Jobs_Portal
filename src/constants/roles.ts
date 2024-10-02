import { IRoleObject, IRolesType } from "@/interfaces/general";

export const roleObject: IRoleObject = {
	SUPERADMIN: "Super admin",
	ADMIN: "Admin",
	EMPLOYEE: "Employee",
	JOB_SEEKER: "JobSeeker",
};

export const APP_ROLES: IRolesType[] = [
	"Super admin",
	"Admin",
	"Employer",
	"JobSeeker",
];
