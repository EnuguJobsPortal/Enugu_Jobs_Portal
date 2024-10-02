import TableCellActionMenu from "@/components/TableCellActionMenu";
import { Badge } from "@/components/ui/badge";
import usePagination from "@/hooks/usePagination";
import { ITableCellMenuItem } from "@/interfaces/general";
import { IBlogCommentResponse } from "@/interfaces/response.interface";
import { ColumnDef } from "@tanstack/react-table";
import classNames from "classnames";
import { format, fromUnixTime } from "date-fns";
import { useState } from "react";

interface ITableColumnProps {
    handleDeleteBlogPostComment: (commentID:number) => void;
}

const useBlogPostCommentColumns = ({ handleDeleteBlogPostComment }:ITableColumnProps) => {
    const { pagination, onPageChange } = usePagination({ pageIndex:0, pageSize:10 });
    const [ comment, setComment ] = useState<IBlogCommentResponse>();
    const [ showUpdateModal, setShowUpdateModal ] = useState<boolean>(false);

    const blogPostCommentColumns: ColumnDef<IBlogCommentResponse>[] = [
		{
			accessorKey: '',
			header: 'SNO',
			cell: ({ row }) => {
				return (pagination.pageIndex * pagination.pageSize) + row.index + 1;
			}
		},
		{
			accessorKey: 'CommenterName',
			header: 'COMMENTER',
		},
		{
			accessorKey: 'NewsTitle',
			header: 'NEWS TITLE',
		},
		{
			accessorKey: 'NewsComment',
			header: 'NEWS COMMENT',
		},
		{
			accessorKey: 'NewsCommentTimestamp',
			header: 'COMMENT DATE / TIME',
            cell: ({ row }) => {
                const timestamp = row.getValue("NewsCommentTimestamp") as number;
                return format(fromUnixTime(timestamp), "PPP HH:mm:ss a");
            }
		},
        {
			accessorKey: 'NewsCommentStatus',
			header: 'COMMENT STATUS',
			cell: ({ row }) => {
				const status = row.getValue("NewsCommentStatus") as string;
	
				return (
					<Badge
						variant="outline" 
						className={classNames(status === "Published" ? "bg-[#32FF2E]" : "bg-[#FB236A]", "h-[25px] px-3 bg-opacity-20 rounded-[100px] justify-center items-center gap-1 inline-flex border-none")}
					>
						<span className={classNames(status === "Published" ? "text-green-800" : "text-[#fb234e]", "bg-opacity-10 text-[10px] font-semibold uppercase tracking-tight")}>
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
						setComment(row.original);
                        setShowUpdateModal(true);
					}},
                    { label: 'Delete', icon: 'Trash2', iconColor: '#6b7280', handleClick: () => { handleDeleteBlogPostComment(row.original.NewsCommentId) } },
                ]
				return <TableCellActionMenu menuItems={menuItems}/>
			}
		},
	];

    return {
        blogPostCommentColumns,
        pagination,
        onPageChange,
        comment,
        showUpdateModal,
        setShowUpdateModal
    }
}

export default useBlogPostCommentColumns;