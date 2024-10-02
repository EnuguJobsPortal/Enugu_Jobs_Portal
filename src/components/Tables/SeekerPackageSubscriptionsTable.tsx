import { DataTable } from "@/components/Tables/DataTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useSeekerPackageSubscriptionsColumns from "@/hooks/columns/useSeekerPackageSubscriptionsColumns";
import { useGetAllSeekerPackageSubscriptions } from "@/hooks/queries/packages";

const SeekerPackageSubscriptionsTable = () => {
    const { 
        seekerPackageSubscriptionsColumns, 
        onPageChange, 
        pagination
    } = useSeekerPackageSubscriptionsColumns();

    const { seekerPackageSubscriptions, loadingSeekerPackageSubscriptions } = useGetAllSeekerPackageSubscriptions({ params: {
        PageSize: pagination.pageSize,
        PageNumber: pagination.pageIndex + 1
    }});

	return (
		<>
            <Card className="shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] h-auto mb-10">
                <CardHeader className="border border-b p-4 mb-4">
                    <span className="text-[10px] tracking-widest font-bold uppercase">Seeker Packages</span>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={seekerPackageSubscriptionsColumns} 
                        data={seekerPackageSubscriptions?.data || []}
                        loading={loadingSeekerPackageSubscriptions}
                        tClassName='border-none border-collapse'
                        tHeaderTRowClassName="bg-[#1E83F0] bg-opacity-20"
                        tHeaderTHeadClassName="text-[#3980ce] text-[11px] tracking-wide font-[400]"
                        tCellClassName="text-xs font-sans"
                        totalRecords={seekerPackageSubscriptions?.totalrecords}
                        onPageChange={onPageChange}
                    />
                </CardContent>
            </Card>
        </>
	)
}

export default SeekerPackageSubscriptionsTable;