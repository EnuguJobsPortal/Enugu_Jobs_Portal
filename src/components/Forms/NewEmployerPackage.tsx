import ControlledInput from "@/components/shared/ControlledInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import { useCreateNewEmployerPackage } from "@/hooks/queries/packages";
import { IEmployerPackageDTO } from "@/interfaces/dto";
import { employerPackageDefaultValues } from "@/validations/defaults";
import { employerPackageResolver } from "@/validations/resolvers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const NewEmployerPackage = () => {

    const { showLoading, hideLoading } = useLoading();
    const { showSuccess, showError, showConfirm } = useSweetAlert();
    const { control, handleSubmit, reset, formState: { errors }} = useForm<IEmployerPackageDTO>({
        defaultValues: employerPackageDefaultValues, 
        resolver: employerPackageResolver
    });
    const { createEmployerPackage, creatingEmployerPackage } = useCreateNewEmployerPackage({ 
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

    const handlePackageSubmit = async (values: IEmployerPackageDTO) => {
        const payload = values;
        const result = await showConfirm("Confirm", "Are you sure you want to create this Employer Package?");

        if(result.isConfirmed)
        {
            createEmployerPackage({ payload })
        }
    }

    useEffect(() => {
        if(creatingEmployerPackage)
        {
            showLoading();
        }
    }, [ creatingEmployerPackage, showLoading ])

    return (
        <Card className="shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] h-auto mb-10">
            <CardHeader className="border border-b p-4 mb-4">
                <span className="text-[10px] tracking-widest font-bold uppercase">New Employer Package</span>
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

export default NewEmployerPackage;