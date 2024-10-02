import ControlledInput from "@/components/shared/ControlledInput";
import ControlledSelect from "@/components/shared/ControlledSelect";
import ControlledTextArea from "@/components/shared/ControlledTextArea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLoading } from "@/context/LoadingContext";
import { useNotification } from "@/context/NotificationContext";
import { useUpdateBlogComment } from "@/hooks/queries/blog";
import { IBlogCommentUpdateDTO } from "@/interfaces/dto";
import { IBlogCommentUpdateFormProps } from "@/interfaces/formProps.interface";
import { blogCommentUpdateDefaultValues } from "@/validations/defaults";
import { blogCommentUpdateResolver } from "@/validations/resolvers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UpdateBlogComment = ({ comment, open, setOpen }: IBlogCommentUpdateFormProps) => {
    const { notify } = useNotification();
    const { showLoading, hideLoading } = useLoading();
    const { updateBlogComment, updatingBlogComment } = useUpdateBlogComment({ 
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

    const { control, handleSubmit, setValue, formState: { errors }} = useForm<IBlogCommentUpdateDTO>({
        defaultValues: blogCommentUpdateDefaultValues, 
        resolver: blogCommentUpdateResolver
    });

    const handleBlogCommentUpdate = (values: IBlogCommentUpdateDTO) => {
        updateBlogComment({ payload: values })
    }

    useEffect(() => {
        if(updatingBlogComment)
        {
            showLoading();
        }
    }, [ updatingBlogComment, showLoading ])

    useEffect(() => {
        if(comment)
        {
            const fields = Object.keys(
                blogCommentUpdateDefaultValues
            ) as (keyof typeof blogCommentUpdateDefaultValues)[];

            fields.forEach((field) => {
                if (field === "NewsCommentID") {
                    setValue(field, comment?.NewsCommentId);
                }
                if (field === "NewsComment") {
                    setValue(field, comment?.NewsComment);
                }
                if (field === "NewsCommentStatus") {
                    setValue(field, comment?.NewsCommentStatus);
                }
            });
        }
    }, [ comment, setValue ])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[950px]">
                <DialogHeader>
                    <DialogTitle>{`${comment?.NewsTitle}`}</DialogTitle>
                    <DialogDescription>
                        All field marked * are required
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[750px] overflow-y-auto p-2">
                    <form onSubmit={handleSubmit(handleBlogCommentUpdate)}>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                            <div className="w-full flex-1">
                                <ControlledSelect
                                    label="Blog Comment Status"
                                    control={control}
                                    name="NewsCommentStatus"
                                    placeholder="Please Select"
                                    error={errors["NewsCommentStatus"]}
                                    options={[
                                        { label: 'Published', value: 'Published'},
                                        { label: 'Unpublished', value: 'Unpublished'},
                                    ]}
                                    isRequired
                                    allowEmpty
                                />
                                <ControlledInput
                                    control={control}
                                    name="NewsCommentID"
                                    placeholder="NewsCommentID"
                                    type="hidden"
                                    error={errors["NewsCommentID"]}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                            <div className="w-full flex-1">
                                <ControlledTextArea
                                    label="Blog Comment"
                                    control={control}
                                    name="NewsComment"
                                    placeholder="Update Blog Comment"
                                    error={errors["NewsComment"]}
                                    isRequired
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

export default UpdateBlogComment;