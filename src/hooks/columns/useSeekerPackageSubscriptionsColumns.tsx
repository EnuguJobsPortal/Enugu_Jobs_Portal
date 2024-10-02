import { Badge } from "@/components/ui/badge";
import usePagination from "@/hooks/usePagination";
import { IJobSeekerPackageSubscriptionResponse } from "@/interfaces/response.interface";
import { formatCurrency } from "@/lib/currencyFormatter";
import { ColumnDef } from "@tanstack/react-table";
import classNames from "classnames";
import moment from "moment";
import { useState } from "react";


const useSeekerPackageSubscriptionsColumns = () => {
    const { pagination, onPageChange } = usePagination({ pageIndex:0, pageSize:10 });
    const [ subscriptions, setSubscription ] = useState<IJobSeekerPackageSubscriptionResponse>();
    const [ showUpdateModal, setShowUpdateModal ] = useState<boolean>(false);

    const seekerPackageSubscriptionsColumns: ColumnDef<IJobSeekerPackageSubscriptionResponse>[] = [
		{
			accessorKey: '',
			header: 'SNO',
			cell: ({ row }) => (pagination.pageIndex * pagination.pageSize) + row.index + 1
		},
		{
			accessorKey: 'PackageName',
			header: 'PACKAGE NAME',
		},
		{
			accessorKey: 'EmailAddress',
			header: 'SUBSCRIBER EMAIL ADDRESS',
		},
        {
			accessorKey: 'SubscriptionDate',
			header: 'SUBSCRIPTION DATE & TIME',
            cell: ({row}) => {
                const dateUnix = row.getValue("SubscriptionDate") as string;
                const formattedTime = dateUnix && moment.unix(dateUnix as unknown as number).isValid() ? moment.unix(dateUnix as unknown as number).format('MMMM Do YYYY, h:mm:ss a') : "";
				return formattedTime;
            }
		},
        {
			accessorKey: 'TransactionReference',
			header: 'TRANSACTION REFERENCE ID',
		},
        {
			accessorKey: 'TransactionStatus',
			header: 'TRANSACTION STATUS',
            cell: ({ row }) => {
				const status = row.getValue("TransactionStatus") as string;
	
				return (
					<Badge
						variant="outline" 
						className={classNames(
                            status === "Success" ? "bg-[#32FF2E]" : 
                            status === "Pending" ? "bg-blue-400" :
                            "bg-[#FB236A]", 
                            "h-[25px] px-3 bg-opacity-20 rounded-[100px] justify-center items-center gap-1 inline-flex border-none"
                        )}
					>
						<span 
                            className={classNames(
                                status === "Success" ? "text-green-800" : 
                                status === "Pending" ? "text-blue-700" :
                                "text-[#fb234e]", 
                                "bg-opacity-10 text-[10px] font-semibold uppercase tracking-tight"
                            )}
                        >
							{status}
						</span>
					</Badge>
				)
			},
		},
        {
			accessorKey: 'Amount',
			header: 'AMOUNT PAID',
			cell: ({ row }) => {
				const amount = row.getValue("Amount") as string;
                const formattedAmount = amount ? formatCurrency(amount) : null;
                return formattedAmount;
			},
		}
	];

    return {
        seekerPackageSubscriptionsColumns,
        pagination,
        onPageChange,
        subscriptions,
        setSubscription,
        showUpdateModal,
        setShowUpdateModal
    }
}

export default useSeekerPackageSubscriptionsColumns;