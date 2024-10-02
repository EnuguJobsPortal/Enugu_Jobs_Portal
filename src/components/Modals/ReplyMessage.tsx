import ControlledInput from "@/components/shared/ControlledInput";
import ControlledTextArea from "@/components/shared/ControlledTextArea";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { useLoading } from "@/context/LoadingContext";
import { useNotification } from "@/context/NotificationContext";
import { useReplyMessage } from "@/hooks/queries/messages";
import { IReplyMessageDTO } from "@/interfaces/dto";
import { replyMessageDefaultValues } from "@/validations/defaults";
import { replyMessageResolver } from "@/validations/resolvers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ReplyMessage({ 
    open, 
    setOpen, 
    messageID, 
    setMessageID
} : {
    messageID: string | null;
    setMessageID: React.Dispatch<React.SetStateAction<string | null>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { notify } = useNotification();
    const {showLoading, hideLoading} = useLoading();
    const { control, handleSubmit, setValue, reset, formState: { errors }} = useForm<IReplyMessageDTO>({
        defaultValues: replyMessageDefaultValues, 
        resolver: replyMessageResolver
    })
    const { replyMessage, replyingMessage} = useReplyMessage({
        onSuccess: (values) => {
            hideLoading();
            notify(values.message, { type: "success", theme: "colored" });
            setMessageID(null);
            setOpen(false);
        },
        onError: (message) => {
            hideLoading();
            notify(message, { type: "error", theme: "colored" });
        },
        onReset: () => {
            reset();
        }
    })
    const onSubmitReply = (values: IReplyMessageDTO) => {
        if(!values.messageID)
        {
            notify("Invalid Request", { type: "error", theme: "colored" });
            return false;
        }

        replyMessage({ payload: values })
    }

    useEffect(() => {
        if(replyingMessage)
        {
            showLoading();
        }
    }, [ replyingMessage, showLoading ])

    useEffect(() => {

        if(messageID)
        {
            const fields = Object.keys(
                replyMessageDefaultValues
            ) as (keyof typeof replyMessageDefaultValues)[];
    
            fields.forEach((field) => {
                if (field === "messageID") {
                  setValue(field, messageID);
                }
            });
        }

    }, [ messageID, setValue ])
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="uppercase text-center">Reply Message</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmitReply)}>
                    <div className="grid gap-4 py-4">
                        <ControlledInput
                            control={control}
                            name="subject"
                            placeholder="MESSAGE SUBJECT"
                            error={errors['subject']}
                            isRequired
                        />
                        <ControlledTextArea
                            control={control}
                            name="body"
                            label="MESSAGE BODY"
                            placeholder="Message"
                            error={errors['body']}
                            cols={10}
                            rows={10}
                        />
                        <div className="hidden">
                            <ControlledInput
                                control={control}
                                name="messageID"
                                placeholder="MESSAGE ID"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button className="w-full text-center bg-[#1FD951] text-white" type="submit">SUBMIT</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
