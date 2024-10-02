import TableCellActionMenu from "@/components/TableCellActionMenu";
import { Badge } from "@/components/ui/badge";
import usePagination from "@/hooks/usePagination";
import { ITableCellMenuItem } from "@/interfaces/general";
import { IBlogCategoryResponse } from "@/interfaces/response.interface";
import { ColumnDef } from "@tanstack/react-table";
import classNames from "classnames";
import { useState } from "react";

interface ITableColumnProps {
    handleDeleteBlogPostCategory: (categoryID:number) => void;
}

const useBlogPostCategoryColumns = ({ handleDeleteBlogPostCategory }:ITableColumnProps) => {
    const { pagination, onPageChange } = usePagination({ pageIndex:0, pageSize:10 });
    const [ blogCategory, setBlogCategory ] = useState<IBlogCategoryResponse>();
    const [ showUpdateModal, setShowUpdateModal ] = useState<boolean>(false);

    const blogPostCategoryColumns: ColumnDef<IBlogCategoryResponse>[] = [
		{
			accessorKey: '',
			header: 'SNO',
			cell: ({ row }) => {
				return (pagination.pageIndex * pagination.pageSize) + row.index + 1;
			}
		},
		{
			accessorKey: 'CategoryName',
			header: 'CATEGORY NAME',
		},
        {
			accessorKey: 'CategoryStatus',
			header: 'CATEGORY STATUS',
			cell: ({ row }) => {
				const status = row.getValue("CategoryStatus") as string;
	
				return (
					<Badge
						variant="outline" 
						className={classNames(status === "Active" ? "bg-[#32FF2E]" : "bg-[#FB236A]", "h-[25px] px-3 bg-opacity-20 rounded-[100px] justify-center items-center gap-1 inline-flex border-none")}
					>
						<span className={classNames(status === "Active" ? "text-green-800" : "text-[#fb234e]", "bg-opacity-10 text-[10px] font-semibold uppercase tracking-tight")}>
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
						setBlogCategory(row.original)
                        setShowUpdateModal(true);
					}},
                    { label: 'Delete', icon: 'Trash2', iconColor: '#6b7280', handleClick: () => { handleDeleteBlogPostCategory(row.original.NewsCategoryId) } },
                ]
				return <TableCellActionMenu menuItems={menuItems}/>
			}
		},
	];

    return {
        blogPostCategoryColumns,
        pagination,
        onPageChange,
        blogCategory,
        showUpdateModal,
        setShowUpdateModal
    }
}

export default useBlogPostCategoryColumns;