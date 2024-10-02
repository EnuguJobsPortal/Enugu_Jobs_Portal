import TableCellActionMenu from "@/components/TableCellActionMenu";
import usePagination from "@/hooks/usePagination";
import { ITableCellMenuItem } from "@/interfaces/general";
import { ITestimonyResponse } from "@/interfaces/response.interface";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

interface ITableColumnProps {
    handleDeleteTestimony: (testimonyID:string) => void;
}

const useTestimonialsColumns = ({ handleDeleteTestimony }:ITableColumnProps) => {
    const { pagination, onPageChange } = usePagination({ pageIndex:0, pageSize:10 });
    const [ testimony, setTestimony ] = useState<ITestimonyResponse | undefined>();
	const [ openModal, setOpenModal ] = useState<boolean>(false);

    const testimonialColumns: ColumnDef<ITestimonyResponse>[] = [
		{
			accessorKey: '',
			header: 'SNO',
			cell: ({ row }) => {
				return (pagination.pageIndex * pagination.pageSize) + row.index + 1;
			}
		},
		{
			accessorKey: 'Testifier',
			header: 'TESTIFIER',
		},
		{
			accessorKey: 'UserType',
			header: 'USER TYPE',
		},
		{
			accessorKey: 'CurrentLocation',
			header: 'CURRENT LOCATION',
		},
		{
			accessorKey: 'Gender',
			header: 'GENDER',
		},
		{
			accessorKey: 'Country',
			header: 'COUNTRY',
		},
		{
			accessorKey: '',
			header: 'ACTIONS',
			cell: ({ row }) => {

				const testimonyData = row.original;

				const menuItems: ITableCellMenuItem[] = [
                    { label: 'More', icon: 'ZoomIn', iconColor: '#6b7280', handleClick: () => { 
						setTestimony(testimonyData);
						setOpenModal(true);
					}},
                    { label: 'Delete', icon: 'Trash2', iconColor: '#6b7280', handleClick: () => handleDeleteTestimony(testimonyData.Testimonyid as unknown as string)},
                ];

				return <TableCellActionMenu menuItems={menuItems}/>
			}
		}
	];

    return {
        testimonialColumns,
        pagination,
        onPageChange,
        testimony,
        openModal,
        setOpenModal
    }
}

export default useTestimonialsColumns;