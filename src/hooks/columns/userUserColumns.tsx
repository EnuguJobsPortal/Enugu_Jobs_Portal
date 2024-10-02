import TableCellActionMenu from "@/components/TableCellActionMenu";
import { Badge } from "@/components/ui/badge";
import usePagination from "@/hooks/usePagination";
import { ITableCellMenuItem } from "@/interfaces/general";
import { IUserResponse } from "@/interfaces/response.interface";
import { ColumnDef } from "@tanstack/react-table";
import classNames from "classnames";
import { format, fromUnixTime } from "date-fns";
import { useState } from "react";

interface ITableColumnProps {
    handleRemoveUser: (userType:string, userID: string) => void;
    handleCVDownload: (downloadURL: string | null) => void;
}

const useUserColumns = ({ handleRemoveUser, handleCVDownload }:ITableColumnProps) => {
    const { pagination, onPageChange } = usePagination({ pageIndex:0, pageSize:10 });
    const [ user, setUser ] = useState<IUserResponse>();
    const [ showUpdateModal, setShowUpdateModal ] = useState<boolean>(false);
    const [ showSeekerProfileModal, setShowSeekerProfileModal ] = useState<boolean>(false);
    const [ showEmployerProfileModal, setShowEmployerProfileModal ] = useState<boolean>(false);
    
    const userColumns: ColumnDef<IUserResponse>[] = [
		{
			accessorKey: '',
			header: 'SNO',
            cell: ({ row }) => {
				return (pagination.pageIndex * pagination.pageSize) + row.index + 1;
			}
		},
		{
			accessorKey: 'Firstname',
			header: 'USER',
            cell: ({ row }) => {
                const lastName = row.original.Lastname
				const firstName = row.getValue("Firstname") as string;
	
				return `${firstName} ${lastName}`
			},
		},
		{
			accessorKey: 'Email',
			header: 'USER EMAIL',
		},
		{
			accessorKey: 'Phonenumber',
			header: 'USER PHONE',
		},
		{
			accessorKey: 'CurrentLocation',
			header: 'LOCATION',
		},
		{
			accessorKey: 'UserType',
			header: 'USER TYPE',
            cell: ({ row }) => {
                const userType = row.original.Usertype?.usertype as string;
                return userType;
            }
		},
		{
			accessorKey: 'RegistrationDate',
			header: 'MEMBER SINCE',
			cell: ({ row }) => {
                const timestamp = row.getValue("RegistrationDate") as number;
                const formatted = timestamp && !isNaN(timestamp) ? format(fromUnixTime(timestamp), "PPP HH:mm:ss a") : null;
                return formatted;
            }
		},
		{
			accessorKey: 'Isactive',
			header: 'IS ACTIVE',
			cell: ({ row }) => {
				const status = row.getValue("Isactive") as string;
	
				return (
					<Badge
						variant="outline" 
						className={classNames(status === "Yes" ? "bg-[#32FF2E]" : "bg-[#FB236A]", "h-[25px] px-3 bg-opacity-20 rounded-[100px] justify-center items-center gap-1 inline-flex border-none")}
					>
						<span className={classNames(status === "Yes" ? "text-green-800" : "text-[#fb234e]", "bg-opacity-10 text-[10px] font-semibold uppercase tracking-tight")}>
							{status}
						</span>
					</Badge>
				)
			},
		},
		{
			accessorKey: 'SmsNotification',
			header: 'SMS NOTIFICATIONS',
			cell: ({ row }) => {
				const status = row.getValue("SmsNotification") as string;
	
				return (
					<Badge
						variant="outline" 
						className={classNames(status === "Yes" ? "bg-[#32FF2E]" : "bg-[#FB236A]", "h-[25px] px-3 bg-opacity-20 rounded-[100px] justify-center items-center gap-1 inline-flex border-none")}
					>
						<span className={classNames(status === "Yes" ? "text-green-800" : "text-[#fb234e]", "bg-opacity-10 text-[10px] font-semibold uppercase tracking-tight")}>
							{status}
						</span>
					</Badge>
				)
			},
		},
		{
			accessorKey: 'EmailNotification',
			header: 'EMAIL NOTIFICATIONS',
			cell: ({ row }) => {
				const status = row.getValue("EmailNotification") as string;
	
				return (
					<Badge
						variant="outline" 
						className={classNames(status === "Yes" ? "bg-[#32FF2E]" : "bg-[#FB236A]", "h-[25px] px-3 bg-opacity-20 rounded-[100px] justify-center items-center gap-1 inline-flex border-none")}
					>
						<span className={classNames(status === "Yes" ? "text-green-800" : "text-[#fb234e]", "bg-opacity-10 text-[10px] font-semibold uppercase tracking-tight")}>
							{status}
						</span>
					</Badge>
				)
			},
		},
		{
			accessorKey: 'EmailVerification',
			header: 'EMAIL VERIFICATIONS',
			cell: ({ row }) => {
				const status = row.getValue("EmailVerification") as string;
	
				return (
					<Badge
						variant="outline" 
						className={classNames(status === "Yes" ? "bg-[#32FF2E]" : "bg-[#FB236A]", "h-[25px] px-3 bg-opacity-20 rounded-[100px] justify-center items-center gap-1 inline-flex border-none")}
					>
						<span className={classNames(status === "Yes" ? "text-green-800" : "text-[#fb234e]", "bg-opacity-10 text-[10px] font-semibold uppercase tracking-tight")}>
							{status}
						</span>
					</Badge>
				)
			},
		},
		{
			accessorKey: 'actions',
			header: '',
			cell: ({ row }) => {
				const userType = row.original.Usertype?.usertype as string;

				const menuItems: ITableCellMenuItem[] = userType === "JobSeeker" ? [
                    { label: 'Update', icon: 'Pencil', iconColor: '#6b7280', handleClick: () => { 
						setUser(row.original)
						setShowUpdateModal(true);
					}},
                    { label: 'Delete Profile', icon: 'Trash2', iconColor: '#6b7280', handleClick: () => { 
						handleRemoveUser(userType, String(row.original.UserAccountId)); 
					}},
                    { label: 'Profile', icon: 'List', iconColor: '#6b7280', handleClick: () => { 
						setUser(row.original);
						setShowSeekerProfileModal(true);
					}},
                    { label: 'Download CV', icon: 'DownloadCloud', iconColor: '#6b7280', handleClick: () => { 
						handleCVDownload(row.original.CV_downloadLink); 
					}},
                ] : userType === "Employer" ? [
                    { label: 'Update', icon: 'Pencil', iconColor: '#6b7280', handleClick: () => { 
						setUser(row.original)
						setShowUpdateModal(true);
					}},
                    { label: 'Delete Profile', icon: 'Trash2', iconColor: '#6b7280', handleClick: () => { 
						handleRemoveUser(userType, String(row.original.UserAccountId)); 
					}},
                    { label: 'Profile', icon: 'List', iconColor: '#6b7280', handleClick: () => { 
						setUser(row.original);
						setShowEmployerProfileModal(true);
					}},
                ] : [
					{ label: 'Update', icon: 'Pencil', iconColor: '#6b7280', handleClick: () => { 
						setUser(row.original)
						setShowUpdateModal(true);
					}}
				];

				return <TableCellActionMenu menuItems={menuItems}/>
			}
		},
	];

    return {
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
    }
}

export default useUserColumns;