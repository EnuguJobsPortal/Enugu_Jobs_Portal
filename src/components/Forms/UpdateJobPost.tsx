import States from "@/assets/nigeria-state-and-lgas.json";
import ControlledDatePicker from "@/components/shared/ControlledDatePicker";
import ControlledEditor from "@/components/shared/ControlledEditor";
import ControlledInput from "@/components/shared/ControlledInput";
import ControlledSelect from "@/components/shared/ControlledSelect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WORK_TYPE, experienceLevel, minimumQualification } from "@/const/options";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import { useGetAllCareerIndustries } from "@/hooks/queries/careerIndustry";
import { useGetInfiniteEmployerList } from "@/hooks/queries/infiniteQueries";
import { useGetAllJobPackages, useUpdateJobPost } from "@/hooks/queries/jobs";
import { SelectOption } from "@/interfaces/controlnput.interface";
import { IJobPostUpdateDTO } from "@/interfaces/dto";
import { IJobUpdateFormProps } from "@/interfaces/formProps.interface";
import { updateJobPostDefaultValues } from "@/validations/defaults";
import { updateJobPostResolver } from "@/validations/resolvers";
import { format } from "date-fns";
import moment from "moment";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UpdateJobPost = ({ jobData, open, setOpen }: IJobUpdateFormProps) => {
    const { showSuccess, showError } = useSweetAlert();
    const { showLoading, hideLoading } = useLoading();
    const { employerList, isFetchingNextEmployerList, isLoading, fetchNextEmployerList } = useGetInfiniteEmployerList({ enabled: open });
    const { loadingCareerIndustries, careerIndustries } = useGetAllCareerIndustries({ params: {}})
    const { loadingJobPackages, jobPackages } = useGetAllJobPackages({ params: {}})
    const { updateJobPost, updatingJobPost } = useUpdateJobPost({ 
        onSuccess: (values) => {
            hideLoading();
            showSuccess("Success!!!", values.message);
            setOpen(false);
        }, 
        onError: (message) => {
            hideLoading();
            showError("Attention!!!", message);
        }
    });

    const { control, handleSubmit, setValue, formState: { errors }} = useForm<IJobPostUpdateDTO>({
        defaultValues: updateJobPostDefaultValues, 
        resolver: updateJobPostResolver
    });

    const userOptionsEnum: SelectOption[] = employerList ? employerList?.map((user) => (
        { label: `${user.Firstname} ${user.Lastname}`, value: `${user.UserAccountId}`}
    )) : [];

    const careerIndustriesOptionsEnum: SelectOption[] = careerIndustries ? careerIndustries?.map((industry) => (
        { label: `${industry.IndustryName}`, value: `${industry.CareerIndustryId}`}
    )) : [];
    
    const jobPackagesEnumOptions: SelectOption[] = jobPackages ? jobPackages?.data.map((pkg) => (
        { label: `${pkg.PackageName}`, value: `${pkg.PackageName}`}
    )) : [];

    const statesEnum: SelectOption[] = States.map((state) => (
        { label: `${state.state}`, value: `${state.state}` }
    ));

    const handleJobPostUpdate = async (values: IJobPostUpdateDTO) => {
        values.ApplicationDeadline = format(new Date(values.ApplicationDeadline as string), "yyyy-MM-dd");
        const payload = values;
        updateJobPost({ payload, postid:jobData?.PostId as number });
    }

    useEffect(() => {
        if(updatingJobPost)
        {
            showLoading();
        }
    }, [ updatingJobPost, showLoading ])

    useEffect(() => {
        if(jobData)
        {
            const fields = Object.keys(
                updateJobPostDefaultValues
            ) as (keyof typeof updateJobPostDefaultValues)[];

            fields.forEach((field) => {
                if (field === "PostId") {
                  setValue(field, jobData?.PostId);
                }
                if (field === "UAccountId") {
                  setValue(field, String(jobData.PosterAccountId));
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
                if (field === "Isactive") {
                    setValue(field, jobData.Isactive || "");
                }
                if (field === "ApplicationDeadline") {
                    setValue(field, jobData.ApplicationDeadline && !isNaN(new Date(jobData.ApplicationDeadline).getTime()) ? new Date(moment(jobData.ApplicationDeadline).format('YYYY-MM-DD')) as unknown as string : "");
                }
                if (field === "PublishStatus") {
                    setValue(field, jobData?.PublishStatus || "");
                }
            });
        }
    }, [ jobData, setValue ])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[950px]">
                <DialogHeader>
                    <DialogTitle>{`${jobData?.Postedby} (${jobData?.JobTitle})`}</DialogTitle>
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
                                    name="UAccountId"
                                    placeholder="Please Select"
                                    error={errors["UAccountId"]}
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
                                    options={statesEnum}
                                    isRequired
                                    allowEmpty
                                />
                                <ControlledInput
                                    control={control}
                                    name="PostId"
                                    placeholder="Post ID"
                                    type="hidden"
                                    error={errors["PostId"]}
                                    isRequired
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
                            <div className="w-full flex-1">
                                <ControlledSelect
                                    label="Publish Status"
                                    control={control}
                                    name="PublishStatus"
                                    placeholder="Please Select"
                                    error={errors["PublishStatus"]}
                                    options={[
                                        { label: "Published", value: "Published" },
                                        { label: "UnPublished", value: "UnPublished" },
                                    ]}
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
                                <ControlledSelect
                                    label="Is Active"
                                    control={control}
                                    name="Isactive"
                                    placeholder="Please Select"
                                    error={errors["Isactive"]}
                                    options={[
                                        { label: "Yes", value: "Yes" },
                                        { label: "No", value: "No" },
                                    ]}
                                    isRequired
                                    allowEmpty
                                />
                                <ControlledInput
                                    control={control}
                                    name="PostId"
                                    placeholder="Post ID"
                                    error={errors["PostId"]}
                                    type="hidden"
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

export default UpdateJobPost;