import TableCellActionMenu from "@/components/TableCellActionMenu";
import { Badge } from "@/components/ui/badge";
import usePagination from "@/hooks/usePagination";
import { ITableCellMenuItem } from "@/interfaces/general";
import { IContactMessageResponse } from "@/interfaces/response.interface";
import { ColumnDef } from "@tanstack/react-table";
import classNames from "classnames";
import moment from "moment";
import { useState } from "react";

interface ITableColumnProps {
    handleDeleteMessage: (messageID:string) => void;
}

const useMessageColumns = ({ handleDeleteMessage }:ITableColumnProps) => {
    const { pagination, onPageChange } = usePagination({ pageIndex:0, pageSize:10 });
    const [selectedMessageID, setSelectedMessageID] = useState<string | null>(null);
    const [selectedMessage, setSelectedMessage] = useState<IContactMessageResponse | undefined>(undefined);
    const [ openReplyModal, setOpenReplyModal ] = useState<boolean>(false);
    const [ openMessageDetailsDialog, setOpenMessageDetailsDialog ] = useState<boolean>(false);

    const messageColumns: ColumnDef<IContactMessageResponse>[] = [
		{
			accessorKey: '',
			header: 'SNO',
			cell: ({ row }) => {
				return (pagination.pageIndex * pagination.pageSize) + row.index + 1;
			}
		},
        {
			accessorKey: 'FullName',
			header: 'SENDER FULL NAME',
            cell: ({ row }) => {
                const senderFullName = row.getValue("FullName") as string;
                return senderFullName;
            }
		},
        {
			accessorKey: 'Email',
			header: 'SENDER EMAIL',
            cell: ({ row }) => {
                const senderEmail = row.getValue("Email") as string;
                return senderEmail;
            }
		},
        {
			accessorKey: 'Subject',
			header: 'MESSAGE SUBJECT',
            cell: ({ row }) => {
                const subject = row.getValue("Subject") as string;
                return subject;
            }
		},
        {
			accessorKey: 'Status',
			header: 'MESSAGE STATUS',
            cell: ({ row }) => {
				const messageStatus = row.getValue("Status") as "unread" | "read";
	
				return (
					<Badge
						variant="outline" 
						className={classNames(
							messageStatus === "read" ? "bg-[#1FD951] text-[#1FD951]" :
                            "bg-red-700 text-red-700", 
							"h-[25px] w-28 px-3 bg-opacity-10 rounded-[100px] justify-center items-center gap-1 inline-flex border-none"
						)}
					>
						<span className="text-[8px] font-normal uppercase tracking-tight">
							{messageStatus}
						</span>
					</Badge>
				)
			},
		},
        {
			accessorKey: 'DateCreated',
			header: 'DATE & TIME',
            cell: ({row}) => {
                const dateTime = row.getValue("DateCreated") as string;
                const formattedTime = dateTime ? moment.unix(dateTime as unknown as number).format('MMMM Do YYYY, h:mm:ss a') : "";
				return formattedTime;
            }
		},
		{
			accessorKey: 'actions',
			header: '',
            cell: ({ row }) => {
                const message = row.original;
				const menuItems: ITableCellMenuItem[] = [
                    { label: 'View Message', icon: 'Eye', iconColor: '#6b7280', handleClick: () => {
                        setSelectedMessage(message);
                        setOpenMessageDetailsDialog(true);
                    }},
                    { label: 'Delete', icon: 'Trash', iconColor: '#6b7280', handleClick: () => { 
                        handleDeleteMessage(message.MessageId as unknown as string)
                    }},
                    { label: 'Reply', icon: 'MessageCircle', iconColor: '#6b7280', handleClick: () => {
                        setSelectedMessageID(message.MessageId as unknown as string);
                        setOpenReplyModal(true);
                    }}
                ];
                
				return <TableCellActionMenu menuItems={menuItems}/>
			}
        }
	];

    return {
        messageColumns,
        pagination,
        onPageChange,
        selectedMessageID,
        selectedMessage,
        setSelectedMessageID,
        openReplyModal,
        setOpenReplyModal,
        openMessageDetailsDialog,
        setOpenMessageDetailsDialog,
    }
}

export default useMessageColumns;