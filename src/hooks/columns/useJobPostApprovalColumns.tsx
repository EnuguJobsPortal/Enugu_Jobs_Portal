import TableCellActionMenu from "@/components/TableCellActionMenu";
import { Badge } from "@/components/ui/badge";
import usePagination from "@/hooks/usePagination";
import { ITableCellMenuItem } from "@/interfaces/general";
import { IJobPostApprovalResponse } from "@/interfaces/response.interface";
import { formatCurrency } from "@/lib/currencyFormatter";
import { ColumnDef } from "@tanstack/react-table";
import classNames from "classnames";
import moment from "moment";
import { useState } from "react";

interface ITableColumnProps {
    handleDeleteJobPost: (approvalID:number) => void;
    handleApproveJobPost: (approvalID:number, postID: number) => void;
}

const useJobPostApprovalColumns = ({ handleDeleteJobPost, handleApproveJobPost }:ITableColumnProps) => {
    const { pagination, onPageChange } = usePagination({ pageIndex:0, pageSize:10 });
    const [ job, setJob ] = useState<IJobPostApprovalResponse>();
    const [ openUpdateModal, setOpenUpdateModal ] = useState<boolean>(false);

    const jobPostColumns: ColumnDef<IJobPostApprovalResponse>[] = [
		{
			accessorKey: '',
			header: 'SNO',
			cell: ({ row }) => (pagination.pageIndex * pagination.pageSize) + row.index + 1
		},
		{
			accessorKey: 'EmployerName',
			header: 'EMPLOYER NAME',
		},
		{
			accessorKey: 'JobTitle',
			header: 'JOB TITLE',
		},
		{
			accessorKey: 'JobType',
			header: 'JOB TYPE',
		},
		{
			accessorKey: 'WorkType',
			header: 'WORK TYPE',
		},
		{
			accessorKey: 'Industry',
			header: 'INDUSTRY',
		},
		{
			accessorKey: 'AmountPaid',
			header: 'AMOUNT PAID',
			cell: ({ row }) => {
				const amountPaid = row.getValue("AmountPaid") as number;
				const formattedAmount = amountPaid ? formatCurrency(amountPaid) : 'None';
				return formattedAmount;
			}
		},
		{
			accessorKey: 'ApplicationDeadline',
			header: 'APPLICATION DEADLINE',
			cell: ({ row }) => {
                const date = row.getValue("ApplicationDeadline") as string;
                const parsedDate = moment(date, "YYYY-MM-DD");
                const formatted = parsedDate.isValid() ? parsedDate.format('dddd, MMMM Do, YYYY') : null;
                return formatted;
            }
		},
		{
			accessorKey: 'DatePostedForApproval',
			header: 'CREATION DATE',
			cell: ({ row }) => {
                const date = row.getValue("DatePostedForApproval") as number;
                const parsedDate = moment.unix(date);
                const formatted = parsedDate.isValid() ? parsedDate.format('dddd, MMMM Do YYYY, h:mm:ss a') : null;
                return formatted;
            }
		},
        {
			accessorKey: 'Status',
			header: 'STATUS',
			cell: ({ row }) => {
				const active = row.getValue("Status") as string;
	
				return (
					<Badge
						variant="outline" 
						className={classNames(active === "Approved" ? "bg-[#32FF2E]" : "bg-[#FB236A] w-32", "h-[25px] px-3 bg-opacity-20 rounded-[100px] justify-center items-center gap-1 inline-flex border-none")}
					>
						<span className={classNames(active === "Approved" ? "text-green-800" : "text-[#fb234e]", "bg-opacity-10 text-[10px] font-semibold uppercase tracking-tight")}>
							{active}
						</span>
					</Badge>
				)
			},
		},
		{
			accessorKey: 'actions',
			header: '',
			cell: ({ row }) => {
				const approvalID = row.original.ApprovalId;
				const postID = row.original.PostId;
				const menuItems: ITableCellMenuItem[] = [
                    { label: 'Approve', icon: 'CheckSquare', iconColor: '#6b7280', handleClick: () => { handleApproveJobPost(approvalID, postID) }},
                    { label: 'Update', icon: 'PenSquare', iconColor: '#6b7280', handleClick: () => { 
                        setJob(row.original)
						setOpenUpdateModal(true);
                    } },
                    { label: 'Delete', icon: 'Trash2', iconColor: '#6b7280', handleClick: () => { handleDeleteJobPost(approvalID) } },
                ]
				return <TableCellActionMenu menuItems={menuItems}/>
			}
		},
	];

    return {
        jobPostColumns,
        pagination,
        onPageChange,
        job,
        openUpdateModal,
        setOpenUpdateModal
    }
}

export default useJobPostApprovalColumns;