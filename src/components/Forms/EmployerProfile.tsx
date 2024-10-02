import ControlledDatePicker from "@/components/shared/ControlledDatePicker";
import ControlledEditor from "@/components/shared/ControlledEditor";
import ControlledInput from "@/components/shared/ControlledInput";
import ControlledSelect from "@/components/shared/ControlledSelect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLoading } from "@/context/LoadingContext";
import { useNotification } from "@/context/NotificationContext";
import { useGetAllCareerIndustries } from "@/hooks/queries/careerIndustry";
import { useCreateUpdateEmployerProfile, useGetAllEmployerProfiles } from "@/hooks/queries/users";
import { SelectOption } from "@/interfaces/controlnput.interface";
import { IEmployerProfileCreateUpdateDTO } from "@/interfaces/dto";
import { IEmployerProfileFormProps } from "@/interfaces/formProps.interface";
import { employerProfileCreateUpdateDefaultValues } from "@/validations/defaults";
import { employerProfileCreateUpdateResolver } from "@/validations/resolvers";
import { format } from "date-fns";
import moment from "moment";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const EmployerProfile = ({ employerData, open, setOpen }: IEmployerProfileFormProps) => {
    const { notify } = useNotification();
    const { showLoading, hideLoading } = useLoading();
    const { loadingCareerIndustries, careerIndustries } = useGetAllCareerIndustries({ params: {}})
    const { employerProfiles } = useGetAllEmployerProfiles({ params: { useraccountid: String(employerData?.UserAccountId) }, enabler:open})
    const { control, handleSubmit, setValue, reset, formState: { errors }} = useForm<IEmployerProfileCreateUpdateDTO>({
        defaultValues: employerProfileCreateUpdateDefaultValues, 
        resolver: employerProfileCreateUpdateResolver
    });
    const { createUpdateEmployerProfile, creatingUpdatingEmployerProfile } = useCreateUpdateEmployerProfile({ 
        onSuccess: (values) => {
            hideLoading();
            notify(values.message, { type: 'success', theme: 'colored' });
            setOpen(false);
        }, 
        onError: (message) => {
            hideLoading();
            notify(message, { type: 'error', theme: 'colored' });
        },
        onReset: () => {
            reset();
        }
    });

    const handleEmployerProfileUpdate = async (values: IEmployerProfileCreateUpdateDTO) => {
        values.EstablishmentDate = format(new Date(values.EstablishmentDate as string), "yyyy-MM-dd");
        
        const payload = new FormData();

        payload.append("UserAccountId", values.UserAccountId);
        payload.append("CareerIndustryId", values.CareerIndustryId);
        payload.append("CompanyWebsiteUrl", values?.CompanyWebsiteUrl || "");
        payload.append("EstablishmentDate", values.EstablishmentDate);
        payload.append("OfficeAddress", values.OfficeAddress);
        payload.append("ProfileDescription", values.ProfileDescription);
        payload.append("Cac_Certificate", values.Cac_Certificate || "" /* values.Cac_Certificate! */);
        payload.append("Company_Image", values.Company_Image || "" /* values.Cac_Certificate! */);
        
        createUpdateEmployerProfile({ payload, id: values.UserAccountId })
    }

    const careerIndustriesOptionsEnum: SelectOption[] = careerIndustries ? careerIndustries?.map((industry) => (
        { label: `${industry.IndustryName}`, value: `${industry.CareerIndustryId}`}
    )) : [];

    useEffect(() => {
        if(creatingUpdatingEmployerProfile)
        {
            showLoading();
        }
    }, [ creatingUpdatingEmployerProfile, showLoading ])

    useEffect(() => {
        if(employerData && employerProfiles)
        {
            const fields = Object.keys(
                employerProfileCreateUpdateDefaultValues
            ) as (keyof typeof employerProfileCreateUpdateDefaultValues)[];

            fields.forEach((field) => {
                if (field === "UserAccountId") {
                  setValue(field, String(employerData?.UserAccountId));
                }
                if (field === "CareerIndustryId") {
                  setValue(field, employerProfiles.data[0]?.CareerIndustryId as unknown as string || "");
                }
                if (field === "CompanyWebsiteUrl") {
                  setValue(field, employerProfiles.data[0]?.CompanyWebsiteUrl || "");
                }
                if (field === "EstablishmentDate") {
                    setValue(
                        field, 
                        employerProfiles.data[0]?.EstablishmentDate && 
                        !isNaN(new Date(employerProfiles.data[0]?.EstablishmentDate).getTime()) ? 
                        new Date(moment(employerProfiles.data[0]?.EstablishmentDate).format('YYYY-MM-DD')) as unknown as string : ""
                    );
                }
                if (field === "OfficeAddress")
                {
                    setValue(field, employerProfiles.data[0]?.OfficeAddress || "");
                }
                if (field === "ProfileDescription")
                {
                    setValue(field, employerProfiles.data[0]?.ProfileDescription || "");
                }
            });
        }
    },[employerData, setValue, employerProfiles])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[950px]">
                <DialogHeader>
                    <DialogTitle>{`${employerData?.Firstname} ${employerData?.Lastname} Profile Update`}</DialogTitle>
                    <DialogDescription>
                        All field marked * are required
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[750px] overflow-y-auto">
                    <div className="flex items-center justify-center w-full mt-10 mb-10">
                        <img className="rounded-full" src={employerProfiles?.data[0].CompanyImage as string} alt={`${employerData?.Firstname}`} />
                    </div>
                    <form onSubmit={handleSubmit(handleEmployerProfileUpdate)}>
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
                                    label="Company Website URL"
                                    control={control}
                                    name="CompanyWebsiteUrl"
                                    placeholder="Company Website"
                                    type="text"
                                    error={errors["CompanyWebsiteUrl"]}
                                />
                            </div>
                            <div className="w-full flex-1">
                                <ControlledDatePicker
                                    label="Establishment Date"
                                    control={control}
                                    name="EstablishmentDate"
                                    error={errors["EstablishmentDate"]}
                                    isRequired
                                    dateFormat="yyy-MM-dd"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                            <div className="w-full flex-1">
                                <ControlledInput
                                    label="Office Address"
                                    control={control}
                                    name="OfficeAddress"
                                    placeholder="Office Address"
                                    type="text"
                                    error={errors["OfficeAddress"]}
                                    isRequired
                                />
                            </div>
                            <div className="w-full flex-1">
                                <ControlledInput
                                    label="CAC Certificate Upload"
                                    control={control}
                                    name="Cac_Certificate"
                                    placeholder="CAC Certificate"
                                    type="file"
                                    error={errors["Cac_Certificate"]}
                                    accept=".pdf"
                                    isRequired
                                />
                            </div>
                            <div className="w-full flex-1">
                                <ControlledInput
                                    label="Company Profile Image"
                                    control={control}
                                    name="Company_Image"
                                    placeholder="Photo Upload"
                                    type="file"
                                    error={errors["Company_Image"]}
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
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                            <div className="w-full flex-1">
                                <ControlledEditor
                                    label="Company Profile Description"
                                    control={control}
                                    name="ProfileDescription"
                                    error={errors["ProfileDescription"]}
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

export default EmployerProfile;