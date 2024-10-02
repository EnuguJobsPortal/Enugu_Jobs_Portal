import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNotification } from "@/context/NotificationContext";
import { useUpdateMessageStatus } from "@/hooks/queries/messages";
import { IMessageDetailsProps } from "@/interfaces/general";
import moment from "moment";
import { useCallback, useEffect } from "react";

const MessageDetails = ({ 
    message, 
    open, 
    setOpen,
    onReplyClick
}: IMessageDetailsProps) => {
    const { notify } = useNotification();

    const { updateMessage } = useUpdateMessageStatus({ 
        onSuccess: (values) => {
            notify(values.message, { type: 'success', theme: 'colored' });
        }, 
        onError: (value) => {
            notify(value, { type: 'error', theme: 'colored' });
        }
    });

    const handleMessageUpdate = useCallback(() => {
        updateMessage({ payload: null, MessageId: message?.MessageId as unknown as string, Status: "read" })
    }, [ updateMessage, message?.MessageId]);

    useEffect(() => {
        if(message && message.Status === "unread")
        {
            handleMessageUpdate()
        }
    }, [ message, handleMessageUpdate  ])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[950px]">
                <DialogHeader>
                    <DialogTitle>
                        {`${message?.Subject}`}
                        <span className="italic font-normal block text-[10px] mt-2">{moment.unix(message?.DateCreated as unknown as number).format('MMMM Do YYYY, h:mm:ss a')}</span>
                    </DialogTitle>
                </DialogHeader>
                <div className="max-h-[750px] overflow-y-auto">
                    <p className="mb-10">{message?.UserMessage}</p>
                    <span className="font-semibold text-xs mt-10 block">{message?.FullName}</span>
                    <span className="italic text-[10px] block">{message?.Email}</span>
                    <DialogFooter>
                        <Button className="bg-blue-800 w-full sm:w-24 mt-4" type="button" onClick={() => onReplyClick(message?.MessageId as unknown as string)}>
                            <span className="tracking-wider">Reply</span>
                        </Button>
                        <DialogClose>
                            <Button className="bg-white w-full sm:w-24 mt-4 border" type="button" onClick={() => setOpen(false)}>
                                <span className="text-gray-600 tracking-wider hover:text-white">Cancel</span>
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MessageDetails;