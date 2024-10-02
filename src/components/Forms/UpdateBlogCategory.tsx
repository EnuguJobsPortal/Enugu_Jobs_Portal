import ControlledInput from "@/components/shared/ControlledInput";
import ControlledSelect from "@/components/shared/ControlledSelect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLoading } from "@/context/LoadingContext";
import { useNotification } from "@/context/NotificationContext";
import { useUpdateBlogPostCategory } from "@/hooks/queries/blog";
import { IBlogPostCategoryUpdateDTO } from "@/interfaces/dto";
import { IBlogPostCategoryUpdateFormProps } from "@/interfaces/formProps.interface";
import { blogPostCategoryUpdateDefaultValues } from "@/validations/defaults";
import { blogPostCategoryUpdateResolver } from "@/validations/resolvers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UpdateBlogCategory = ({ blogCategoryData, open, setOpen }: IBlogPostCategoryUpdateFormProps) => {
    const { notify } = useNotification();
    const { showLoading, hideLoading } = useLoading();
    const { updateBlogPostCategory, updatingBlogPostCategory } = useUpdateBlogPostCategory({ 
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

    const { control, handleSubmit, setValue, formState: { errors }} = useForm<IBlogPostCategoryUpdateDTO>({
        defaultValues: blogPostCategoryUpdateDefaultValues, 
        resolver: blogPostCategoryUpdateResolver
    });

    const handleBlogPostCategoryUpdate = (values: IBlogPostCategoryUpdateDTO) => {
        updateBlogPostCategory({ payload: values })
    }

    useEffect(() => {
        if(updatingBlogPostCategory)
        {
            showLoading();
        }
    }, [ updatingBlogPostCategory, showLoading ])

    useEffect(() => {
        if(blogCategoryData)
        {
            const fields = Object.keys(
                blogPostCategoryUpdateDefaultValues
            ) as (keyof typeof blogPostCategoryUpdateDefaultValues)[];

            fields.forEach((field) => {
                if (field === "NewsCategoryId") {
                    setValue(field, blogCategoryData?.NewsCategoryId);
                }
                if (field === "CategoryName") {
                    setValue(field, blogCategoryData?.CategoryName);
                }
                if (field === "CategoryStatus") {
                    setValue(field, blogCategoryData?.CategoryStatus);
                }
            });
        }
    }, [ blogCategoryData, setValue ])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[950px]">
                <DialogHeader>
                    <DialogTitle>{`${blogCategoryData?.CategoryName}`}</DialogTitle>
                    <DialogDescription>
                        All field marked * are required
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[750px] overflow-y-auto">
                    <form onSubmit={handleSubmit(handleBlogPostCategoryUpdate)}>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                            <div className="w-full flex-1">
                                <ControlledInput
                                    label="Category Name"
                                    control={control}
                                    name="CategoryName"
                                    placeholder="Category Name"
                                    type="text"
                                    error={errors["CategoryName"]}
                                    isRequired
                                />
                            </div>
                            <div className="w-full flex-1">
                                <ControlledSelect
                                    label="Category Status"
                                    control={control}
                                    name="CategoryStatus"
                                    placeholder="Please Select"
                                    error={errors["CategoryStatus"]}
                                    options={[
                                        { label: 'Active', value: 'Active'},
                                        { label: 'Inactive', value: 'Inactive'},
                                    ]}
                                    isRequired
                                    allowEmpty
                                />
                                <ControlledInput
                                    control={control}
                                    name="NewsCategoryId"
                                    placeholder="Category Name"
                                    type="hidden"
                                    error={errors["NewsCategoryId"]}
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

export default UpdateBlogCategory;