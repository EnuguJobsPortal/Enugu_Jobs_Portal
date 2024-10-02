import ControlledInput from "@/components/shared/ControlledInput";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLoading } from "@/context/LoadingContext";
import { useNotification } from "@/context/NotificationContext";
import { useCreateSeekerPackageDescription } from "@/hooks/queries/packages";
import { INewSeekerPackageDescriptionDTO } from "@/interfaces/dto";
import { INewSeekerPackageDescriptionFormProps2 } from "@/interfaces/formProps.interface";
import { seekerPackageDescriptionDefaultValues } from "@/validations/defaults";
import { seekerPackageDescriptionResolver } from "@/validations/resolvers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const NewSeekerPackageDescription = ({ pkgData, setPkgData, open, setOpen }: INewSeekerPackageDescriptionFormProps2) => {
    const { notify } = useNotification();
    const { showLoading, hideLoading } = useLoading();

    const { control, handleSubmit, setValue, reset, formState: { errors }} = useForm<INewSeekerPackageDescriptionDTO>({
        defaultValues: seekerPackageDescriptionDefaultValues, 
        resolver: seekerPackageDescriptionResolver
    });

    const { createSeekerPackageDescription, creatingSeekerPackageDescription } = useCreateSeekerPackageDescription({ 
        onSuccess: (values) => {
            hideLoading();
            notify(values.message, { type: 'success', theme: 'colored' });
            setPkgData(undefined);
            reset();
            setOpen(false);
        }, 
        onError: (value) => {
            hideLoading();
            notify(value, { type: "error", theme: "colored"})
        }
    });

    const handleCreateSeekerPackageDescription = async (values: INewSeekerPackageDescriptionDTO) => {
        const payload = values;
        createSeekerPackageDescription({ payload });
    };

    useEffect(() => {
        if(creatingSeekerPackageDescription)
        {
            showLoading();
        }
    }, [ creatingSeekerPackageDescription, showLoading ])

    useEffect(() => {
        if(pkgData)
        {
            const fields = Object.keys(
                seekerPackageDescriptionDefaultValues
            ) as (keyof typeof seekerPackageDescriptionDefaultValues)[];

            fields.forEach((field) => {
                if (field === "PackageId") {
                  setValue(field, pkgData.PackageId);
                }
            });
        }
    }, [pkgData, setValue])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[950px]">
                <DialogHeader>
                    <DialogTitle>{ pkgData?.PackageName }</DialogTitle>
                    <DialogDescription>
                        All field marked * are required
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[750px] overflow-y-auto">
                    <form onSubmit={handleSubmit(handleCreateSeekerPackageDescription)}>
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
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
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
                                <ControlledInput
                                    control={control}
                                    name="PackageId"
                                    placeholder=""
                                    type="hidden"
                                    error={errors["PackageId"]}
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

export default NewSeekerPackageDescription;