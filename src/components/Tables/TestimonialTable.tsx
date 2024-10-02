import TestimonyDetails from "@/components/Modals/TestimonyDetails";
import { DataTable } from "@/components/Tables/DataTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import useTestimonialsColumns from "@/hooks/columns/useTestimonialColumns";
import { useGetAllTestimonials, useRemoveTestimony } from "@/hooks/queries/testimonials";
import { useCallback, useEffect } from "react";

const TestimonialTable = () => {

	const { showLoading, hideLoading } = useLoading();
	const { showSuccess, showConfirm, showError } = useSweetAlert();

	const { removeTestimony, removingTestimony } = useRemoveTestimony({ 
        onSuccess: (data) => {
            hideLoading();
            showSuccess("Success!!!", data.message);
        }, 
        onError: (message) => {
            hideLoading();
            showError("Attention!!!", message);
        }
    });

    const handleDeleteTestimony = useCallback(async (testimonyid: string) => {
        const result = await showConfirm("Confirm", "Are you sure you want to delete this testimony?");

        if(result.isConfirmed)
        {
            removeTestimony({ testimonyid })
        }
    }, [ removeTestimony, showConfirm ]);

	const { 
        testimonialColumns, 
        testimony, 
        onPageChange, 
        pagination, 
        openModal, 
        setOpenModal
    } = useTestimonialsColumns({ handleDeleteTestimony });

	const { testimonials, isLoading } = useGetAllTestimonials({ params: {
		PageNumber: pagination.pageIndex + 1,
		PageSize: pagination.pageSize
	}});

	useEffect(() => {
		if(removingTestimony)
		{
			showLoading();
		}
	}, [ removingTestimony, showLoading])

	return (
			
		<>
			<Card className="shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] h-auto mb-10">
                <CardHeader className="border border-b p-4 mb-4">
                    <span className="text-[10px] tracking-widest font-bold uppercase">Testimonials</span>
                </CardHeader>
                <CardContent>
					<DataTable
						columns={testimonialColumns} 
						data={testimonials?.data || []}
						loading={isLoading}
						tClassName='border-none border-collapse'
						tHeaderTRowClassName="bg-[#1E83F0] bg-opacity-20"
						tHeaderTHeadClassName="text-[#3980ce] text-[11px] tracking-wide font-[400]"
						tCellClassName="text-xs font-"
						totalRecords={testimonials?.totalrecords}
						onPageChange={onPageChange}
					/>
                </CardContent>
            </Card>

			<TestimonyDetails
				open={openModal}
				setOpen={setOpenModal}
				testimony={testimony}
			/>
		</>
	)
}

export default TestimonialTable;