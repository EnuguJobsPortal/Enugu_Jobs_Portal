import TableCellActionMenu from "@/components/TableCellActionMenu";
import { Badge } from "@/components/ui/badge";
import usePagination from "@/hooks/usePagination";
import { ITableCellMenuItem } from "@/interfaces/general";
import { IJobPostResponse } from "@/interfaces/response.interface";
import { formatCurrency } from "@/lib/currencyFormatter";
import { isValidDateString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import classNames from "classnames";
import { format, fromUnixTime } from "date-fns";
import { useState } from "react";

interface ITableColumnProps {
	handleDeleteJobPost: (postID: number) => void;
}

const useJobPostColumns = ({ handleDeleteJobPost }: ITableColumnProps) => {
	const { pagination, onPageChange } = usePagination({
		pageIndex: 0,
		pageSize: 10,
	});
	const [job, setJob] = useState<IJobPostResponse>();
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

	const jobPostColumns: ColumnDef<IJobPostResponse>[] = [
		{
			accessorKey: "",
			header: "SNO",
			cell: ({ row }) =>
				pagination.pageIndex * pagination.pageSize + row.index + 1,
		},
		{
			accessorKey: "Postedby",
			header: "EMPLOYER NAME",
		},
		{
			accessorKey: "JobTitle",
			header: "JOB TITLE",
		},
		{
			accessorKey: "JobType",
			header: "JOB TYPE",
		},
		{
			accessorKey: "WorkType",
			header: "WORK TYPE",
		},
		{
			accessorKey: "Salary",
			header: "SALARY",
			cell: ({ row }) => {
				const salary = row.getValue("Salary") as number;
				/* const currency = row.original.Currency as string;
				const formattedAmount = formatCurrency2(salary, currency); */
				return (
					<span>
						<b>₦</b>
						{salary}
					</span>
				);
			},
		},
		{
			accessorKey: "IndustryName",
			header: "INDUSTRY",
		},
		{
			accessorKey: "PaymentStatus",
			header: "PAYMENT STATUS",
			cell: ({ row }) => {
				const status = row.getValue("PaymentStatus") as string;

				return (
					<Badge
						variant="outline"
						className={classNames(
							status === "Success"
								? "bg-[#32FF2E]"
								: "bg-[#FB236A]",
							"h-[25px] px-3 bg-opacity-20 rounded-[100px] justify-center items-center gap-1 inline-flex border-none w-20"
						)}
					>
						<span
							className={classNames(
								status === "Success"
									? "text-green-800"
									: "text-[#fb234e]",
								"bg-opacity-10 text-[10px] font-semibold uppercase tracking-tight"
							)}
						>
							{status === "Success" ? "Paid" : "Not Paid"}
						</span>
					</Badge>
				);
			},
		},
		{
			accessorKey: "AmountPaid",
			header: "AMOUNT PAID",
			cell: ({ row }) => {
				const amountPaid = row.getValue("AmountPaid") as number;
				const formattedAmount = formatCurrency(amountPaid);
				return formattedAmount;
			},
		},
		{
			accessorKey: "CreatedDate",
			header: "CREATED AT",
			cell: ({ row }) => {
				const timestamp = row.getValue("CreatedDate") as number;
				const formatted = timestamp
					? format(fromUnixTime(timestamp), "PPP HH:mm:ss a")
					: null;
				return formatted;
			},
		},
		{
			accessorKey: "ApplicationDeadline",
			header: "APPLICATION DEADLINE",
			cell: ({ row }) => {
				const date = row.getValue("ApplicationDeadline") as string;
				const formatted = isValidDateString(date)
					? format(new Date(date), "PPP")
					: null;
				return formatted;
			},
		},
		{
			accessorKey: "PublishStatus",
			header: "PUBLISH STATUS",
			cell: ({ row }) => {
				const status = row.getValue("PublishStatus") as string;

				return (
					<Badge
						variant="outline"
						className={classNames(
							status === "Published"
								? "bg-[#32FF2E]"
								: "bg-[#FB236A]",
							"h-[25px] px-3 bg-opacity-20 rounded-[100px] justify-center items-center gap-1 inline-flex border-none"
						)}
					>
						<span
							className={classNames(
								status === "Published"
									? "text-green-800"
									: "text-[#fb234e]",
								"bg-opacity-10 text-[10px] font-semibold uppercase tracking-tight"
							)}
						>
							{status}
						</span>
					</Badge>
				);
			},
		},
		{
			accessorKey: "Isactive",
			header: "IS ACTIVE",
			cell: ({ row }) => {
				const active = row.getValue("Isactive") as string;

				return (
					<Badge
						variant="outline"
						className={classNames(
							active === "Yes" ? "bg-[#32FF2E]" : "bg-[#FB236A]",
							"h-[25px] px-3 bg-opacity-20 rounded-[100px] justify-center items-center gap-1 inline-flex border-none"
						)}
					>
						<span
							className={classNames(
								active === "Yes"
									? "text-green-800"
									: "text-[#fb234e]",
								"bg-opacity-10 text-[10px] font-semibold uppercase tracking-tight"
							)}
						>
							{active}
						</span>
					</Badge>
				);
			},
		},
		{
			accessorKey: "actions",
			header: "",
			cell: ({ row }) => {
				const postID = row.original.PostId;
				const menuItems: ITableCellMenuItem[] = [
					{
						label: "Update",
						icon: "Pencil",
						iconColor: "#6b7280",
						handleClick: () => {
							setJob(row.original);
							setOpenUpdateModal(true);
						},
					},
					{
						label: "Delete",
						icon: "Trash2",
						iconColor: "#6b7280",
						handleClick: () => {
							handleDeleteJobPost(postID);
						},
					},
				];
				return <TableCellActionMenu menuItems={menuItems} />;
			},
		},
	];

	return {
		jobPostColumns,
		pagination,
		onPageChange,
		job,
		openUpdateModal,
		setOpenUpdateModal,
	};
};

export default useJobPostColumns;
