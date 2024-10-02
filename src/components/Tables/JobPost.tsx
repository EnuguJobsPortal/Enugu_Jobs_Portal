import UpdateJobPost from "@/components/Forms/UpdateJobPost";
import { DataTable } from "@/components/Tables/DataTable";
import DatePicker from "@/components/shared/DatePicker";
import SelectDropDown from "@/components/shared/SelectDropdown";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IS_ACTIVE, PAYMENT_STATUS, PUBLISH_STATUS, WORK_TYPE } from "@/const/options";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import useJobPostColumns from "@/hooks/columns/useJobPostColumns";
import { useGetAllCareerIndustries } from "@/hooks/queries/careerIndustry";
import { useGetInfiniteEmployerList } from "@/hooks/queries/infiniteQueries";
import { useGetAllJobPosts, useRemoveJobPost } from "@/hooks/queries/jobs";
import { SelectOption } from "@/interfaces/controlnput.interface";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";

const JobPost = () => {
	const { showLoading, hideLoading } = useLoading();
	const { showConfirm, showError, showSuccess } = useSweetAlert();
	const [ selectedDate, setSelectedDate ] = useState<Date | undefined>();
	const [ selectedEmployerID, setSelectedEmployerID ] = useState<string>("");
	const [ selectedWorkType, setSelectedWorkType ] = useState<string>("");
	const [ selectedActiveStatus, setSelectedActiveStatus ] = useState<string>("");
	const [ selectedPublishStatus, setSelectedPublishStatus ] = useState<string>("");
	const [ selectedPaymentStatus, setSelectedPaymentStatus ] = useState<string>("");
	const [ selectedCareerIndustryID, setSelectedCareerIndustryID ] = useState<string>("");
	const { employerList, isFetchingNextEmployerList, isLoading, fetchNextEmployerList } = useGetInfiniteEmployerList({ enabled: true });
	const { loadingCareerIndustries, careerIndustries } = useGetAllCareerIndustries({ params: {}})
	const { removingJobPost, removeJobPost } = useRemoveJobPost({ 
		onSuccess: (data) => {
			hideLoading();
			showSuccess("Success!!!", data.message);
		}, 
		onError: (message) => {
			hideLoading();
			showError("Attention!!!", message);
		}
	})

	const handleDeleteJobPost = useCallback(async (postID: number) => {
		const result = await showConfirm("Confirm", "Are you sure you want to remove this job post? Note: This operation is irreversible");
										
		if(result.isConfirmed)
		{
			removeJobPost({ postid: postID })
		}
	}, [ showConfirm, removeJobPost ]);

	const { 
        jobPostColumns, 
        job, 
        onPageChange, 
        pagination, 
        openUpdateModal, 
        setOpenUpdateModal
    } = useJobPostColumns({ handleDeleteJobPost });

	const { loadingJobPosts, jobs } = useGetAllJobPosts({ params: {
		createddate: selectedDate ? moment(selectedDate as unknown as string).format('YYYY-MM-DD') : "",
		posterAccountID: selectedEmployerID,
		WorkType: selectedWorkType,
		IsActive: selectedActiveStatus,
		publishstatus: selectedPublishStatus,
		paymentstatus: selectedPaymentStatus && selectedPaymentStatus === "Paid" ? "Success" : selectedPaymentStatus,
		carrerindustryid: selectedCareerIndustryID,
		PageNumber: pagination.pageIndex + 1,
		PageSize: pagination.pageSize
	}});

	const companyOptionsEnum: SelectOption[] = employerList ? employerList?.map((employer) => (
        { label: `${employer.Firstname} ${employer.Lastname}`, value: `${employer.UserAccountId}`}
    )) : [];
	const careerIndustriesOptionsEnum: SelectOption[] = careerIndustries ? careerIndustries?.map((industry) => (
        { label: `${industry.IndustryName}`, value: `${industry.CareerIndustryId}`}
    )) : [];

	useEffect(() => {
		if(removingJobPost)
		{
			showLoading();
		}
	}, [ removingJobPost, showLoading])

	return (
		<>
			<Card className="rounded-xl font-poppins bg-neutral-white w-full px-4 py-4 shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] mb-10">
				<CardHeader className="flex flex-col lg:flex-row flex-wrap items-center justify-between gap-8 pt-0 pb-2 w-full mb-4">
                    <span className="uppercase text-xs font-bold tracking-widest">Jobs</span>
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-2">
						<div className="w-full flex-1">
							<DatePicker
								selected={selectedDate}
								onChange={setSelectedDate}
								iconClassName="w-6 h-6"
								buttonClassName="p-6 rounded-2xl bg-blue-800 text-white uppercase text-[9px] justify-center text-center"
								placeHolder="Filter Creation Date"
								calendarClassName=""
							/>
                        </div>
                        <div className="w-full flex-1">
                            <SelectDropDown
                                selected={selectedEmployerID}
                                onChange={setSelectedEmployerID}
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
                                selected={selectedPublishStatus}
                                onChange={setSelectedPublishStatus}
                                placeholder="PUBLISHED STATUS"
                                options={PUBLISH_STATUS}
                                className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
                                allowEmpty
                            />
                        </div>
                        <div className="w-full flex-1">
                            <SelectDropDown
                                selected={selectedCareerIndustryID}
                                onChange={setSelectedCareerIndustryID}
                                placeholder="CAREER INDUSTRY"
                                options={careerIndustriesOptionsEnum}
								isLoading={loadingCareerIndustries}
                                className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
                                allowEmpty
                            />
                        </div>
						<div className="w-full flex-1">
                            <SelectDropDown
                                selected={selectedPaymentStatus}
                                onChange={setSelectedPaymentStatus}
                                placeholder="PAYMENT STATUS"
                                options={PAYMENT_STATUS}
                                className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-36"
                                allowEmpty
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="">
					<DataTable
						columns={jobPostColumns} 
						data={jobs?.data || []}
						loading={loadingJobPosts}
						tClassName='border-none border-collapse'
						tHeaderTRowClassName="bg-[#1E83F0] bg-opacity-20"
						tHeaderTHeadClassName="text-[#3980ce] text-[11px] tracking-wide font-[400]"
						tCellClassName="text-xs font-"
						totalRecords={jobs?.totalrecords}
						onPageChange={onPageChange}
					/>
                </CardContent>
            </Card>

			<UpdateJobPost
                open={openUpdateModal}
                setOpen={setOpenUpdateModal}
                jobData={job}
            />
		</>
	)
}

export default JobPost;