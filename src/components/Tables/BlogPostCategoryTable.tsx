import UpdateBlogCategory from "@/components/Forms/UpdateBlogCategory";
import { DataTable } from "@/components/Tables/DataTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import useBlogPostCategoryColumns from "@/hooks/columns/useBlogPostCategoryColumns";
import { useGetAllBlogPostCategories, useRemoveBlogPostCategory } from "@/hooks/queries/blog";
import { useCallback, useEffect } from "react";

const BlogPostCategoryTable = () => {
    const { showConfirm, showError, showSuccess } = useSweetAlert();
    const { showLoading, hideLoading } = useLoading();
    const { removeBlogPostCategory, removingBlogPostCategory } = useRemoveBlogPostCategory({ 
        onSuccess: (data) => {
            hideLoading();
            showSuccess("Success!!!", data.message);
        }, 
        onError: (message) => {
            hideLoading();
            showError("Attention!!!", message);
        }
    })

	const handleDeleteBlogPostCategory = useCallback(async (categoryID:number) => {
		const result = await showConfirm("Confirm!!!", "Are you sure you want to delete this blog post category?: Note this action is irreversible?");

        if(result.isConfirmed)
        {
            removeBlogPostCategory({ categoryid: String(categoryID) });
        }
	}, [ removeBlogPostCategory, showConfirm ])

    const { 
        blogPostCategoryColumns, 
        blogCategory, 
        onPageChange, 
        pagination, 
        showUpdateModal, 
        setShowUpdateModal
    } = useBlogPostCategoryColumns({ handleDeleteBlogPostCategory });

    const { loadingBlogPostCategories, blogPostCategories } = useGetAllBlogPostCategories({ params: {
        PageSize: pagination.pageSize,
        PageNumber: pagination.pageIndex + 1
    }});

    useEffect(() => {
        if(removingBlogPostCategory)
        {
            showLoading();
        }
    }, [ removingBlogPostCategory, showLoading ]);

	return (
		<>
            <Card className="shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] h-auto mt-10 mb-10">
                <CardHeader className="border border-b p-4 mb-4">
                    <span className="text-[10px] tracking-widest font-bold uppercase">Blog Categories</span>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={blogPostCategoryColumns} 
                        data={blogPostCategories?.data || []}
                        loading={loadingBlogPostCategories}
                        tClassName='border-none border-collapse'
                        tHeaderTRowClassName="bg-[#1E83F0] bg-opacity-20"
                        tHeaderTHeadClassName="text-[#3980ce] text-[11px] tracking-wide font-[400]"
                        tCellClassName="text-xs font-sans"
                        totalRecords={blogPostCategories?.totalrecords}
                        onPageChange={onPageChange}
                    />
                </CardContent>
            </Card>
    
            <UpdateBlogCategory
                open={showUpdateModal}
                setOpen={setShowUpdateModal}
                blogCategoryData={blogCategory}
            />
        </>
	)
}

export default BlogPostCategoryTable;