import UpdateJobPost3 from "@/components/Forms/UpdateJobPost3";
import { DataTable } from "@/components/Tables/DataTable";
import DateRangePicker from "@/components/shared/DateRangePicker";
import SelectDropDown from "@/components/shared/SelectDropdown";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import useJobPostApprovalColumns from "@/hooks/columns/useJobPostApprovalColumns";
import { useGetInfiniteEmployerList } from "@/hooks/queries/infiniteQueries";
import {
	useApproveJobPost,
	useGetAllJobPostApprovals,
	useRemoveJobPostApproval,
} from "@/hooks/queries/jobs";
import useAuth from "@/hooks/useAuth";
import { SelectOption } from "@/interfaces/controlnput.interface";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

const JobPostApprovals = () => {
	const { loggedUser } = useAuth();
	const { showLoading, hideLoading } = useLoading();
	const { showConfirm, showError, showSuccess } = useSweetAlert();
	const [selectedDates, setSelectedDates] = useState<DateRange | undefined>();
	const [selectedEmployerID, setSelectedEmployerID] = useState<string>("");
	/* const [selectedStatus, setSelectedStatus] = useState<string>(""); */
	const {
		employerList,
		isFetchingNextEmployerList,
		isLoading,
		fetchNextEmployerList,
	} = useGetInfiniteEmployerList({ enabled: true });
	const { removingJobPostApproval, removeJobPostApproval } =
		useRemoveJobPostApproval({
			onSuccess: (data) => {
				hideLoading();
				showSuccess("Success!!!", data.message);
			},
			onError: (message) => {
				hideLoading();
				showError("Attention!!!", message);
			},
		});
	const { approvingJobPost, approveJobPost } = useApproveJobPost({
		onSuccess: (data) => {
			hideLoading();
			showSuccess("Success!!!", data.message);
		},
		onError: (message) => {
			hideLoading();
			showError("Attention!!!", message);
		},
	});

	const handleDeleteJobPost = useCallback(
		async (approvalID: number) => {
			const result = await showConfirm(
				"Confirm",
				"Are you sure you want to remove this job post? Note: This operation is irreversible"
			);

			if (result.isConfirmed) {
				removeJobPostApproval({ approval_id: approvalID });
			}
		},
		[showConfirm, removeJobPostApproval]
	);

	const handleApproveJobPost = useCallback(
		async (approvalID: number, postID: number) => {
			const result = await showConfirm(
				"Confirm",
				"Are you sure you want to approve this job post? Note: This operation is irreversible"
			);

			if (result.isConfirmed) {
				const payload = {
					PostId: postID,
					ApprovedBy: loggedUser.UserAccountID as unknown as string,
				};
				approveJobPost({ payload, approval_id: approvalID });
			}
		},
		[showConfirm, approveJobPost, loggedUser.UserAccountID]
	);

	const {
		jobPostColumns,
		job,
		onPageChange,
		pagination,
		openUpdateModal,
		setOpenUpdateModal,
	} = useJobPostApprovalColumns({
		handleDeleteJobPost,
		handleApproveJobPost,
	});

	const { loadingJobPostApprovals, jobApprovals } = useGetAllJobPostApprovals(
		{
			params: {
				StartDate:
					selectedDates && selectedDates?.from
						? moment(selectedDates?.from).format("YYYY-MM-DD")
						: "",
				EndDate:
					selectedDates && selectedDates?.to
						? moment(selectedDates?.to).format("YYYY-MM-DD")
						: "",
				/* Status: selectedStatus, */
				UserAccountId: selectedEmployerID,
				PageNumber: pagination.pageIndex + 1,
				PageSize: pagination.pageSize,
			},
		}
	);

	const companyOptionsEnum: SelectOption[] = employerList
		? employerList?.map((employer) => ({
				label: `${employer.Firstname} ${employer.Lastname}`,
				value: `${employer.UserAccountId}`,
		  }))
		: [];

	useEffect(() => {
		if (removingJobPostApproval || approvingJobPost) {
			showLoading();
		}
	}, [removingJobPostApproval, approvingJobPost, showLoading]);

	return (
		<>
			<Card className="rounded-xl font-poppins bg-neutral-white w-full px-4 py-4 shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] mb-10">
				<CardHeader className="flex flex-col lg:flex-row flex-wrap items-center justify-between gap-8 pt-0 pb-2 w-full mb-4">
					<span className="uppercase text-xs font-bold tracking-widest">
						Unapproved Job Posts
					</span>
					<div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-2">
						<div className="w-full flex-1">
							<DateRangePicker
								selected={selectedDates}
								onChange={setSelectedDates}
								iconClassName="w-6 h-6"
								buttonClassName="p-6 rounded-2xl bg-blue-800 text-white uppercase text-[9px] justify-center text-center"
								placeHolder="Filter Creation Date"
								calendarClassName="bg-blue-800 text-white"
							/>
						</div>
						<div className="w-full flex-1">
							<SelectDropDown
								selected={selectedEmployerID}
								onChange={setSelectedEmployerID}
								placeholder="EMPLOYER"
								options={companyOptionsEnum}
								isLoading={
									isFetchingNextEmployerList || isLoading
								}
								className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
								allowEmpty
								onEndOfRow={(e) => {
									if (e) {
										fetchNextEmployerList();
									}
								}}
							/>
						</div>
						{/* <div className="w-full flex-1">
							<SelectDropDown
								selected={selectedStatus}
								onChange={setSelectedStatus}
								placeholder="APPROVAL STATUS"
								options={APPROVAL_STATUS}
								className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
								allowEmpty
							/>
						</div> */}
					</div>
				</CardHeader>
				<CardContent className="">
					<DataTable
						columns={jobPostColumns}
						data={jobApprovals?.data || []}
						loading={loadingJobPostApprovals}
						tClassName="border-none border-collapse"
						tHeaderTRowClassName="bg-[#1E83F0] bg-opacity-20"
						tHeaderTHeadClassName="text-[#3980ce] text-[11px] tracking-wide font-[400]"
						tCellClassName="text-xs font-"
						totalRecords={jobApprovals?.totalrecords}
						onPageChange={onPageChange}
					/>
				</CardContent>
			</Card>

			<UpdateJobPost3
				open={openUpdateModal}
				setOpen={setOpenUpdateModal}
				jobData={job}
			/>
		</>
	);
};

export default JobPostApprovals;
