import ControlledInput from "@/components/shared/ControlledInput";
import ControlledSelect from "@/components/shared/ControlledSelect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLoading } from "@/context/LoadingContext";
import { useNotification } from "@/context/NotificationContext";
import { useUpdateSeekerPackage } from "@/hooks/queries/packages";
import { ISeekerPackageUpdateDTO } from "@/interfaces/dto";
import { ISeekerPackageUpdateFormProps } from "@/interfaces/formProps.interface";
import { seekerPackageUpdateDefaultValues } from "@/validations/defaults";
import { seekerPackageUpdateResolver } from "@/validations/resolvers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UpdateSeekerPackage = ({ pkgData, open, setOpen }: ISeekerPackageUpdateFormProps) => {
    const { notify } = useNotification();
    const { showLoading, hideLoading } = useLoading();
    const { updateSeekerPackage, updatingSeekerPackage } = useUpdateSeekerPackage({ onSuccess: (values) => {
        hideLoading();
        notify(values.message, { type: 'success', theme: 'colored' });
        setOpen(false);
    }, 
    onError: (value) => {
        hideLoading();
        notify(value, { type: "error", theme: "colored"})
    }});

    const { control, handleSubmit, setValue, formState: { errors }} = useForm<ISeekerPackageUpdateDTO>({
        defaultValues: seekerPackageUpdateDefaultValues, 
        resolver: seekerPackageUpdateResolver
    });

    const handleSeekerPackageUpdate = async (values: ISeekerPackageUpdateDTO) => {
        const payload = values;
        updateSeekerPackage({ payload, packageid:pkgData?.TrainingPackageId as number });
    }

    useEffect(() => {
        if(updatingSeekerPackage)
        {
            showLoading();
        }
    }, [ updatingSeekerPackage, showLoading ])

    useEffect(() => {
        if(pkgData)
        {
            const fields = Object.keys(
                seekerPackageUpdateDefaultValues
            ) as (keyof typeof seekerPackageUpdateDefaultValues)[];

            fields.forEach((field) => {
                if (field === "TrainingPackageId") {
                  setValue(field, pkgData?.TrainingPackageId);
                }
                if (field === "PackageName") {
                  setValue(field, pkgData?.PackageName);
                }
                if (field === "PackagePrice") {
                  setValue(field, pkgData?.PackagePrice);
                }
                if (field === "PackagePrice") {
                  setValue(field, pkgData?.PackagePrice || "");
                }
                if (field === "Availability") {
                    setValue(field, pkgData?.Availability);
                }
            });
        }
    },[pkgData, setValue])

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
                    <form onSubmit={handleSubmit(handleSeekerPackageUpdate)}>
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
                                <ControlledSelect
                                    label="Package Availability"
                                    control={control}
                                    name="Availability"
                                    placeholder="Please Select"
                                    error={errors["Availability"]}
                                    options={[
                                        { label: "Yes", value: "Yes"},
                                        { label: "No", value: "No"}
                                    ]}
                                    isRequired
                                    allowEmpty
                                />
                                <ControlledInput
                                    control={control}
                                    name="TrainingPackageId"
                                    placeholder="Training Package ID"
                                    type="hidden"
                                    error={errors["TrainingPackageId"]}
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

export default UpdateSeekerPackage;