import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components//ui/dialog";
import ControlledInput from "@/components/shared/ControlledInput";
import { Button } from "@/components/ui/button";
import { useLoading } from "@/context/LoadingContext";
import { useNotification } from "@/context/NotificationContext";
import { useUpdateEmployerPackage } from "@/hooks/queries/packages";
import { IEmployerPackageUpdateDTO } from "@/interfaces/dto";
import { IEmployerPackageUpdateFormProps } from "@/interfaces/formProps.interface";
import { employerPackageUpdateDefaultValues } from "@/validations/defaults";
import { employerPackageUpdateResolver } from "@/validations/resolvers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UpdateEmployerPackage = ({ pkgData, open, setOpen }: IEmployerPackageUpdateFormProps) => {
    const { notify } = useNotification();
    const { showLoading, hideLoading } = useLoading();
    const { updateEmployerPackage, updatingEmployerPackage } = useUpdateEmployerPackage({ 
        onSuccess: (values) => {
            hideLoading();
            notify(values.message, { type: 'success', theme: 'colored' });
            setOpen(false);
        },  
        onError: (value) => {
            hideLoading();
            notify(value, { type: 'error', theme: 'colored' });
        }
    });

    const { control, handleSubmit, setValue, formState: { errors }} = useForm<IEmployerPackageUpdateDTO>({
        defaultValues: employerPackageUpdateDefaultValues, 
        resolver: employerPackageUpdateResolver
    });

    const handleEmployerPackageUpdate = async (values: IEmployerPackageUpdateDTO) => {
        const payload = values;
        updateEmployerPackage({ payload, packageid:pkgData?.Packageid as number });
    }

    useEffect(() => {
        if(updatingEmployerPackage)
        {
            showLoading();
        }
    }, [ updatingEmployerPackage, showLoading ])

    useEffect(() => {
        if(pkgData)
        {
            const fields = Object.keys(
                employerPackageUpdateDefaultValues
            ) as (keyof typeof employerPackageUpdateDefaultValues)[];

            fields.forEach((field) => {
                if (field === "Packageid") {
                  setValue(field, pkgData.Packageid);
                }
                if (field === "PackageName") {
                  setValue(field, pkgData?.PackageName);
                }
                if (field === "DisplayDays") {
                  setValue(field, pkgData?.DisplayDays);
                }
                if (field === "PackagePrice") {
                  setValue(field, pkgData?.PackagePrice);
                }
                if (field === "Percentage") {
                    setValue(field, pkgData?.Percentage);
                }
                if (field === "NumberOfPost") {
                    setValue(field, pkgData?.NumberOfPost);
                }
            });
        }
    }, [pkgData, setValue])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[950px]">
                <DialogHeader>
                    <DialogTitle>{`${pkgData?.PackageName}`}</DialogTitle>
                    <DialogDescription>
                        All field marked * are required
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[750px] overflow-y-auto">
                    <form onSubmit={handleSubmit(handleEmployerPackageUpdate)}>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                            <div className="w-full flex-1">
                                <ControlledInput
                                    label="Package Name"
                                    control={control}
                                    name="PackageName"
                                    placeholder="Package Name"
                                    type="text"
                                    error={errors["PackageName"]}
                                    isRequired
                                />
                            </div>
                            <div className="w-full flex-1">
                                <ControlledInput
                                    label="Display Days"
                                    control={control}
                                    name="DisplayDays"
                                    placeholder="No. Of Days To Display"
                                    type="text"
                                    error={errors["DisplayDays"]}
                                    isRequired
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                            <div className="w-full flex-1">
                                <ControlledInput
                                    label="Package Price"
                                    control={control}
                                    name="PackagePrice"
                                    placeholder="Package Price"
                                    type="text"
                                    error={errors["PackagePrice"]}
                                    isRequired
                                />
                            </div>
                            <div className="w-full flex-1">
                                <ControlledInput
                                    label="Percentage Of Proposed Salary"
                                    control={control}
                                    name="Percentage"
                                    placeholder="Percentage"
                                    type="text"
                                    error={errors["Percentage"]}
                                />
                            </div>
                            <div className="w-full flex-1">
                                <ControlledInput
                                    label="Number Of Posts"
                                    control={control}
                                    name="NumberOfPost"
                                    placeholder="Number Of Posts"
                                    type="text"
                                    error={errors["NumberOfPost"]}
                                    isRequired
                                />
                                
                                <ControlledInput
                                    control={control}
                                    name="Packageid"
                                    placeholder="Package ID"
                                    type="hidden"
                                    error={errors["Packageid"]}
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

export default UpdateEmployerPackage;