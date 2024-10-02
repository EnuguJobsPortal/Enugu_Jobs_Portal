import ControlledInput from "@/components/shared/ControlledInput";
import ControlledSelect from "@/components/shared/ControlledSelect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLoading } from "@/context/LoadingContext";
import { useNotification } from "@/context/NotificationContext";
import { useUpdateSeekerPackage2 } from "@/hooks/queries/packages";
import { ISeekerPackageUpdate2DTO } from "@/interfaces/dto";
import { ISeekerPackageUpdateFormProps2 } from "@/interfaces/formProps.interface";
import { seekerPackageUpdateDefaultValues2 } from "@/validations/defaults";
import { seekerPackageUpdateResolver2 } from "@/validations/resolvers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UpdateSeekerPackage2 = ({ pkgData, setPkgData, open, setOpen }: ISeekerPackageUpdateFormProps2) => {
    const { notify } = useNotification();
    const { showLoading, hideLoading } = useLoading();
    const { updateSeekerPackage, updatingSeekerPackage } = useUpdateSeekerPackage2({ 
        onSuccess: (values) => {
            hideLoading();
            notify(values.message, { type: 'success', theme: 'colored' });
            setPkgData(undefined);
            setOpen(false);
        }, 
        onError: (value) => {
            hideLoading();
            notify(value, { type: "error", theme: "colored"})
        }
    });

    const { control, handleSubmit, setValue, formState: { errors }} = useForm<ISeekerPackageUpdate2DTO>({
        defaultValues: seekerPackageUpdateDefaultValues2, 
        resolver: seekerPackageUpdateResolver2
    });

    const handleSeekerPackageUpdate = async (values: ISeekerPackageUpdate2DTO) => {
        const payload = values;
        updateSeekerPackage({ payload, packageId:pkgData?.PackageId as string });
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
                seekerPackageUpdateDefaultValues2
            ) as (keyof typeof seekerPackageUpdateDefaultValues2)[];

            fields.forEach((field) => {
                if (field === "PackageName") {
                  setValue(field, pkgData?.PackageName);
                }
                if (field === "PackagePrice") {
                  setValue(field, pkgData?.PackagePrice);
                }
                if (field === "PackageOrder") {
                  setValue(field, pkgData?.PackageOrder);
                }
                if (field === "PackageDays") {
                  setValue(field, pkgData?.PackageDays);
                }
                if (field === "PackageAvailability") {
                    setValue(field, pkgData?.PackageAvailability);
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
                                    type="number"
                                    error={errors["PackagePrice"]}
                                    isRequired
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                            <div className="w-full flex-1">
                                <ControlledSelect
                                    label="Package Availability"
                                    control={control}
                                    name="PackageAvailability"
                                    placeholder="Please Select"
                                    error={errors["PackageAvailability"]}
                                    options={[
                                        { label: "Yes", value: "Yes"},
                                        { label: "No", value: "No"}
                                    ]}
                                    isRequired
                                    allowEmpty
                                />
                            </div>
                            <div className="w-full flex-1">
                                <ControlledInput
                                    label="Package Days"
                                    control={control}
                                    name="PackageDays"
                                    placeholder="Package Days"
                                    type="number"
                                    error={errors["PackageDays"]}
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

export default UpdateSeekerPackage2;