import States from "@/assets/nigeria-state-and-lgas.json";
import ControlledDatePicker from "@/components/shared/ControlledDatePicker";
import ControlledInput from "@/components/shared/ControlledInput";
import ControlledSelect from "@/components/shared/ControlledSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { genderOptions } from "@/const/options";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import { useCreateNewUser, useGetAllUserTypes } from "@/hooks/queries/users";
import { SelectOption } from "@/interfaces/controlnput.interface";
import { INewUserDTO } from "@/interfaces/dto";
import { newUserDefaultValues } from "@/validations/defaults";
import { newUserResolver } from "@/validations/resolvers";
import { format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const NewUser = () => {
    const { showConfirm, showSuccess, showError } = useSweetAlert();
    const { showLoading, hideLoading } = useLoading();
    const { userTypes, isLoading } = useGetAllUserTypes({ params: {}});
    const { control, handleSubmit, reset, formState: { errors }} = useForm<INewUserDTO>({
        defaultValues: newUserDefaultValues, 
        resolver: newUserResolver
    })
    const { createNewUser, creatingNewUser } = useCreateNewUser({ 
        onSuccess: (values) => {
            hideLoading();
            showSuccess("Success!", values.message);
        }, 
        onError: (message) => {
            hideLoading();
            showError("Attention!!!", message);
        },
        onReset: () => {
            reset();
        }
    });

    const onNewUserSubmit = async (values: INewUserDTO) => {
        values.Dob = format(new Date(values.Dob as string), "yyyy-MM-dd");
        const result = await showConfirm('Confirmation', 'Are you sure you want to create this user?');

        if(result.isConfirmed)
        {
            const payload = values;
            createNewUser({ payload });
        }
    };

    const userTypesEnum: SelectOption[] = userTypes ? userTypes.map((type) => ({
        label: type.usertype, value: String(type.UserTypeId)
    })) : [];

    const statesEnum: SelectOption[] = States.map((state) => (
        { label: `${state.state}`, value: `${state.state}` }
    ));

    useEffect(() => {
        if(creatingNewUser)
        {
            showLoading();
        }
    }, [ creatingNewUser, showLoading ])

    return (
        <Card className="shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] h-auto">
            <CardHeader className="border border-b p-4 mb-4">
                <span className="text-[10px] tracking-widest font-bold uppercase">Add New User</span>
            </CardHeader>
            <form onSubmit={handleSubmit(onNewUserSubmit)}>
                <CardContent>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                        <div className="w-full flex-1">
                            <ControlledInput
                                label="First Name"
                                control={control}
                                name="Firstname"
                                placeholder="User First name"
                                type="text"
                                error={errors["Firstname"]}
                                isRequired
                            />
                        </div>
                        <div className="w-full flex-1">
                            <ControlledInput
                                label="Last Name"
                                control={control}
                                name="Lastname"
                                placeholder="User Last name"
                                type="text"
                                error={errors["Lastname"]}
                                isRequired
                            />
                        </div>
                        <div className="w-full flex-1">
                            <ControlledInput
                                label="Email Address"
                                control={control}
                                name="Email"
                                placeholder="Valid Email Address"
                                type="email"
                                error={errors["Email"]}
                                isRequired
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                        <div className="w-full flex-1">
                            <ControlledInput
                                label="Phone Number"
                                control={control}
                                name="Phonenumber"
                                placeholder="Phone Number"
                                error={errors["Phonenumber"]}
                                type="text"
                            />
                        </div>
                        <div className="w-full flex-1">
                            <ControlledSelect
                                label="Gender"
                                control={control}
                                name="Gender"
                                placeholder="Please Select"
                                error={errors["Gender"]}
                                options={genderOptions}
                                allowEmpty
                            />
                        </div>
                        <div className="w-full flex-1">
                            <ControlledDatePicker
                                label="Date Of Birth"
                                control={control}
                                name="Dob"
                                error={errors["Dob"]}
                                disableFuture
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>
                        <div className="w-full flex-1">
                            <ControlledSelect
                                label="User Type"
                                control={control}
                                name="Usertypeid"
                                placeholder="Please Select"
                                error={errors["Usertypeid"]}
                                options={userTypesEnum}
                                isLoading={isLoading}
                                isRequired
                                allowEmpty
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                        <div className="w-full flex-1">
                            <ControlledSelect
                                label="Country"
                                control={control}
                                name="Country"
                                placeholder="Please Select"
                                error={errors["Country"]}
                                options={[{ label: "Nigeria", "value": "Nigeria"}]}
                                isRequired
                                allowEmpty
                            />
                        </div>
                        <div className="w-full flex-1">
                            <ControlledSelect
                                label="Current Location (State)"
                                control={control}
                                name="CurrentLocation"
                                placeholder="Please Select"
                                error={errors["CurrentLocation"]}
                                options={statesEnum}
                                isRequired
                                allowEmpty
                            />
                        </div>
                        <div className="w-full flex-1">
                            <ControlledInput
                                label="Password"
                                control={control}
                                name="Password"
                                placeholder="*****"
                                error={errors["Password"]}
                                type="password"
                                isRequired
                            />
                        </div>
                        <div className="w-full flex-1">
                            <ControlledInput
                                label="ConfirmPassword"
                                control={control}
                                name="ConfirmPassword"
                                error={errors["ConfirmPassword"]}
                                placeholder="*****"
                                type="password"
                                isRequired
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="bg-blue-800 w-full sm:w-24" type="submit">
                        Submit
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default NewUser;