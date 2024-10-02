import EmployerProfile from "@/components/Forms/EmployerProfile";
import SeekerProfile from "@/components/Forms/SeekerProfile";
import UpdateUser from "@/components/Forms/UpdateUser";
import { DataTable } from "@/components/Tables/DataTable";
import SelectDropDown from "@/components/shared/SelectDropdown";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EMAIL_NOTIFICATION, IS_ACTIVE, IS_FEATURED, IS_VERIFIED, SMS_NOTIFICATION } from "@/const/options";
import { useLoading } from "@/context/LoadingContext";
import { useNotification } from "@/context/NotificationContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import useUserColumns from "@/hooks/columns/userUserColumns";
import { useGetAllUserTypes, useGetAllUsers, useRemoveEmployerProfile, useRemoveSeekerProfile } from "@/hooks/queries/users";
import { SelectOption } from "@/interfaces/controlnput.interface";
import { useCallback, useEffect, useState } from "react";

const Users = () => {
    const { notify } = useNotification();
	const { showLoading, hideLoading } = useLoading();
	const { showConfirm, showSuccess, showError } = useSweetAlert();
	const [ selectedUserType, setSelectedUserType ] = useState<string>("");
	const [ selectedActiveStatus, setSelectedActiveStatus ] = useState<string>("");
	const [ selectedSMSNotificedStatus, setSelectedSMSNotifiedStatus ] = useState<string>("");
	const [ selectedEmailNotificedStatus, setSelectedEmailNotifiedStatus ] = useState<string>("");
	const [ selectedVerificationStatus, setSelectedVerificationStatus ] = useState<string>("");
	const [ selectedFeaturedStatus, setSelectedFeaturedStatus ] = useState<string>("");
	const { userTypes, isLoading:loadingUserTypes } = useGetAllUserTypes({ params: {}});
	const { removeSeekerProfile, removingSeekerProfile } = useRemoveSeekerProfile({
		onSuccess: (values) => {
            hideLoading();
            showSuccess("Success!", values.message);
        }, 
        onError: (message) => {
            hideLoading();
            showError("Attention!!!", message);
        }
	});
	const { removeEmployerProfile, removingEmployerProfile } = useRemoveEmployerProfile({
		onSuccess: (values) => {
            hideLoading();
            showSuccess("Success!", values.message);
        }, 
        onError: (message) => {
            hideLoading();
            showError("Attention!!!", message);
        }
	});

	const handleRemoveUser = useCallback(async (userType:string, userID: string) => {
		const result = await showConfirm("Confirm", "Are you sure you want to remove this user?");

		if(result.isConfirmed)
		{
			userType === "JobSeeker" ? removeSeekerProfile({ id: userID }) : removeEmployerProfile({ id: userID })
		}
	}, [ removeEmployerProfile, removeSeekerProfile, showConfirm ]);
	
	const handleCVDownload = useCallback((downloadURL: string | null) => {
        if(downloadURL)
        {
            notify("Initiating download...", { type: "info", theme: "colored" });
            window.location.href = downloadURL;
        }

        if(!downloadURL)
        {
            notify("CV Download URL not found", { type: "error", theme: "colored" });
        }
    }, [ notify ]);

	const { 
        userColumns,
        pagination,
        onPageChange,
        user,
        showUpdateModal,
        setShowUpdateModal,
        showSeekerProfileModal,
        setShowSeekerProfileModal,
        showEmployerProfileModal,
        setShowEmployerProfileModal
    } = useUserColumns({ handleRemoveUser, handleCVDownload });

	const { users, isLoading } = useGetAllUsers({
        params: {
            UserTypeId: selectedUserType,
            EmailNotification: selectedEmailNotificedStatus,
            EmailVerification: selectedVerificationStatus,
            Isactive: selectedActiveStatus,
            IsFeatured: selectedFeaturedStatus,
            SmsNotification: selectedSMSNotificedStatus,
            PageNumber: pagination.pageIndex + 1,
            PageSize: pagination.pageSize
        }   
    });

	const userTypesEnum: SelectOption[] = userTypes ? userTypes.map((type, i) => ({
        label: type.usertype, value: String(type.UserTypeId), key: i
    })) : [];

    useEffect(() => {
		if(removingEmployerProfile || removingSeekerProfile)
		{
			showLoading();
		}
	}, [ removingEmployerProfile, removingSeekerProfile, showLoading ])

	return (
			
        <>
			<Card className="rounded-xl font-poppins bg-neutral-white w-full px-4 py-4 shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] mt-10 mb-10">
				<CardHeader className="flex flex-col lg:flex-row flex-wrap items-center justify-between gap-8 pt-0 pb-2 w-full mb-4">
                    <span className="uppercase text-xs font-bold tracking-widest">USERS</span>
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-2">
                        <div className="w-full flex-1">
                            <SelectDropDown
                                selected={selectedUserType}
                                onChange={setSelectedUserType}
                                placeholder="USER TYPE"
                                options={userTypesEnum}
								isLoading={loadingUserTypes}
                                className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
                                allowEmpty
                            />
                        </div>
                        <div className="w-full flex-1">
                            <SelectDropDown
                                selected={selectedActiveStatus}
                                onChange={setSelectedActiveStatus}
                                placeholder="IS ACTIVE"
                                options={IS_ACTIVE}
                                className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
                                allowEmpty
                            />
                        </div>
                        <div className="w-full flex-1">
                            <SelectDropDown
                                selected={selectedSMSNotificedStatus}
                                onChange={setSelectedSMSNotifiedStatus}
                                placeholder="SMS NOTIFICATION"
                                options={SMS_NOTIFICATION}
                                className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
                                allowEmpty
                            />
                        </div>
                        <div className="w-full flex-1">
                            <SelectDropDown
                                selected={selectedEmailNotificedStatus}
                                onChange={setSelectedEmailNotifiedStatus}
                                placeholder="EMAIL NOTIFICATION"
                                options={EMAIL_NOTIFICATION}
                                className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
                                allowEmpty
                            />
                        </div>
                        <div className="w-full flex-1">
                            <SelectDropDown
                                selected={selectedVerificationStatus}
                                onChange={setSelectedVerificationStatus}
                                placeholder="IS VERIFIED"
                                options={IS_VERIFIED}
                                className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
                                allowEmpty
                            />
                        </div>
                        <div className="w-full flex-1">
                            <SelectDropDown
                                selected={selectedFeaturedStatus}
                                onChange={setSelectedFeaturedStatus}
                                placeholder="IS FEATURED"
                                options={IS_FEATURED}
                                className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
                                allowEmpty
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="">
                    <div className="">
						<DataTable
							columns={userColumns} 
							data={users?.data || []}
							loading={isLoading}
							tClassName='border-none border-collapse'
							tHeaderTRowClassName="bg-[#1E83F0] bg-opacity-20"
							tHeaderTHeadClassName="text-[#3980ce] text-[11px] tracking-wide font-[400]"
							tCellClassName="text-xs font-"
							totalRecords={users?.totalrecords}
							onPageChange={onPageChange}
						/>
                    </div>
                </CardContent>
            </Card>

			<UpdateUser
				open={showUpdateModal}
				setOpen={setShowUpdateModal}
				userData={user}
			/>

			<SeekerProfile
				open={showSeekerProfileModal}
				setOpen={setShowSeekerProfileModal}
				seekerData={user}
			/>
			
			<EmployerProfile
				open={showEmployerProfileModal}
				setOpen={setShowEmployerProfileModal}
				employerData={user}
			/>
		</>
	)
}

export default Users;