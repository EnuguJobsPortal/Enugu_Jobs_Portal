import UpdateSeekerPackage from "@/components/Forms/UpdateSeekerPackage";
import { DataTable } from "@/components/Tables/DataTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import useSeekerPackageColumns from "@/hooks/columns/useSeekerPackageColumns";
import { useGetAllSeekerPackages, useRemoveSeekerPackage } from "@/hooks/queries/packages";
import { useCallback, useEffect } from "react";

const EmployerPackageTable = () => {
    const { showConfirm, showError, showSuccess } = useSweetAlert();
    const { showLoading, hideLoading } = useLoading();
    const { removeSeekerPackage, removingSeekerPackage } = useRemoveSeekerPackage({ 
        onSuccess: (data) => {
            hideLoading();
            showSuccess("Success!!!", data.message);
        }, 
        onError: (message) => {
            hideLoading();
            showError("Attention!!!", message);
        }
    })

	const handleDeletePackage = useCallback(async (packageID:number) => {
		const result = await showConfirm("Confirm!!!", "Are you sure you want to delete this package?");

        if(result.isConfirmed)
        {
            removeSeekerPackage({ packageid: String(packageID) });
        }
	}, [ removeSeekerPackage, showConfirm ]);

    const { 
        seekerPackageColumns, 
        pkg, 
        onPageChange, 
        pagination, 
        showUpdateModal, 
        setShowUpdateModal
    } = useSeekerPackageColumns({ handleDeletePackage });

    const { loadingSeekerPackages, seekerPackages } = useGetAllSeekerPackages({ params: {
        PageSize: pagination.pageSize,
        PageNumber: pagination.pageIndex + 1
    }});

    useEffect(() => {
        if(removingSeekerPackage)
        {
            showLoading();
        }
    }, [ removingSeekerPackage, showLoading ])


	return (
		<>
            <Card className="shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] h-auto mt-10 mb-10">
                <CardHeader className="border border-b p-4 mb-4">
                    <span className="text-[10px] tracking-widest font-bold uppercase">Seeker Packages</span>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={seekerPackageColumns} 
                        data={seekerPackages?.data || []}
                        loading={loadingSeekerPackages}
                        tClassName='border-none border-collapse'
                        tHeaderTRowClassName="bg-[#1E83F0] bg-opacity-20"
                        tHeaderTHeadClassName="text-[#3980ce] text-[11px] tracking-wide font-[400]"
                        tCellClassName="text-xs font-sans"
                        totalRecords={seekerPackages?.totalrecords}
                        onPageChange={onPageChange}
                    />
                </CardContent>
            </Card>
        
            <UpdateSeekerPackage
                open={showUpdateModal}
                setOpen={setShowUpdateModal}
                pkgData={pkg}
            />
        </>
	)
}

export default EmployerPackageTable;