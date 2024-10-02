import UpdateEmployerPackage from "@/components/Forms/UpdateEmployerPackage";
import { DataTable } from "@/components/Tables/DataTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import useEmployerPackageColumns from "@/hooks/columns/useEmployerPackageColumns";
import { useGetAllJobPackages } from "@/hooks/queries/jobs";
import { useRemoveEmployerPackage } from "@/hooks/queries/packages";
import { useCallback, useEffect } from "react";

const EmployerPackageTable = () => {
    const { showConfirm, showError, showSuccess } = useSweetAlert();
    const { showLoading, hideLoading } = useLoading();
    const { removeEmployerPackage, removingEmployerPackage } = useRemoveEmployerPackage({ 
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
            removeEmployerPackage({ packageid: String(packageID) });
        }
	}, [ showConfirm, removeEmployerPackage ]);

    const { 
        employerPackageColumns, 
        pkg, 
        onPageChange, 
        pagination, 
        showUpdateModal, 
        setShowUpdateModal
    } = useEmployerPackageColumns({ handleDeletePackage });

    const { loadingJobPackages, jobPackages } = useGetAllJobPackages({ params: {
        PageSize: pagination.pageSize,
        PageNumber: pagination.pageIndex + 1
    }});

    useEffect(() => {
        if(removingEmployerPackage)
        {
            showLoading();
        }
    }, [ removingEmployerPackage, showLoading ])

	return (
		<>
            <Card className="shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] h-auto mt-10 mb-10">
                <CardHeader className="border border-b p-4 mb-4">
                    <span className="text-[10px] tracking-widest font-bold uppercase">Employer Packages</span>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={employerPackageColumns} 
                        data={jobPackages?.data || []}
                        loading={loadingJobPackages}
                        tClassName='border-none border-collapse'
                        tHeaderTRowClassName="bg-[#1E83F0] bg-opacity-20"
                        tHeaderTHeadClassName="text-[#3980ce] text-[11px] tracking-wide font-[400]"
                        tCellClassName="text-xs font-sans"
                        totalRecords={jobPackages?.data.length}
                        onPageChange={onPageChange}
                    />
                </CardContent>
            </Card>
            
            <UpdateEmployerPackage
                open={showUpdateModal}
                setOpen={setShowUpdateModal}
                pkgData={pkg}
            />
        </>
	)
}

export default EmployerPackageTable;