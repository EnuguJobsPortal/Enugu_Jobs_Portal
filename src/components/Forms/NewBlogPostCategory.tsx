import ControlledInput from "@/components/shared/ControlledInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import { useCreateNewBlogPostCategory } from "@/hooks/queries/blog";
import { IBlogPostCategoryDTO } from "@/interfaces/dto";
import { blogPostCategoryDefaultValues } from "@/validations/defaults";
import { blogPostCategoryResolver } from "@/validations/resolvers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const NewBlogPostCategory = () => {

    const { showLoading, hideLoading } = useLoading();
    const { showSuccess, showError, showConfirm } = useSweetAlert();
    const { control, handleSubmit, reset, formState: { errors }} = useForm<IBlogPostCategoryDTO>({
        defaultValues: blogPostCategoryDefaultValues, 
        resolver: blogPostCategoryResolver
    });
    const { createNewBlogPostCategory, creatingNewBlogPostCategory } = useCreateNewBlogPostCategory({ 
        onSuccess: (values) => {
            hideLoading();
            showSuccess("Success!!!", values.message);
        }, 
        onError: (message) => {
            hideLoading();
            showError("Attention!!!", message);
        }, 
        onReset: () => {
            reset();
        }
    });

    const handleNewBlogPostCategorySubmit = async (values: IBlogPostCategoryDTO) => {
        const result = await showConfirm("Confirm", "Are you sure you want to create this blog post category?");

        if(result.isConfirmed)
        {
            createNewBlogPostCategory({ payload: values});
        }
    }

    useEffect(() => {
        if(creatingNewBlogPostCategory)
        {
            showLoading();
        }
    }, [ creatingNewBlogPostCategory, showLoading ])

    return (
        <Card className="shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] h-auto mb-10">
            <CardHeader className="border border-b p-4 mb-4">
                <span className="text-[10px] tracking-widest font-bold uppercase">New Blog Post</span>
            </CardHeader>
            <form onSubmit={handleSubmit(handleNewBlogPostCategorySubmit)}>
                <CardContent>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                        <div className="w-full flex-1">
                            <ControlledInput
                                label="Blog Post Category"
                                control={control}
                                name="CategoryName"
                                placeholder="Category Name"
                                type="text"
                                error={errors["CategoryName"]}
                                isRequired
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="bg-blue-800 w-full sm:w-40" type="submit">
                        Submit
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default NewBlogPostCategory;