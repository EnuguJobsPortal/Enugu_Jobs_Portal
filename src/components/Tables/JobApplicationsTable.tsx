import { DataTable } from "@/components/Tables/DataTable";
import DatePicker from "@/components/shared/DatePicker";
import DateRangePicker from "@/components/shared/DateRangePicker";
import SelectDropDown from "@/components/shared/SelectDropdown";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { APPLICATION_STATUS, GENDER, WORK_TYPE } from "@/const/options";
import { useLoading } from "@/context/LoadingContext";
import { useNotification } from "@/context/NotificationContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import useJobApplicationColumns from "@/hooks/columns/useJobApplicationColumns";
import { useGetAllJobApplications, useRemoveJobApplication } from "@/hooks/queries/applications";
import { useGetInfiniteEmployerList, useGetInfiniteJobPostList, useGetInfiniteSeekerList } from "@/hooks/queries/infiniteQueries";
import { SelectOption } from "@/interfaces/controlnput.interface";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

const JobApplicationsTable = () => {
	const { notify } = useNotification();
	const { showLoading, hideLoading } = useLoading();
	const { showError, showSuccess, showConfirm } = useSweetAlert();
	const [ selectedDates, setSelectedDates ] = useState<DateRange | undefined>();
	const [ selectedDate, setSelectedDate ] = useState<Date | undefined>();
	const [ selectedEmployerName, setSelectedEmployerName ] = useState<string>("");
	const [ selectedJobSeekerID, setSelectedJobSeekerID ] = useState<string>("");
	const [ selectedJobPostID, setSelectedJobPostID ] = useState<string>("");
	const [ selectedWorkType, setSelectedWorkType ] = useState<string>("");
	const [ selectedApplicationStatus, setSelectedApplicationStatus ] = useState<string>("");
	const [ selectedGender, setSelectedGender ] = useState<string>("");
	const { employerList, isFetchingNextEmployerList, isLoading, fetchNextEmployerList } = useGetInfiniteEmployerList({ enabled: true });
    const { seekerList, isFetchingNextSeekerList, isLoadingSeekerList, fetchNextSeekerList } = useGetInfiniteSeekerList({ enabled: true });
    const { jobPostList, isFetchingNextJobPostList, isLoadingJobPostList, fetchNextJobPostList } = useGetInfiniteJobPostList({ enabled: true });
	const { removeJobApplication, removingJobApplication } = useRemoveJobApplication({ 
        onSuccess: (data) => {
            hideLoading();
            showSuccess("Success!!!", data.message);
        }, 
        onError: (message) => {
            hideLoading();
            showError("Attention!!!", message);
        }
    })

	const handleDeleteApplication = useCallback(async (applicationID:number) => {
		const result = await showConfirm("Confirm!!!", "Are you sure you want to delete this job application?");

        if(result.isConfirmed)
        {
            removeJobApplication({ application: String(applicationID) });
        }
	}, [ showConfirm, removeJobApplication ]);

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
        jobApplicationColumns,  
        onPageChange, 
        pagination
    } = useJobApplicationColumns({ handleDeleteApplication, handleCVDownload });

	const { loadingJobApplications, jobApplications } = useGetAllJobApplications({ params: {
		CompanyName: selectedEmployerName,
		WorkType: selectedWorkType,
		Gender: selectedGender,
		ApplicationStatus: selectedApplicationStatus,
		UserAccountId: selectedJobSeekerID,
		PostId: selectedJobPostID,
		ApplicationDate: selectedDate ? moment(selectedDate as unknown as string).format('YYYY-MM-DD') : "",
		Start: selectedDates && selectedDates?.from ? moment(selectedDates?.from).format('YYYY-MM-DD') : '',
		End: selectedDates && selectedDates?.to ? moment(selectedDates?.to).format('YYYY-MM-DD') : '',
		PageNumber: pagination.pageIndex + 1,
		PageSize: pagination.pageSize
	}});

	const companyOptionsEnum: SelectOption[] = employerList ? employerList?.map((employer) => (
        { label: `${employer.Firstname} ${employer.Lastname}`, value: `${employer.Firstname} ${employer.Lastname}`}
    )) : [];

    const jobPostOptionsEnum: SelectOption[] = jobPostList ? jobPostList?.map((job) => (
        { label: `${job.JobTitle}`, value: `${job.PostId}`}
    )) : [];

    const seekersOptionsEnum: SelectOption[] = seekerList ? seekerList?.map((seeker) => (
        { label: `${seeker.Firstname} ${seeker.Lastname}`, value: `${seeker.UserAccountId}`}
    )) : [];

	useEffect(() => {
		if(removingJobApplication)
		{
			showLoading();
		}
	}, [ removingJobApplication, showLoading ])

	return (
		<Card className="rounded-xl font-poppins bg-neutral-white w-full px-4 py-4 shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] mb-10">
			<CardHeader className="flex flex-col lg:flex-row flex-wrap items-center justify-between gap-8 pt-0 pb-2 w-full mb-4">
				<span className="uppercase text-xs font-bold tracking-widest">Job Applications</span>
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
							selected={selectedEmployerName}
							onChange={setSelectedEmployerName}
							placeholder="EMPLOYER"
							options={companyOptionsEnum}
							isLoading={isFetchingNextEmployerList || isLoading}
							className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
							allowEmpty
							onEndOfRow={(e) => {
								if (e) {
									fetchNextEmployerList();
								}
							}}
						/>
					</div>
					<div className="w-full flex-1">
						<SelectDropDown
							selected={selectedJobPostID}
							onChange={setSelectedJobPostID}
							placeholder="JOB POST"
							options={jobPostOptionsEnum}
							isLoading={isFetchingNextJobPostList || isLoadingJobPostList}
							className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
							allowEmpty
							onEndOfRow={(e) => {
								if (e) {
									fetchNextJobPostList();
								}
							}}
						/>
					</div>
					<div className="w-full flex-1">
						<SelectDropDown
							selected={selectedJobSeekerID}
							onChange={setSelectedJobSeekerID}
							placeholder="JOB SEEKER"
							options={seekersOptionsEnum}
							isLoading={isFetchingNextSeekerList || isLoadingSeekerList}
							className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
							allowEmpty
							onEndOfRow={(e) => {
								if (e) {
									fetchNextSeekerList();
								}
							}}
						/>
					</div>
					<div className="w-full flex-1">
						<SelectDropDown
							selected={selectedWorkType}
							onChange={setSelectedWorkType}
							placeholder="WORK TYPE"
							options={WORK_TYPE}
							className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
							allowEmpty
						/>
					</div>
					<div className="w-full flex-1">
						<SelectDropDown
							selected={selectedApplicationStatus}
							onChange={setSelectedApplicationStatus}
							placeholder="APPLICATION STATUS"
							options={APPLICATION_STATUS}
							className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
							allowEmpty
						/>
					</div>
					<div className="w-full flex-1">
						<SelectDropDown
							selected={selectedGender}
							onChange={setSelectedGender}
							placeholder="SEEKER GENDER"
							options={GENDER}
							className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
							allowEmpty
						/>
					</div>
					<div className="w-full flex-1">
						<DatePicker
							selected={selectedDate}
							onChange={setSelectedDate}
							iconClassName="w-6 h-6"
							buttonClassName="p-6 rounded-2xl bg-blue-800 text-white uppercase text-[9px] justify-center text-center"
							placeHolder="Filter Application Date"
							calendarClassName=""
						/>
					</div>
				</div>
			</CardHeader>
			<CardContent className="">
				<DataTable
					columns={jobApplicationColumns} 
					data={jobApplications?.data || []}
					loading={loadingJobApplications}
					tClassName='border-none border-collapse'
					tHeaderTRowClassName="bg-[#1E83F0] bg-opacity-20"
					tHeaderTHeadClassName="text-[#3980ce] text-[11px] tracking-wide font-[400]"
					tCellClassName="text-xs font-sans"
					totalRecords={jobApplications?.totalrecords}
					onPageChange={onPageChange}
				/>
			</CardContent>
		</Card>
	)
}

export default JobApplicationsTable;