import States from "@/assets/nigeria-state-and-lgas.json";
import ControlledDatePicker from "@/components/shared/ControlledDatePicker";
import ControlledInput from "@/components/shared/ControlledInput";
import ControlledSelect from "@/components/shared/ControlledSelect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EMAIL_NOTIFICATION, IS_ACTIVE, IS_FEATURED, SMS_NOTIFICATION, genderOptions } from "@/const/options";
import { useLoading } from "@/context/LoadingContext";
import { useNotification } from "@/context/NotificationContext";
import { useGetAllUserTypes, useUpdateUser } from "@/hooks/queries/users";
import { SelectOption } from "@/interfaces/controlnput.interface";
import { IUserUpdateDTO } from "@/interfaces/dto";
import { IUserUpdateFormProps } from "@/interfaces/formProps.interface";
import { userUpdateDefaultValues } from "@/validations/defaults";
import { updateUserResolver } from "@/validations/resolvers";
import { isDate } from "date-fns";
import moment from "moment";
import { useEffect } from 'react';
import { useForm } from "react-hook-form";

const UpdateUser = ({ userData, open, setOpen } : IUserUpdateFormProps) => {
    const { notify } = useNotification();
    const { showLoading, hideLoading } = useLoading();
    const { userTypes, isLoading } = useGetAllUserTypes({ params: {}});
    const { control, handleSubmit, reset, setValue, formState: { errors }} = useForm<IUserUpdateDTO>({
        defaultValues: userUpdateDefaultValues, 
        resolver: updateUserResolver
    })
    const { updateUser, updatingUser } = useUpdateUser({ 
        onSuccess: (response) => {
            hideLoading();
            notify(response.message, { type: 'success', theme: "colored" });
            setOpen(false);
        }, 
        onError: (message) => {
            hideLoading();
            notify(message, { type: "error", theme: "colored"})
        },
        onReset: () => {
            reset();
        }}
    );

    const onUserUpdateSubmit = (values: IUserUpdateDTO) => {
        values.Dob = values.Dob && isDate(new Date(values.Dob)) ? new Date(values.Dob).toString() : "";
        const payload = values;
        const useraccountid = userData?.UserAccountId as unknown as string;
        updateUser({ payload, useraccountid });
    };

    const userTypesEnum: SelectOption[] = userTypes ? userTypes.map((type, i) => ({
        label: type.usertype, value: String(type.UserTypeId), key: i
    })) : [];

    const statesEnum: SelectOption[] = States.map((state) => (
        { label: `${state.state}`, value: `${state.state}` }
    ));

    useEffect(() => {
        if(updatingUser)
        {
            showLoading();
        }
    }, [ updatingUser, showLoading ])

    useEffect(() => {
        if(userData)
        {
            const fields = Object.keys(
                userUpdateDefaultValues
            ) as (keyof typeof userUpdateDefaultValues)[];

            fields.forEach((field) => {
                if (field === "UserAccountId") {
                  setValue(field, String(userData?.UserAccountId) || "");
                }
                if (field === "Firstname") {
                  setValue(field, userData.Firstname || "");
                }
                if (field === "Lastname") {
                  setValue(field, userData.Lastname || "");
                }
                if (field === "Email") {
                    setValue(field, userData.Email || "");
                }
                if (field === "Dob") {
                    setValue(field, userData.Dob && !isNaN(new Date(userData.Dob).getTime()) ? new Date(moment(userData.Dob).format('YYYY-MM-DD')) : "");
                }
                if (field === "Gender") {
                  setValue(field, userData.Gender || "");
                }
                if (field === "Country") {
                  setValue(field, userData.Country || "");
                }
                if (field === "PositionInCompany") {
                  setValue(field, userData?.PositionInCompany || "");
                }
                if (field === "CurrentLocation") {
                  setValue(field, userData?.CurrentLocation || "");
                }
                if (field === "Phonenumber") {
                  setValue(field, userData?.Phonenumber || "");
                }
                if (field === "Isactive") {
                  setValue(field, userData?.Isactive || "");
                }
                if (field === "SmsNotification") {
                  setValue(field, userData?.SmsNotification || "");
                }
                if (field === "EmailNotification") {
                  setValue(field, userData?.EmailNotification || "");
                }
                if (field === "Usertypeid") {
                  setValue(field, String(userData?.Usertype!.UserTypeId));
                }
                if (field === "EmailVerification") {
                  setValue(field, userData?.EmailVerification || "");
                }
                if (field === "IsFeatured") {
                  setValue(field, userData?.IsFeatured || "");
                }
            });
        }
    }, [userData, setValue])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] md:max-w-[950px]">
                <DialogClose className="sr-only"/>
                <DialogHeader>
                    <DialogTitle>{`${userData?.Firstname} ${userData?.Lastname}`}</DialogTitle>
                    <DialogDescription>
                        All field marked * are required
                    </DialogDescription>
                </DialogHeader>
                <form>
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
                    </div>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
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
                            <ControlledInput
                                label="Position In Company"
                                control={control}
                                name="PositionInCompany"
                                placeholder="Position In Company"
                                error={errors["PositionInCompany"]}
                                type="text"
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
                                isRequired
                            />
                        </div>
                        <div className="w-full flex-1">
                            <ControlledSelect
                                label="Is Active"
                                control={control}
                                name="Isactive"
                                placeholder="Please Select"
                                options={IS_ACTIVE}
                                error={errors["Isactive"]}
                                allowEmpty
                            />
                        </div>
                        <div className="w-full flex-1">
                            <ControlledSelect
                                label="SMS Notifications"
                                control={control}
                                name="SmsNotification"
                                placeholder="Please Select"
                                options={SMS_NOTIFICATION}
                                error={errors["SmsNotification"]}
                                allowEmpty
                            />
                        </div>
                        <div className="w-full flex-1">
                            <ControlledSelect
                                label="Email Notifications"
                                control={control}
                                name="EmailNotification"
                                placeholder="Please Select"
                                options={EMAIL_NOTIFICATION}
                                error={errors["EmailNotification"]}
                                allowEmpty
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
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
                        <div className="w-full flex-1">
                            <ControlledSelect
                                label="Email Verification"
                                control={control}
                                name="EmailVerification"
                                placeholder="Please Select"
                                options={EMAIL_NOTIFICATION}
                                error={errors["EmailVerification"]}
                                allowEmpty
                            />
                        </div>
                        <div className="w-full flex-1">
                            <ControlledSelect
                                label="Is Featured"
                                control={control}
                                name="IsFeatured"
                                placeholder="Please Select"
                                options={IS_FEATURED}
                                error={errors["IsFeatured"]}
                                allowEmpty
                            />
                            <ControlledInput
                                control={control}
                                name="UserAccountId"
                                placeholder="User Account ID"
                                error={errors["UserAccountId"]}
                                type="hidden"
                            />
                        </div>
                    </div>
                </form>
                <DialogFooter className="">
                    <Button className="bg-blue-800 w-full sm:w-24 mt-4" type="button" onClick={handleSubmit(onUserUpdateSubmit)}>
                        <span className="tracking-wider">Submit</span>
                    </Button>
                    <DialogClose>
                        <Button className="bg-white w-full sm:w-24 mt-4 border" onClick={() => setOpen(false)}>
                            <span className="text-gray-600 tracking-wider hover:text-white">Cancel</span>
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateUser;