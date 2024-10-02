import ControlledInput from "@/components/shared/ControlledInput";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLoading } from "@/context/LoadingContext";
import { useNotification } from "@/context/NotificationContext";
import { useGetAllSeekerPackages2, useUpdateSeekerPackageDescription } from "@/hooks/queries/packages";
import { SelectOption } from "@/interfaces/controlnput.interface";
import { IUpdateSeekerPackageDescriptionDTO } from "@/interfaces/dto";
import { IUpdateSeekerPackageDescriptionFormProps } from "@/interfaces/formProps.interface";
import { formatCurrency } from "@/lib/currencyFormatter";
import { updateSeekerPackageDescriptionDefaultValues } from "@/validations/defaults";
import { updateSeekerPackageDescriptionResolver } from "@/validations/resolvers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ControlledSelect from "../shared/ControlledSelect";

const UpdateSeekerPackageDescription = ({ descriptionData, setDescriptionData, open, setOpen }: IUpdateSeekerPackageDescriptionFormProps) => {
    const { notify } = useNotification();
    const { showLoading, hideLoading } = useLoading();
    const { loadingSeekerPackages, seekerPackages } = useGetAllSeekerPackages2({ params: {}});
    const seekerPackagesEnum: SelectOption[] = seekerPackages?.data ? seekerPackages?.data.map((seekerPackage) => (
        { label: `${seekerPackage.PackageName} (${formatCurrency(seekerPackage.PackagePrice)}) (${seekerPackage.PackageDays} day(s))`, value: `${seekerPackage.PackageId}`}
    )) : [];

    const { control, handleSubmit, setValue, reset, formState: { errors }} = useForm<IUpdateSeekerPackageDescriptionDTO>({
        defaultValues: updateSeekerPackageDescriptionDefaultValues, 
        resolver: updateSeekerPackageDescriptionResolver
    });

    const { updateSeekerPackageDescription, updatingSeekerPackageDescription } = useUpdateSeekerPackageDescription({ 
        onSuccess: (values) => {
            hideLoading();
            notify(values.message, { type: 'success', theme: 'colored' });
            setDescriptionData(undefined);
            reset();
            setOpen(false);
        }, 
        onError: (value) => {
            hideLoading();
            notify(value, { type: "error", theme: "colored"})
        }
    });

    const handleUpdateSeekerPackageDescription = async (values: IUpdateSeekerPackageDescriptionDTO) => {
        const payload = values;
        updateSeekerPackageDescription({ payload, descriptionId: descriptionData?.PackageDescriptionId as string });
    };

    useEffect(() => {
        if(updatingSeekerPackageDescription)
        {
            showLoading();
        }
    }, [ updatingSeekerPackageDescription, showLoading ])

    useEffect(() => {
        if(descriptionData)
        {
            const fields = Object.keys(
                updateSeekerPackageDescriptionDefaultValues
            ) as (keyof typeof updateSeekerPackageDescriptionDefaultValues)[];

            fields.forEach((field) => {
                if (field === "PackageId") {
                  setValue(field, descriptionData.PackageId);
                }
                if (field === "Description") {
                  setValue(field, descriptionData.Description);
                }
                if (field === "DescriptionOrder") {
                  setValue(field, descriptionData.DescriptionOrder);
                }
            });
        }
    }, [descriptionData, setValue])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[950px]">
                <DialogHeader>
                    <DialogTitle>Seeker Package Description Update</DialogTitle>
                    <DialogDescription>
                        All field marked * are required
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[750px] overflow-y-auto">
                    <form onSubmit={handleSubmit(handleUpdateSeekerPackageDescription)}>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                            <div className="w-full flex-1">
                                <ControlledInput
                                    label="Package Description"
                                    control={control}
                                    name="Description"
                                    placeholder="Package Description"
                                    type="text"
                                    error={errors["Description"]}
                                    isRequired
                                />
                            </div>
                            <div className="w-full flex-1">
                                <ControlledInput
                                    label="Package Description Order"
                                    control={control}
                                    name="DescriptionOrder"
                                    placeholder="Package Description Order"
                                    type="number"
                                    error={errors["DescriptionOrder"]}
                                    isRequired
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                            <div className="w-full flex-1">
                                <ControlledSelect
                                    control={control}
                                    name="PackageId"
                                    placeholder="SEEKER PACKAGES"
                                    options={seekerPackagesEnum}
                                    isLoading={loadingSeekerPackages}
                                    allowEmpty
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

export default UpdateSeekerPackageDescription;