import ControlledInput from "@/components/shared/ControlledInput";
import ControlledSelect from "@/components/shared/ControlledSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import { useCreateSeekerPackage } from "@/hooks/queries/packages";
import { ISeekerPackageDTO } from "@/interfaces/dto";
import { seekerPackageDefaultValues } from "@/validations/defaults";
import { seekerPackageResolver } from "@/validations/resolvers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const NewSeekerPackage = () => {

    const { showLoading, hideLoading } = useLoading();
    const { showSuccess, showError, showConfirm } = useSweetAlert();
    const { control, handleSubmit, reset, formState: { errors }} = useForm<ISeekerPackageDTO>({
        defaultValues: seekerPackageDefaultValues, 
        resolver: seekerPackageResolver
    });
    const { createSeekerPackage, creatingSeekerPackage } = useCreateSeekerPackage({ 
        onSuccess: (values) => {
            hideLoading();
            showSuccess("Success!!!", values.message);
        }, 
        onError: (message) => {
            hideLoading();
            showError("Attention!!!", message);
        }, 
        onReset: () => {
            reset();
        }
    });

    const handlePackageSubmit = async (values: ISeekerPackageDTO) => {
        const payload = values;
        const result = await showConfirm("Confirm", "Are you sure you want to create this Employer Package?");

        if(result.isConfirmed)
        {
            createSeekerPackage({ payload })
        }
    }

    useEffect(() => {
        if(creatingSeekerPackage)
        {
            showLoading();
        }
    }, [ creatingSeekerPackage, showLoading ])

    return (
        <Card className="shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] h-auto mb-10">
            <CardHeader className="border border-b p-4 mb-4">
                <span className="text-[10px] tracking-widest font-bold uppercase">New Seeker Training Package</span>
            </CardHeader>
            <form onSubmit={handleSubmit(handlePackageSubmit)}>
                <CardContent>
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
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="bg-blue-800 w-full sm:w-40" type="submit">
                        Submit
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default NewSeekerPackage;