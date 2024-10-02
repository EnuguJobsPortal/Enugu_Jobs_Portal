import States from "@/assets/nigeria-state-and-lgas.json";
import ControlledDatePicker from "@/components/shared/ControlledDatePicker";
import ControlledEditor from "@/components/shared/ControlledEditor";
import ControlledInput from "@/components/shared/ControlledInput";
import ControlledSelect from "@/components/shared/ControlledSelect";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import {
	WORK_TYPE,
	experienceLevel,
	minimumQualification,
} from "@/const/options";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import { useGetAllCareerIndustries } from "@/hooks/queries/careerIndustry";
import { useGetInfiniteEmployerList } from "@/hooks/queries/infiniteQueries";
import {
	useCreateNewJobPost2,
	useGetAllJobPackages,
} from "@/hooks/queries/jobs";
import useAuth from "@/hooks/useAuth";
import { SelectOption } from "@/interfaces/controlnput.interface";
import { INewJobPost2DTO } from "@/interfaces/dto";
import { INewJobPostResponse } from "@/interfaces/response.interface";
import { newJobPost2DefaultValues } from "@/validations/defaults";
import { newJobPost2Resolver } from "@/validations/resolvers";
import { format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const NewJobPost3 = () => {
	const { loggedUser } = useAuth();
	const { showConfirm, showSuccess, showError, showInfo } = useSweetAlert();
	const { showLoading, hideLoading } = useLoading();

	const onSuccess = (values: INewJobPostResponse) => {
		hideLoading();
		showSuccess("Success", values.message);
	};

	const onError = (value: string) => {
		hideLoading();
		showError("Attention!!!", value);
	};

	const onReset = () => {
		reset();
	};

	const {
		employerList,
		isFetchingNextEmployerList,
		isLoading,
		fetchNextEmployerList,
	} = useGetInfiniteEmployerList({ enabled: true });
	const { loadingCareerIndustries, careerIndustries } =
		useGetAllCareerIndustries({ params: {} });
	const { loadingJobPackages, jobPackages } = useGetAllJobPackages({
		params: {},
	});
	const { createNewJobPost, creatingNewJobPost } = useCreateNewJobPost2({
		onSuccess,
		onError,
		onReset,
	});

	const {
		control,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<INewJobPost2DTO>({
		defaultValues: newJobPost2DefaultValues,
		resolver: newJobPost2Resolver,
	});

	const userOptionsEnum: SelectOption[] = employerList
		? employerList?.map((user) => ({
				label: `${user.Firstname} ${user.Lastname}`,
				value: `${user.UserAccountId}`,
		  }))
		: [];

	const careerIndustriesOptionsEnum: SelectOption[] = careerIndustries
		? careerIndustries?.map((industry) => ({
				label: `${industry.IndustryName}`,
				value: `${industry.CareerIndustryId}`,
		  }))
		: [];

	const jobPackagesEnumOptions: SelectOption[] = jobPackages
		? jobPackages?.data.map((pkg) => ({
				label: `${pkg.PackageName}`,
				value: `${pkg.PackageName}`,
		  }))
		: [];

	const statesEnum: SelectOption[] = States.map((state) => ({
		label: `${state.state}`,
		value: `${state.state}`,
	}));

	const handleJobPostSubmit = async (values: INewJobPost2DTO) => {
		values.ApplicationDeadline = format(
			new Date(values.ApplicationDeadline as string),
			"yyyy-MM-dd"
		);
		const result = await showConfirm(
			"Confirmation",
			"Are you sure you want to create this job post?"
		);

		if (isNaN(values.ExperienceLength as unknown as number)) {
			showError(
				"Attention",
				"Please provide a valid number of years of experience in numbers"
			);
			return false;
		}

		if (result.isConfirmed) {
			const payload = values;
			createNewJobPost({ payload });
		}

		if (result.isDismissed) {
			showInfo("Canceled", "Process Aborted!");
		}
	};

	useEffect(() => {
		if (loggedUser.UserAccountID) {
			const fields = Object.keys(
				newJobPost2DefaultValues
			) as (keyof typeof newJobPost2DefaultValues)[];

			fields.forEach((field) => {
				if (field === "InternalPosterId") {
					setValue(
						field,
						loggedUser.UserAccountID as unknown as string
					);
				}
			});
		}
	}, [loggedUser.UserAccountID, setValue]);

	useEffect(() => {
		if (creatingNewJobPost) {
			showLoading();
		}
	}, [creatingNewJobPost, showLoading]);

	return (
		<Card className="shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] h-auto mb-10">
			<CardHeader className="border border-b p-4 mb-4">
				<span className="text-[10px] tracking-widest font-bold uppercase">
					Add New Job Post
				</span>
			</CardHeader>
			<form onSubmit={handleSubmit(handleJobPostSubmit)}>
				<CardContent>
					<div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
						<div className="w-full flex-1">
							<ControlledSelect
								label="Employer"
								control={control}
								name="UAccountId"
								placeholder="Please Select"
								error={errors["UAccountId"]}
								options={userOptionsEnum}
								isLoading={
									isLoading || isFetchingNextEmployerList
								}
								isRequired
								allowEmpty
								onEndOfRow={(e) => {
									if (e) {
										fetchNextEmployerList();
									}
								}}
							/>
						</div>
						<div className="w-full flex-1">
							<ControlledInput
								label="Job Title"
								control={control}
								name="JobTitle"
								placeholder="Job Title"
								type="text"
								error={errors["JobTitle"]}
								isRequired
							/>
						</div>
						<div className="w-full flex-1">
							<ControlledSelect
								label="Job Country"
								control={control}
								name="JobCountry"
								placeholder="Please Select"
								error={errors["JobCountry"]}
								options={[
									{ label: "Nigeria", value: "Nigeria" },
								]}
								isRequired
								allowEmpty
							/>
						</div>
						<div className="w-full flex-1">
							<ControlledSelect
								label="Job State"
								control={control}
								name="JobState"
								placeholder="Please Select"
								error={errors["JobState"]}
								options={statesEnum}
								isRequired
								allowEmpty
							/>
						</div>
					</div>
					<div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
						<div className="w-full flex-1">
							<ControlledEditor
								label="Job Description"
								control={control}
								name="JobDescription"
								error={errors["JobDescription"]}
								isRequired
							/>
						</div>
					</div>
					<div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
						<div className="w-full flex-1">
							<ControlledInput
								label="Job Address"
								control={control}
								name="JobAddress"
								placeholder="Job Address"
								type="text"
								error={errors["JobAddress"]}
								isRequired
							/>
						</div>
						<div className="w-full flex-1">
							<ControlledDatePicker
								label="Application Deadline"
								control={control}
								name="ApplicationDeadline"
								error={errors["ApplicationDeadline"]}
								isRequired
							/>
						</div>
						<div className="w-full flex-1">
							<ControlledSelect
								label="Work Type"
								control={control}
								name="WorkType"
								placeholder="Please Select"
								error={errors["WorkType"]}
								options={WORK_TYPE}
								isRequired
								allowEmpty
							/>
						</div>
					</div>
					<div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
						<div className="w-full flex-1">
							<ControlledSelect
								label="Career Industry"
								control={control}
								name="CareerIndustryId"
								placeholder="Please Select"
								error={errors["CareerIndustryId"]}
								options={careerIndustriesOptionsEnum}
								isLoading={loadingCareerIndustries}
								isRequired
								allowEmpty
							/>
						</div>
						<div className="w-full flex-1">
							<ControlledInput
								label="Salary"
								control={control}
								name="Salary"
								placeholder="Salary"
								error={errors["Salary"]}
								type="text"
								isRequired
							/>
						</div>
						<div className="w-full flex-1">
							<ControlledSelect
								label="Currency"
								control={control}
								name="Currency"
								placeholder="Please Select"
								error={errors["Currency"]}
								options={[
									{ label: "NGN", value: "NGN" },
									{ label: "USD", value: "USD" },
								]}
								isRequired
								allowEmpty
							/>
						</div>
						<div className="w-full flex-1">
							<ControlledSelect
								label="Minimum Qualification"
								control={control}
								name="MinimumQualification"
								placeholder="Please Select"
								error={errors["MinimumQualification"]}
								options={minimumQualification}
								isRequired
								allowEmpty
							/>
						</div>
					</div>
					<div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
						<div className="w-full flex-1">
							<ControlledSelect
								label="Experience Level"
								control={control}
								name="ExperienceLevel"
								placeholder="Please Select"
								error={errors["ExperienceLevel"]}
								options={experienceLevel}
								isRequired
								allowEmpty
							/>
						</div>
						<div className="w-full flex-1">
							<ControlledInput
								label="Years Of Experience"
								control={control}
								name="ExperienceLength"
								placeholder="Years Of Experience"
								error={errors["ExperienceLength"]}
								type="number"
								isRequired
							/>
						</div>
						<div className="w-full flex-1">
							<ControlledInput
								label="Billing Email Address"
								control={control}
								name="EmailAddress"
								placeholder="Billing Email Address"
								error={errors["EmailAddress"]}
								type="email"
								isRequired
							/>
						</div>
						<div className="w-full flex-1 hidden">
							<ControlledInput
								label="Billing Email Address"
								control={control}
								name="InternalPosterId"
								placeholder="Billing Email Address"
								error={errors["InternalPosterId"]}
								type="text"
								isRequired
							/>
						</div>
						<div className="w-full flex-1">
							<ControlledSelect
								label="Job Type"
								control={control}
								name="JobType"
								placeholder="Please Select"
								error={errors["JobType"]}
								options={jobPackagesEnumOptions}
								isLoading={loadingJobPackages}
								isRequired
								allowEmpty
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button
						className="bg-blue-800 w-full sm:w-24"
						type="submit"
					>
						Submit
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
};

export default NewJobPost3;
