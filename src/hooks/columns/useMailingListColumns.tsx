import TableCellActionMenu from "@/components/TableCellActionMenu";
import usePagination from "@/hooks/usePagination";
import { ITableCellMenuItem } from "@/interfaces/general";
import { IMailingListResponse } from "@/interfaces/response.interface";
import { ColumnDef } from "@tanstack/react-table";

interface ITableColumnProps {
    handleRemoveSubscriber: (email:string) => void;
}

const useMailingListColumns = ({ handleRemoveSubscriber }:ITableColumnProps) => {
    const { pagination, onPageChange } = usePagination({ pageIndex:0, pageSize:10 });

    const mailingListColumns: ColumnDef<IMailingListResponse>[] = [
		{
			accessorKey: '',
			header: 'SNO',
			cell: ({ row }) => {
				return (pagination.pageIndex * pagination.pageSize) + row.index + 1;
			}
		},
        {
			accessorKey: 'SubscriberEmail',
			header: 'SUBSCRIBER EMAIL',
            cell: ({ row }) => {
                const SubscriberEmail = row.getValue("SubscriberEmail") as string;
                return SubscriberEmail;
            }
		},
		{
			accessorKey: 'actions',
			header: '',
            cell: ({ row }) => {
                const subscriber = row.original;
				const menuItems: ITableCellMenuItem[] = [
                    { label: 'Delete', icon: 'Trash', iconColor: '#6b7280', handleClick: () => { 
                        handleRemoveSubscriber(subscriber.SubscriberEmail)
                    }}
                ];
                
				return <TableCellActionMenu menuItems={menuItems}/>
			}
        }
	];

    return {
        mailingListColumns,
        pagination,
        onPageChange
    }
}

export default useMailingListColumns;