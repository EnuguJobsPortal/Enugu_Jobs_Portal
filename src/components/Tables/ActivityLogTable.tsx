import { DataTable } from "@/components/Tables/DataTable";
import DateRangePicker from "@/components/shared/DateRangePicker";
import SelectDropDown from "@/components/shared/SelectDropdown";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ACTIVITY_LOG_ACTIONS } from "@/const/options";
import useActivityLogColumns from "@/hooks/columns/useActivityLogColumns";
import { useGetAllActivities } from "@/hooks/queries/activityLog";
import { useGetInfiniteUserList } from "@/hooks/queries/infiniteQueries";
import { SelectOption } from "@/interfaces/controlnput.interface";
import moment from "moment";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const ActivityLogTable = () => {
	const [ selectedDate, setSelectedDate ] = useState<DateRange | undefined>();
	const [ selectedUserID, setSelectedUserID ] = useState<string>("");
	const [ selectedAction, setSelectedAction ] = useState<string>("");
	const { activityLogColumns, pagination, onPageChange } = useActivityLogColumns();
	const { userList, isFetchingNextUserList, isLoadingUserList, fetchNextUserList } = useGetInfiniteUserList({ enabled: true });
	const { isLoading, activities } = useGetAllActivities({
		params: {
            UserAccountId: selectedUserID,
			CreatedAt: selectedDate && selectedDate?.from ? moment(selectedDate?.from).format('YYYY-MM-DD') : '',
			Start: selectedDate && selectedDate?.from ? moment(selectedDate?.from).format('YYYY-MM-DD') : '',
			End: selectedDate && selectedDate?.to ? moment(selectedDate?.to).format('YYYY-MM-DD') : '',
			Action: selectedAction,
            PageNumber: pagination.pageIndex + 1,
            PageSize: pagination.pageSize
        } 
	});

	const userOptionsEnum: SelectOption[] = userList ? userList.map((user) => (
        { label: `${user.Firstname} ${user.Lastname}`, value: `${user.UserAccountId as unknown as string}` }
    )) : [];

	return (
		<Card className="rounded-xl font-poppins bg-neutral-white w-full px-4 py-4 shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] mb-10">
			<CardHeader className="flex flex-col lg:flex-row flex-wrap items-center justify-between gap-8 pt-0 pb-2 w-full mb-4">
				<span className="uppercase text-xs font-bold tracking-widest">Activities</span>
				<div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-2">
					<div className="w-full flex-1">
						<DateRangePicker
							selected={selectedDate}
							onChange={setSelectedDate}
							iconClassName="w-6 h-6"
							buttonClassName="p-6 rounded-2xl bg-blue-800 text-white uppercase text-[9px] justify-center text-center"
							placeHolder="Filter Activity Date"
							calendarClassName="bg-blue-800 text-white"
						/>
					</div>
					<div className="w-full flex-1">
						<SelectDropDown
							selected={selectedUserID}
							onChange={setSelectedUserID}
							placeholder="USER"
							options={userOptionsEnum}
							isLoading={isLoadingUserList || isFetchingNextUserList}
							className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-44"
							allowEmpty
							onEndOfRow={(e) => {
								if (e) {
									fetchNextUserList();
								}
							}}
						/>
					</div>
					<div className="w-full flex-1">
						<SelectDropDown
							selected={selectedAction}
							onChange={setSelectedAction}
							placeholder="ACTIONS"
							options={ACTIVITY_LOG_ACTIONS}
							className="p-4 rounded-2xl uppercase text-[9px] justify-center text-center w-44"
							allowEmpty
						/>
					</div>
				</div>
			</CardHeader>
			<CardContent className="">
				<div className="">
					<DataTable
						columns={activityLogColumns} 
						data={activities?.data || []}
						loading={isLoading}
						tClassName='border-none border-collapse'
						tHeaderTRowClassName="bg-[#1E83F0] bg-opacity-20"
						tHeaderTHeadClassName="text-[#3980ce] text-[11px] tracking-wide font-[400]"
						tCellClassName="text-xs font-"
						totalRecords={activities?.totalrecords}
						onPageChange={onPageChange}
					/>
				</div>
			</CardContent>
		</Card>
	)
}

export default ActivityLogTable;