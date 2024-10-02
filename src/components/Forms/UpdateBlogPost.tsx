import ControlledEditor from "@/components/shared/ControlledEditor";
import ControlledInput from "@/components/shared/ControlledInput";
import ControlledSelect from "@/components/shared/ControlledSelect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLoading } from "@/context/LoadingContext";
import { useNotification } from "@/context/NotificationContext";
import { useGetAllBlogPostCategories, useUpdateBlogPosts } from "@/hooks/queries/blog";
import { SelectOption } from "@/interfaces/controlnput.interface";
import { IBlogPostUpdateDTO } from "@/interfaces/dto";
import { IBlogPostUpdateFormProps } from "@/interfaces/formProps.interface";
import { blogPostUpdateDefaultValues } from "@/validations/defaults";
import { blogPostUpdateResolver } from "@/validations/resolvers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UpdateBlogPost = ({ blogData, open, setOpen }: IBlogPostUpdateFormProps) => {
    const { notify } = useNotification();
    const { showLoading, hideLoading } = useLoading();
    const { loadingBlogPostCategories, blogPostCategories } = useGetAllBlogPostCategories({ params: {}})
    const { updateBlogPost, updatingBlogPost } = useUpdateBlogPosts({ 
        onSuccess: (values) => {
            hideLoading();
            notify(values.message, { type: 'success', theme: 'colored' });
            setOpen(false);
        }, 
        onError: (value) => {
            hideLoading();
            notify(value, { type: 'error', theme: 'colored' });
        }
    });

    const { control, handleSubmit, setValue, formState: { errors }} = useForm<IBlogPostUpdateDTO>({
        defaultValues: blogPostUpdateDefaultValues, 
        resolver: blogPostUpdateResolver
    });

    const handleBlogPostUpdate = (values: IBlogPostUpdateDTO) => {
        const payload = new FormData();

        payload.append("NewsTitle", values.NewsTitle);
        payload.append("NewsTags", values.NewsTags);
        payload.append("NewsCategoryId", values.NewsCategoryId);
        payload.append("CoverImage", values.CoverImage || "");
        payload.append("NewsBody", values.NewsBody);

        updateBlogPost({ payload, id: blogData?.NewsId as unknown as string })
    }

    const blogPostCategoriesEnum: SelectOption[] = blogPostCategories ? blogPostCategories?.data.map((category) => (
        { label: `${category.CategoryName}`, value: `${category.NewsCategoryId}`}
    )): [];

    useEffect(() => {
        if(updatingBlogPost)
        {
            showLoading();
        }
    }, [ updatingBlogPost, showLoading])

    useEffect(() => {
        if(blogData)
        {
            const fields = Object.keys(
                blogPostUpdateDefaultValues
            ) as (keyof typeof blogPostUpdateDefaultValues)[];

            fields.forEach((field) => {
                if (field === "NewsTitle") {
                  setValue(field, blogData?.NewsTitle);
                }
                if (field === "NewsStatus") {
                  setValue(field, blogData?.NewsStatus);
                }
                if (field === "NewsCategoryId") {
                  setValue(field, String(blogData?.NewsCategoryId) || "");
                }
                if (field === "NewsBody") {
                    setValue(field, blogData?.NewsBody || "");
                }
                if (field === "NewsTags") {
                    setValue(field, blogData?.NewsTags || "");
                }
            });
        }
    }, [blogData, setValue]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[950px]">
                <DialogHeader>
                    <DialogTitle>{`${blogData?.NewsTitle}`}</DialogTitle>
                    <DialogDescription>
                        All field marked * are required
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[750px] overflow-y-auto">
                    <form onSubmit={handleSubmit(handleBlogPostUpdate)}>
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
                            <div className="w-full flex-1">
                                <ControlledSelect
                                    label="Blog Status"
                                    control={control}
                                    name="NewsStatus"
                                    placeholder="Please Select"
                                    error={errors["NewsStatus"]}
                                    options={[
                                        { label: "Published", value: "Published"},
                                        { label: "Unpublished", value: "Unpublished"},
                                    ]}
                                    isRequired
                                    allowEmpty
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
                                    accept="image/*"
                                    error={errors["CoverImage"]}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button className="bg-blue-800 w-full sm:w-24 mt-4" type="submit">
                                <span className="tracking-wider">Submit</span>
                            </Button>
                            <DialogClose>
                                <Button className="bg-white w-full sm:w-24 mt-4 border" type="button" onClick={() => setOpen(false)}>
                                    <span className="text-gray-600 tracking-wider hover:text-white">Cancel</span>
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateBlogPost;