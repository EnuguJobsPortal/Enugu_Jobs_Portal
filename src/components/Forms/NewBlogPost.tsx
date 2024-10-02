import ControlledEditor from "@/components/shared/ControlledEditor";
import ControlledInput from "@/components/shared/ControlledInput";
import ControlledSelect from "@/components/shared/ControlledSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import { useCreateNewBlogPost, useGetAllBlogPostCategories } from "@/hooks/queries/blog";
import useAuth from "@/hooks/useAuth";
import { SelectOption } from "@/interfaces/controlnput.interface";
import { IBlogPostDTO } from "@/interfaces/dto";
import { blogPostDefaultValues } from "@/validations/defaults";
import { blogPostResolver } from "@/validations/resolvers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const NewBlogPost = () => {

    const { loggedUser } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    const { showSuccess, showError, showConfirm } = useSweetAlert();
    const { control, handleSubmit, reset, formState: { errors }} = useForm<IBlogPostDTO>({
        defaultValues: blogPostDefaultValues, 
        resolver: blogPostResolver
    });
    const { loadingBlogPostCategories, blogPostCategories } = useGetAllBlogPostCategories({ params: {}})
    const { createNewBlogPost, creatingNewBlogPost } = useCreateNewBlogPost({ 
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

    const handleNewBlogPostSubmit = async (values: IBlogPostDTO) => {
        const result = await showConfirm("Confirm", "Are you sure you want to create this blog post?");

        if(result.isConfirmed)
        {
            const payload = new FormData();

            payload.append("AuthorId", loggedUser.UserAccountID as unknown as string);
            payload.append("CoverImage", values.CoverImage);
            payload.append("NewsTitle", values.NewsTitle);
            payload.append("NewsTags", values.NewsTags);
            payload.append("NewsCategoryId", values.NewsCategoryId);
            payload.append("NewsBody", values.NewsBody);
            
            createNewBlogPost({ payload })
        }
    }

    const blogPostCategoriesEnum: SelectOption[] = blogPostCategories ? blogPostCategories?.data.map((category) => (
        { label: `${category.CategoryName}`, value: `${category.NewsCategoryId}`}
    )): [];

    useEffect(() => {
        if(creatingNewBlogPost)
        {
            showLoading();
        }
    }, [ creatingNewBlogPost, showLoading ])

    return (
        <Card className="shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] h-auto mb-10">
            <CardHeader className="border border-b p-4 mb-4">
                <span className="text-[10px] tracking-widest font-bold uppercase">New Blog Post</span>
            </CardHeader>
            <form onSubmit={handleSubmit(handleNewBlogPostSubmit)}>
                <CardContent>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                        <div className="w-full flex-1">
                            <ControlledSelect
                                label="Blog Category"
                                control={control}
                                name="NewsCategoryId"
                                placeholder="Please Select"
                                error={errors["NewsCategoryId"]}
                                options={blogPostCategoriesEnum}
                                isLoading={loadingBlogPostCategories}
                                isRequired
                                allowEmpty
                            />
                        </div>
                        <div className="w-full flex-1">
                            <ControlledInput
                                label="Blog Title"
                                control={control}
                                name="NewsTitle"
                                placeholder="Blog Title"
                                type="text"
                                error={errors["NewsTitle"]}
                                isRequired
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                        <div className="w-full flex-1">
                            <ControlledEditor
                                label="Blog Body"
                                control={control}
                                name="NewsBody"
                                error={errors["NewsBody"]}
                                isRequired
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                        <div className="w-full flex-1">
                            <ControlledInput
                                label="Blog Tags"
                                control={control}
                                name="NewsTags"
                                placeholder="Comma Separated Values"
                                type="text"
                                error={errors["NewsTags"]}
                                isRequired
                            />
                        </div>
                        <div className="w-full flex-1">
                            <ControlledInput
                                label="Cover Image (png, jpg)"
                                control={control}
                                name="CoverImage"
                                placeholder="Not More Than 5MB"
                                type="file"
                                error={errors["CoverImage"]}
                                accept="image/*"
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

export default NewBlogPost;