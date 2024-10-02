import { DataTable } from "@/components/Tables/DataTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import useMailingListColumns from "@/hooks/columns/useMailingListColumns";
import { useGetMailingList, useRemoveSubscriber } from "@/hooks/queries/messages";
import { useCallback, useEffect } from 'react';

const MailingListTableView = () => {

    const { showLoading, hideLoading } = useLoading();
    const { showConfirm, showError, showSuccess } = useSweetAlert();
    const { removeSubscriber, removingSubscriber } = useRemoveSubscriber({ 
        onSuccess: (data) => {
            hideLoading();
            showSuccess("Success!!!", data.message);
        }, 
        onError: (message) => {
            hideLoading();
            showError("Attention!!!", message);
        }
    });

    const handleRemoveSubscriber = useCallback(async (email: string) => {
        const result = await showConfirm("Confirm", "Are you sure you want to delete this subscriber from the mailing list?");

        if(result.isConfirmed)
        {
            removeSubscriber({ email })
        }
    }, [ removeSubscriber, showConfirm ]);

    const { 
        mailingListColumns, 
        onPageChange, 
        pagination
    } = useMailingListColumns({ handleRemoveSubscriber });

    const { mailingList, loadingMailingList } = useGetMailingList({
        params: {
            PageNumber: pagination.pageIndex + 1,
            PageSize: pagination.pageSize
        }
    });

    useEffect(() => {
        if(removingSubscriber)
        {
            showLoading();
        }
    }, [removingSubscriber, showLoading])

	return (
        <Card className="rounded-xl font-poppins bg-neutral-white w-full px-4 py-4 shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] mb-6">
            <CardHeader className="flex flex-col lg:flex-row flex-wrap items-center justify-between gap-8 p-6 w-full">
                <span className="uppercase text-xs font-bold tracking-widest">Mailing List</span>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={mailingListColumns} 
                    data={mailingList?.data || []}
                    loading={loadingMailingList}
                    tClassName='border-none border-collapse'
                    tHeaderTRowClassName="bg-[#1E83F0] bg-opacity-20"
                    tHeaderTHeadClassName="text-[#3980ce] text-[11px] tracking-wide font-[400]"
                    tCellClassName="text-xs font-normal"
                    totalRecords={mailingList?.totalrecords}
                    onPageChange={onPageChange}
                />
            </CardContent>
        </Card>
	)
}

export default MailingListTableView;