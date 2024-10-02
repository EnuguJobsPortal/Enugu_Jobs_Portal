import ControlledDatePicker from "@/components/shared/ControlledDatePicker";
import ControlledEditor from "@/components/shared/ControlledEditor";
import ControlledInput from "@/components/shared/ControlledInput";
import ControlledSelect from "@/components/shared/ControlledSelect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WORK_TYPE, experienceLevel, minimumQualification } from "@/const/options";
import { useLoading } from "@/context/LoadingContext";
import { useNotification } from "@/context/NotificationContext";
import { useGetAllCareerIndustries } from "@/hooks/queries/careerIndustry";
import { useGetInfiniteEmployerList } from "@/hooks/queries/infiniteQueries";
import { useGetAllJobPackages, useUpdateJobPostApproval } from "@/hooks/queries/jobs";
import { SelectOption } from "@/interfaces/controlnput.interface";
import { IJobPostApprovalUpdateDTO } from "@/interfaces/dto";
import { IJobApprovalUpdateFormProps } from "@/interfaces/formProps.interface";
import { updateJobPostApprovalDefaultValues } from "@/validations/defaults";
import { updateJobPostApprovalResolver } from "@/validations/resolvers";
import { format } from "date-fns";
import moment from "moment";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UpdateJobPost3 = ({ jobData, open, setOpen }: IJobApprovalUpdateFormProps) => {
    const { notify } = useNotification();
    const { showLoading, hideLoading } = useLoading();
    const { employerList, isFetchingNextEmployerList, isLoading, fetchNextEmployerList } = useGetInfiniteEmployerList({ enabled: open });
    const { loadingCareerIndustries, careerIndustries } = useGetAllCareerIndustries({ params: {}})
    const { loadingJobPackages, jobPackages } = useGetAllJobPackages({ params: {}})
    const { updateJobPostApproval, updatingJobPostApproval } = useUpdateJobPostApproval({ 
        onSuccess: (values) => {
            hideLoading();
            notify(values.message, { theme: "colored", type: "success" })
            setOpen(false);
        }, 
        onError: (message) => {
            hideLoading();
            notify(message, { theme: "colored", type: "error" })
        }
    });

    const { control, handleSubmit, setValue, formState: { errors }} = useForm<IJobPostApprovalUpdateDTO>({
        defaultValues: updateJobPostApprovalDefaultValues, 
        resolver: updateJobPostApprovalResolver
    });

    const userOptionsEnum: SelectOption[] = employerList ? employerList?.map((user) => (
        { label: `${user.Firstname} ${user.Lastname}`, value: `${String(user.UserAccountId)}`}
    )) : [];

    const careerIndustriesOptionsEnum: SelectOption[] = careerIndustries ? careerIndustries?.map((industry) => (
        { label: `${industry.IndustryName}`, value: `${industry.CareerIndustryId}`}
    )) : [];
    
    const jobPackagesEnumOptions: SelectOption[] = jobPackages ? jobPackages?.data.map((pkg) => (
        { label: `${pkg.PackageName}`, value: `${pkg.PackageName}`}
    )) : [];
    const handleJobPostUpdate = async (values: IJobPostApprovalUpdateDTO) => {
        values.ApplicationDeadline = format(new Date(values.ApplicationDeadline as string), "yyyy-MM-dd");
        const payload = values;
        updateJobPostApproval({ payload, approval_id:jobData?.ApprovalId as number });
    }

    useEffect(() => {
        if(updatingJobPostApproval)
        {
            showLoading();
        }
    }, [ updatingJobPostApproval, showLoading ])

    useEffect(() => {
        if(jobData)
        {
            const fields = Object.keys(
                updateJobPostApprovalDefaultValues
            ) as (keyof typeof updateJobPostApprovalDefaultValues)[];

            fields.forEach((field) => {
                if (field === "UserAccountId") {
                  setValue(field, String(jobData.UserAccountId));
                }
                if (field === "CareerIndustryId") {
                  setValue(field, String(jobData.CareerIndustryId));
                }
                if (field === "JobTitle") {
                  setValue(field, jobData.JobTitle || "");
                }
                if (field === "JobDescription") {
                    setValue(field, jobData.JobDescription || "");
                }
                if (field === "JobCountry") {
                    setValue(field, jobData.JobCountry || "");
                }
                if (field === "JobState") {
                    setValue(field, jobData.JobState || "");
                }
                if (field === "JobAddress") {
                    setValue(field, jobData.JobAddress || "");
                }
                if (field === "JobType") {
                    setValue(field, jobData.JobType || "");
                }
                if (field === "WorkType") {
                    setValue(field, jobData.WorkType || "");
                }
                if (field === "Salary") {
                    setValue(field, jobData.Salary || "");
                }
                if (field === "Currency") {
                    setValue(field, jobData.Currency || "");
                }
                if (field === "MinimumQualification") {
                    setValue(field, jobData.MinimumQualification || "");
                }
                if (field === "ExperienceLevel") {
                    setValue(field, jobData.ExperienceLevel || "");
                }
                if (field === "ExperienceLength") {
                    setValue(field, jobData.ExperienceLength || "");
                }
                if (field === "EmailAddress") {
                    setValue(field, jobData.Email || "");
                }
                if (field === "ApplicationDeadline") {
                    setValue(field, jobData.ApplicationDeadline && !isNaN(new Date(jobData.ApplicationDeadline).getTime()) ? new Date(moment(jobData.ApplicationDeadline).format('YYYY-MM-DD')) as unknown as string : "");
                }
            });
        }
    }, [ jobData, setValue ])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[950px]">
                <DialogHeader>
                    <DialogTitle>{`${jobData?.EmployerName} (${jobData?.JobTitle})`}</DialogTitle>
                    <DialogDescription>
                        All field marked * are required
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[750px] overflow-y-auto">
                    <form onSubmit={handleSubmit(handleJobPostUpdate)}>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                            <div className="w-full flex-1">
                                <ControlledSelect
                                    label="Employer"
                                    control={control}
                                    name="UserAccountId"
                                    placeholder="Please Select"
                                    error={errors["UserAccountId"]}
                                    options={userOptionsEnum}
                                    isLoading={isLoading || isFetchingNextEmployerList}
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
                                    options={[{ label: "Nigeria", value : "Nigeria"}]}
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
                                    options={[{ label: "Enugu", value : "Enugu"}]}
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
                                    dateFormat="yyyy-MM-dd"
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
                                <ControlledInput
                                    label="Currency"
                                    control={control}
                                    name="Currency"
                                    placeholder="Currency"
                                    error={errors["Currency"]}
                                    type="text"
                                    isRequired
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
                        </div>
                        <DialogFooter>
                            <Button className="bg-blue-800 w-full sm:w-24 mt-4" type="submit">
                                <span className="tracking-wider">Submit</span>
                            </Button>
                            <DialogClose>
                                <Button className="bg-white w-full sm:w-24 mt-4 border" type="button" onClick={() => setOpen(false)}>
                                    <span className="text-gray-600 tracking-wider hover:text-white">Cancel</span>
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateJobPost3;