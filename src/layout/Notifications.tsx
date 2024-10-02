import MessageDetails from "@/components/Modals/MessageDetails";
import ReplyMessage from "@/components/Modals/ReplyMessage";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useGetAllMessages } from "@/hooks/queries/messages";
import { IContactMessageResponse } from "@/interfaces/response.interface";
import { Bell, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";

const Notifications = () => {
	const [selectedMessageID, setSelectedMessageID] = useState<string | null>(null);
    const [selectedMessage, setSelectedMessage] = useState<IContactMessageResponse | undefined>(undefined);
    const [ openReplyModal, setOpenReplyModal ] = useState<boolean>(false);
    const [ openMessageDetailsDialog, setOpenMessageDetailsDialog ] = useState<boolean>(false);
	const { messages, loadingMessages } = useGetAllMessages({
		params: {
			Status: "unread"
		}
	});

	const handleReplyClick = (messageID: string) => {
        setSelectedMessageID(messageID);
        setOpenReplyModal(true);
    }

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<div className="relative">
						<Button variant="outline" size="icon" className="rounded-full">
							<Bell className="h-4 w-4" />
						</Button>
						{ messages && messages.count > 0 && (
							<div className="absolute top-0 right-0 bg-red-500 text-white w-3 h-3 flex items-center justify-center rounded-full p-2">
								<span className="text-[9px]">{messages.count}</span>
							</div>
						)}
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex justify-center items-center space-y-1">
							{ messages && messages.count === 1 ? (
								<p className="text-sm font-medium leading-none">1 Unread Message</p>
							) : messages && messages.count === 0 ? (
								<p className="text-sm font-medium leading-none">No Unread Messages</p>
							) : (
								<p className="text-sm font-medium leading-none">{messages?.count} Unread Messages</p>
							)}
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						{ loadingMessages ? (
							<DropdownMenuItem>
								<span className="text-[8px] italic">Please wait...</span>
								<DropdownMenuShortcut>
									<ShieldCheck className="w-3 h-3"/>
								</DropdownMenuShortcut>
							</DropdownMenuItem>
						) : messages && messages.count > 0 ? messages.data.map((message, i) => (
							<DropdownMenuItem 
								key={i} 
								onClick={() => {
									setSelectedMessage(message);
									setOpenMessageDetailsDialog(true);
								}}
							>
								{ message.Subject}
								<DropdownMenuShortcut>
									<Mail className="w-3 h-3"/>
								</DropdownMenuShortcut>
							</DropdownMenuItem>
						)) : (
							null
						)}
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			
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

export default Notifications;