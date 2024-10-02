import usePagination from "@/hooks/usePagination";
import { IUserActivityReponse } from "@/interfaces/response.interface";
import { ColumnDef } from "@tanstack/react-table";
import { format, fromUnixTime } from "date-fns";

const useActivityLogColumns = () => {
    const { pagination, onPageChange } = usePagination({ pageIndex:0, pageSize:10 });

    const activityLogColumns: ColumnDef<IUserActivityReponse>[] = [
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
				const firstname = row.getValue("Firstname") as string;
				const lastname = row.original.Lastname as string;
				return `${firstname} ${lastname}`;
			}
		},
		{
			accessorKey: 'EmailAddress',
			header: 'USER EMAIL',
		},
		{
			accessorKey: 'Action',
			header: 'ACTION',
		},
		{
			accessorKey: 'IpAddress',
			header: 'IP ADDRESS',
		},
		{
			accessorKey: 'UserAgent',
			header: 'USER AGENT',
		},
		{
			accessorKey: 'Longitide',
			header: 'LONGITUDE',
		},
		{
			accessorKey: 'Latitiude',
			header: 'LATITUDE',
		},
		{
			accessorKey: 'CreatedAt',
			header: 'CREATED AT',
			cell: ({ row }) => {
				const timestamp = row.getValue("CreatedAt") as number;
                const formatted = timestamp ? format(fromUnixTime(timestamp), "PPP HH:mm:ss a") : null;
                return formatted;
			}
		}
	];

    return {
        activityLogColumns,
        pagination,
        onPageChange
    }
}

export default useActivityLogColumns;