import TableCellActionMenu from "@/components/TableCellActionMenu";
import { Badge } from "@/components/ui/badge";
import usePagination from "@/hooks/usePagination";
import { ITableCellMenuItem } from "@/interfaces/general";
import { ISeekerPackageResponse2 } from "@/interfaces/response.interface";
import { formatCurrency } from "@/lib/currencyFormatter";
import { ColumnDef } from "@tanstack/react-table";
import classNames from "classnames";
import { useState } from "react";

interface ITableColumnProps {
    handleDeletePackage: (packageID:number) => void;
}

const useSeekerPackageColumns2 = ({ handleDeletePackage }:ITableColumnProps) => {
    const { pagination, onPageChange } = usePagination({ pageIndex:0, pageSize:10 });
    const [ pkg, setPkg ] = useState<ISeekerPackageResponse2>();
    const [ showUpdateModal, setShowUpdateModal ] = useState<boolean>(false);

    const seekerPackageColumns: ColumnDef<ISeekerPackageResponse2>[] = [
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
			accessorKey: 'PackagePrice',
			header: 'PACKAGE PRICE',
            cell: ({ row }) => {
                const pkgPrice = row.getValue("PackagePrice") as number;
                const formattedPrice = formatCurrency(pkgPrice);
                return formattedPrice;
            }
		},
        {
			accessorKey: 'PackageDays',
			header: 'PACKAGE DAYS',
		},
        {
			accessorKey: 'PackageAvailability',
			header: 'PACKAGE AVAILABILITY',
			cell: ({ row }) => {
				const status = row.getValue("PackageAvailability") as string;
	
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

                const menuItems: ITableCellMenuItem[] = [
                    { label: 'Update', icon: 'Pencil', iconColor: '#6b7280', handleClick: () => { 
						setPkg(row.original)
                        setShowUpdateModal(true);
					}},
                    { label: 'Delete', icon: 'Trash2', iconColor: '#6b7280', handleClick: () => { handleDeletePackage(row.original.PackageId as unknown as number) }},
                ];

				return <TableCellActionMenu menuItems={menuItems}/>
			}
		},
	];

    return {
        seekerPackageColumns,
        pagination,
        onPageChange,
        pkg,
        setPkg,
        showUpdateModal,
        setShowUpdateModal
    }
}

export default useSeekerPackageColumns2;