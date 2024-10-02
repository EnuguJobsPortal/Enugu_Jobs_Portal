import TableCellActionMenu from "@/components/TableCellActionMenu";
import { Badge } from "@/components/ui/badge";
import usePagination from "@/hooks/usePagination";
import { ITableCellMenuItem } from "@/interfaces/general";
import { IJobApplicationResponse } from "@/interfaces/response.interface";
import { formatCurrency2 } from "@/lib/currencyFormatter";
import { ColumnDef } from "@tanstack/react-table";
import classNames from "classnames";
import { format, fromUnixTime } from "date-fns";

interface ITableColumnProps {
    handleDeleteApplication: (applicationID:number) => void;
	handleCVDownload: (downloadURL: string | null) => void;
}

const useJobApplicationColumns = ({ handleDeleteApplication, handleCVDownload }:ITableColumnProps) => {
    const { pagination, onPageChange } = usePagination({ pageIndex:0, pageSize:10 });

    const jobApplicationColumns: ColumnDef<IJobApplicationResponse>[] = [
		{
			accessorKey: '',
			header: 'SNO',
			cell: ({ row }) => {
				return (pagination.pageIndex * pagination.pageSize) + row.index + 1;
			}
		},
		{
			accessorKey: 'ApplicantName',
			header: 'APPLICANT',
		},
		{
			accessorKey: 'Email',
			header: 'APPLICANT EMAIL',
		},
		{
			accessorKey: 'Phonenumber',
			header: 'APPLICANT EMAIL',
		},
		{
			accessorKey: 'ApplicationDate',
			header: 'APPLICATION DATE',
			cell: ({ row }) => {
				const timestamp = row.getValue('ApplicationDate') as number;
				return format(fromUnixTime(timestamp), 'PPP hh:mm:ss a');
			}
		},
		{
			accessorKey: 'CreatedDate',
			header: 'JOB CREATED AT',
			cell: ({ row }) => {
				const timestamp = row.getValue('CreatedDate') as number;
				return format(fromUnixTime(timestamp), 'PPP hh:mm:ss a');
			}
		},
		{
			accessorKey: 'ApplicationStatus',
			header: 'APPLICATION STATUS',
			cell: ({ row }) => {
				const status = row.getValue("ApplicationStatus") as string;
	
				return (
					<Badge
						variant="outline" 
						className={classNames(status === "Success" ? "bg-[#32FF2E]" : "bg-[#FB236A]", "h-[25px] px-3 bg-opacity-20 rounded-[100px] justify-center items-center gap-1 inline-flex border-none")}
					>
						<span className={classNames(status === "Success" ? "text-green-800" : "text-[#fb234e]", "bg-opacity-10 text-[10px] font-semibold uppercase tracking-tight")}>
							{status}
						</span>
					</Badge>
				)
			},
		},
		{
			accessorKey: 'Gender',
			header: 'GENDER',
		},
		{
			accessorKey: 'CurrentLocation',
			header: 'APPLICANT LOCATION',
		},
		
		{
			accessorKey: 'CompanyName',
			header: 'EMPLOYER',
		},
		{
			accessorKey: 'JobTitle',
			header: 'JOB TITLE',
		},
		{
			accessorKey: 'JobAddress',
			header: 'JOB ADDRESS',
		},
		{
			accessorKey: 'WorkType',
			header: 'WORK TYPE',
		},
		{
			accessorKey: 'Salary',
			header: 'PROPOSED SALARY',
			cell: ({ row }) => {
				const salary = row.getValue("Salary") as number;
				const currency = row.original.Currency as string;
				const formattedAmount = formatCurrency2(salary, currency);
				return formattedAmount;
			}
			
		},
		{
			accessorKey: 'actions',
			header: '',
			cell: ({ row }) => {
				const applicationID = row.original.ApplicationId;
				const cvUploadLink = row.original.CvUploadLink;
				const originalCV = row.original.OriginalCv;

				const menuItems: ITableCellMenuItem[] = [
                    { label: 'Delete', icon: 'Trash2', iconColor: '#6b7280', handleClick: () => { handleDeleteApplication(applicationID) } },
					{ label: 'Download CV', icon: 'DownloadCloud', iconColor: '#6b7280', handleClick: () => { 
						cvUploadLink ? handleCVDownload(cvUploadLink) : handleCVDownload(originalCV); 
					}},
                ]
				return <TableCellActionMenu menuItems={menuItems}/>
			}
		},
	];

    return {
        jobApplicationColumns,
        pagination,
        onPageChange
    }
}

export default useJobApplicationColumns;