import MessageDetails from "@/components/Modals/MessageDetails";
import ReplyMessage from "@/components/Modals/ReplyMessage";
import { DataTable } from "@/components/Tables/DataTable";
import SelectDropDown from "@/components/shared/SelectDropdown";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MESSAGE_STATUS } from "@/const/options";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import useMessageColumns from "@/hooks/columns/useMessageColumns";
import { useGetAllMessages, useRemoveMessage } from "@/hooks/queries/messages";
import { useCallback, useEffect, useState } from 'react';

const MessagesTableView = () => {

    const { showLoading, hideLoading } = useLoading();
    const { showConfirm, showError, showSuccess } = useSweetAlert();
    const [selectedMessageStatus, setSelectedMessageStatus] = useState<string>("");
    const { removeMessage, removingMessage } = useRemoveMessage({ 
        onSuccess: (data) => {
            hideLoading();
            showSuccess("Success!!!", data.message);
        }, 
        onError: (message) => {
            hideLoading();
            showError("Attention!!!", message);
        }
    });

    const handleDeleteMessage = useCallback(async (message_id: string) => {
        const result = await showConfirm("Confirm", "Are you sure you want to delete this message?");

        if(result.isConfirmed)
        {
            removeMessage({ message_id })
        }
    }, [ removeMessage, showConfirm ])

    const { 
        messageColumns, 
        onPageChange, 
        pagination,
        selectedMessage,
        selectedMessageID,
        setSelectedMessageID,
        openMessageDetailsDialog,
        setOpenMessageDetailsDialog,
        openReplyModal,
        setOpenReplyModal
    } = useMessageColumns({ handleDeleteMessage });

    const handleReplyClick = (messageID: string) => {
        setSelectedMessageID(messageID);
        setOpenReplyModal(true);
    }

    const { messages, loadingMessages } = useGetAllMessages({
        params: {
            Status: selectedMessageStatus,
            PageNumber: pagination.pageIndex + 1,
            PageSize: pagination.pageSize
        }
    });

    useEffect(() => {
        if(removingMessage)
        {
            showLoading();
        }
    }, [removingMessage, showLoading])

	return (
        <>
            <Card className="rounded-xl font-poppins bg-neutral-white w-full px-4 py-4 shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] mb-10">
				<CardHeader className="flex flex-col lg:flex-row flex-wrap items-center justify-between gap-8 pt-0 pb-2 w-full mb-4">
                    <span className="uppercase text-xs font-bold tracking-widest">Messages</span>
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-2">
                        <div className="w-full flex-1">
                            <SelectDropDown
                                selected={selectedMessageStatus}
                                onChange={setSelectedMessageStatus}
                                placeholder="MESSAGE STATUS"
                                options={MESSAGE_STATUS}
                                className="p-6 rounded-2xl uppercase text-[9px] justify-center text-center lg:justify-start lg:text-center"
                                allowEmpty
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={messageColumns} 
                        data={messages?.data || []}
                        loading={loadingMessages}
                        tClassName='border-none border-collapse'
                        tHeaderTRowClassName="bg-[#1E83F0] bg-opacity-20"
                        tHeaderTHeadClassName="text-[#3980ce] text-[11px] tracking-wide font-[400]"
                        tCellClassName="text-xs font-normal"
                        totalRecords={messages?.totalrecords}
                        onPageChange={onPageChange}
                    />
                </CardContent>
            </Card>

            <ReplyMessage
                open={openReplyModal}
                setOpen={setOpenReplyModal}
                messageID={selectedMessageID}
                setMessageID={setSelectedMessageID}
            />

            <MessageDetails
                open={openMessageDetailsDialog}
                setOpen={setOpenMessageDetailsDialog}
                message={selectedMessage}
                onReplyClick={handleReplyClick}
            />
        </>
	)
}

export default MessagesTableView;