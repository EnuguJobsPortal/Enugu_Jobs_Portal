import TableCellActionMenu from "@/components/TableCellActionMenu";
import usePagination from "@/hooks/usePagination";
import { ITableCellMenuItem } from "@/interfaces/general";
import { IJobPackageResponse } from "@/interfaces/response.interface";
import { formatCurrency } from "@/lib/currencyFormatter";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

interface ITableColumnProps {
    handleDeletePackage: (packageID:number) => void;
}

const useEmployerPackageColumns = ({ handleDeletePackage }:ITableColumnProps) => {
    const { pagination, onPageChange } = usePagination({ pageIndex:0, pageSize:10 });
    const [ pkg, setPkg ] = useState<IJobPackageResponse>();
    const [ showUpdateModal, setShowUpdateModal ] = useState<boolean>(false);

    const employerPackageColumns: ColumnDef<IJobPackageResponse>[] = [
		{
			accessorKey: '',
			header: 'SNO',
			cell: ({ row }) => {
				return (pagination.pageIndex * pagination.pageSize) + row.index + 1;
			}
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
			accessorKey: 'DisplayDays',
			header: 'DISPLAY DAYS',
		},
		{
			accessorKey: 'Percentage',
			header: 'PERCENTAGE',
		},
		{
			accessorKey: 'NumberOfPost',
			header: 'NUMBER OF POSTS',
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
                    { label: 'Delete', icon: 'Trash2', iconColor: '#6b7280', handleClick: () => { handleDeletePackage(row.original.Packageid) }},
                ];

				return <TableCellActionMenu menuItems={menuItems}/>
			}
		},
	];

    return {
        employerPackageColumns,
        pagination,
        onPageChange,
        pkg,
        showUpdateModal,
        setShowUpdateModal
    }
}

export default useEmployerPackageColumns;