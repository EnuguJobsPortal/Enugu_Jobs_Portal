import TableCellActionMenu from "@/components/TableCellActionMenu";
import { Badge } from "@/components/ui/badge";
import usePagination from "@/hooks/usePagination";
import { ITableCellMenuItem } from "@/interfaces/general";
import { IBlogPostResponse } from "@/interfaces/response.interface";
import { ColumnDef } from "@tanstack/react-table";
import classNames from "classnames";
import { format, fromUnixTime } from "date-fns";
import { useState } from "react";

interface ITableColumnProps {
    handleDeleteBlogPost: (postID:number) => void;
}

const useBlogPostColumns = ({ handleDeleteBlogPost }:ITableColumnProps) => {
    const { pagination, onPageChange } = usePagination({ pageIndex:0, pageSize:10 });
    const [ blog, setBlog ] = useState<IBlogPostResponse>();
    const [ showUpdateModal, setShowUpdateModal ] = useState<boolean>(false);

    const blogPostColumns: ColumnDef<IBlogPostResponse>[] = [
        {
            accessorKey: '',
            header: 'SNO',
            cell: ({ row }) => {
                return (pagination.pageIndex * pagination.pageSize) + row.index + 1;
            }
        },
        {
            accessorKey: 'NewsTitle',
            header: 'BLOG TITLE',
        },
        {
            accessorKey: 'NewsCategoryName',
            header: 'BLOG CATEGORY NAME',
        },
        {
            accessorKey: 'NewsTags',
            header: 'BLOG TAGS',
        },
        {
            accessorKey: 'NewsStatus',
            header: 'BLOG STATUS',
            cell: ({ row }) => {
                const status = row.getValue("NewsStatus") as string;
    
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
            accessorKey: 'Countofcomments',
            header: 'COMMENT COUNT',
            cell: ({ row }) => {
                const newsComments = row.original.NewsComments;
                return newsComments.length;
            }
        },
        {
            accessorKey: 'NewsTimestamp',
            header: 'CREATED AT',
            cell: ({ row }) => {
                const timestamp = row.getValue("NewsTimestamp") as number;
                const formatted = timestamp ? format(fromUnixTime(timestamp), "PPP HH:mm:ss a") : null;
                return formatted;
            }
        },
        {
            accessorKey: 'actions',
            header: '',
            cell: ({ row }) => {
    
                const menuItems: ITableCellMenuItem[] = [
                    { label: 'Update', icon: 'Pencil', iconColor: '#6b7280', handleClick: () => { 
                        setBlog(row.original)
                        setShowUpdateModal(true);
                    }},
                    { label: 'Delete', icon: 'Trash2', iconColor: '#6b7280', handleClick: () => { handleDeleteBlogPost(row.original.NewsId) } },
                ]
                return <TableCellActionMenu menuItems={menuItems}/>
            }
        },
    ];

    return {
        blogPostColumns,
        pagination,
        onPageChange,
        blog,
        showUpdateModal,
        setShowUpdateModal
    }
}

export default useBlogPostColumns;