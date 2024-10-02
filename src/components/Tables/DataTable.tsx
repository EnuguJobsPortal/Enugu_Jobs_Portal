import {
	ColumnDef,
	ColumnFiltersState,
	PaginationState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table';
import * as React from 'react';
	
//import { DataTableToolbar } from '@/Common/Table/data-table-toolbar';
import Loading from '@/components/Loading';
import { DataTablePagination } from '@/components/Tables/TablePagination';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
	
interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	totalRecords?: number;
	loading?: boolean;
	tClassName?: string;
	tHeaderTRowClassName?: string;
	tHeaderTHeadClassName?: string;
	tBodyTRowClassName?: string;
	tCellClassName?: string;
	tRowClassFn?:(rowIndex:number) => string
	onPageChange:(pageIndex:number, pageSize:number) => void;
}
	
export function DataTable<TData, TValue>({
	columns,
	data,
	totalRecords,
	loading,
	tClassName,
	tHeaderTRowClassName,
	tHeaderTHeadClassName,
	tCellClassName,
	tRowClassFn,
	onPageChange,
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = React.useState<SortingState>([]);
  
	const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	})
  
	const defaultData = React.useMemo(() => [], []);
  
	const pagination = React.useMemo(
		() => ({
			pageIndex,
			pageSize,
		}),
		[pageIndex, pageSize]
	)
	
	const table = useReactTable({
		data: data ?? defaultData,
		columns,
		pageCount: totalRecords ? Math.ceil(totalRecords / pageSize) : -1,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
			pagination,
		},
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		//getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		onPaginationChange: setPagination,
		manualPagination: true,
		debugTable: false
	});
  
	React.useEffect(() => {
		onPageChange ? onPageChange(pageIndex, pageSize) : console.log("Pagination not implemented");
	}, [ pageIndex, pageSize ])
	
	return (
		<div className='space-y-4'>
			{/* <DataTableToolbar table={table} /> */}
			<div className='rounded-md border-none flex flex-col gap-6'>
				<Table className={cn(tClassName)}>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className={cn(tHeaderTRowClassName)}>
							{headerGroup.headers.map((header) => {
								return (
								<TableHead key={header.id} className={cn(tHeaderTHeadClassName)}>
									{header.isPlaceholder
									? null
									: flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
								</TableHead>
								);
							})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									<div className='flex justify-center mt-7 mb-5'>
										<Loading size={60}/>
									</div>
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row, i) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
								className={tRowClassFn ? tRowClassFn(i) : ""}
								//className={i % 2 === 0 ? 'bg-white' : 'bg-gray-300'}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className={cn(tCellClassName)}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className='h-24 text-center'
							>
								No results.
							</TableCell>	
						</TableRow>
					)}
					</TableBody>
				</Table>
				<DataTablePagination table={table} totalRecords={totalRecords || 0} />
			</div>
		</div>
	);
}
	