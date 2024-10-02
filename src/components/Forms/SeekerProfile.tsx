import ControlledInput from "@/components/shared/ControlledInput";
import ControlledSelect from "@/components/shared/ControlledSelect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLoading } from "@/context/LoadingContext";
import { useNotification } from "@/context/NotificationContext";
import { useGetAllCareerIndustries } from "@/hooks/queries/careerIndustry";
import { useCreateUpdateSeekerProfile, useGetAllSeekerProfiles } from "@/hooks/queries/users";
import { SelectOption } from "@/interfaces/controlnput.interface";
import { ISeekerProfileCreateUpdateDTO } from "@/interfaces/dto";
import { ISeekerProfileFormProps } from "@/interfaces/formProps.interface";
import { seekerProfileCreateUpdateDefaultValues } from "@/validations/defaults";
import { seekerProfileCreateUpdateResolver } from "@/validations/resolvers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const SeekerProfile = ({ seekerData, open, setOpen }: ISeekerProfileFormProps) => {
    const { notify } = useNotification();
    const { showLoading, hideLoading } = useLoading();
    const { loadingCareerIndustries, careerIndustries } = useGetAllCareerIndustries({ params: {}})
    const { seekerProfiles } = useGetAllSeekerProfiles({ params: { useraccountid: String(seekerData?.UserAccountId) }, enabler: open})
    const { control, handleSubmit, setValue, reset, formState: { errors }} = useForm<ISeekerProfileCreateUpdateDTO>({
        defaultValues: seekerProfileCreateUpdateDefaultValues, 
        resolver: seekerProfileCreateUpdateResolver
    });
    const { createUpdateSeekerProfile, creatingUpdatingSeekerProfile } = useCreateUpdateSeekerProfile({ 
        onSuccess: (values) => {
            setOpen(false);
            hideLoading();
            notify(values.message, { type: "success", theme: "colored" });
        }, 
        onError: (message) => {
            hideLoading();
            notify(message, { type: "error", theme: "colored"})
        },
        onReset: () => {
            reset();
        }
    });

    const handleSeekerProfileUpdate = async (values: ISeekerProfileCreateUpdateDTO) => {
        const payload = new FormData();

        payload.append("CareerIndustryId", values.CareerIndustryId);
        payload.append("CurrentSalary", values.CurrentSalary);
        payload.append("Currency", values.Currency);
        payload.append("UserAccountId", values.UserAccountId);
        payload.append("Cvupload", values.Cvupload || "" /* values.Cvupload! */);
        payload.append("Photo", values.Photo || "" /* values.Photo! */);
        
        createUpdateSeekerProfile({ payload, id: values.UserAccountId })
    }

    const careerIndustriesOptionsEnum: SelectOption[] = careerIndustries ? careerIndustries?.map((industry) => (
        { label: `${industry.IndustryName}`, value: `${industry.CareerIndustryId}`}
    )) : [];

    useEffect(() => {
        if(creatingUpdatingSeekerProfile)
        {
            showLoading();
        }
    }, [ creatingUpdatingSeekerProfile, showLoading ])

    useEffect(() => {
        if(seekerData && seekerProfiles)
        {
            const fields = Object.keys(
                seekerProfileCreateUpdateDefaultValues
            ) as (keyof typeof seekerProfileCreateUpdateDefaultValues)[];

            fields.forEach((field) => {
                if (field === "UserAccountId") {
                  setValue(field, String(seekerData?.UserAccountId));
                }
                if (field === "Currency") {
                  setValue(field, seekerProfiles.data[0]?.Currency || "");
                }
                if (field === "CurrentSalary") {
                  setValue(field, seekerProfiles.data[0]?.CurrentSalary || "");
                }
            });
        }
    },[seekerData, setValue, seekerProfiles])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[950px]">
                <DialogHeader>
                    <DialogTitle>{`${seekerData?.Firstname} ${seekerData?.Lastname} Profile Update`}</DialogTitle>
                    <DialogDescription>
                        All field marked * are required
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[750px] overflow-y-auto">
                    <form onSubmit={handleSubmit(handleSeekerProfileUpdate)}>
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
                                    label="Current Salary"
                                    control={control}
                                    name="CurrentSalary"
                                    placeholder="Current Salary"
                                    type="text"
                                    error={errors["CurrentSalary"]}
                                    isRequired
                                />
                            </div>
                            <div className="w-full flex-1">
                                <ControlledInput
                                    label="Currency"
                                    control={control}
                                    name="Currency"
                                    placeholder="Preffered Currency"
                                    type="text"
                                    error={errors["Currency"]}
                                    isRequired
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                            <div className="w-full flex-1">
                                <ControlledInput
                                    label="CV Upload"
                                    control={control}
                                    name="Cvupload"
                                    placeholder="CV Upload"
                                    type="file"
                                    error={errors["Cvupload"]}
                                    accept=".pdf"
                                    isRequired
                                />
                            </div>
                            <div className="w-full flex-1">
                                <ControlledInput
                                    label="Photo Upload"
                                    control={control}
                                    name="Photo"
                                    placeholder="Photo Upload"
                                    type="file"
                                    error={errors["Photo"]}
                                    accept="image/*"
                                    isRequired
                                />
                                <ControlledInput
                                    control={control}
                                    name="UserAccountId"
                                    placeholder="User Account ID"
                                    type="hidden"
                                    error={errors["UserAccountId"]}
                                    isRequired
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button className="bg-blue-800 w-full sm:w-24 mt-4" type="submit">
                                <span className="tracking-wider">Submit</span>
                            </Button>
                            <DialogClose>
                                <Button className="bg-white w-full sm:w-24 mt-4 border" onClick={() => setOpen(false)}>
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

export default SeekerProfile;