import { useNotification } from "@/context/NotificationContext";
import { UseErrorQueryHandlerProps } from "@/interfaces/general";
import React from "react";


function useErrorQueryHandler({ message, error, isSuccess, isError }: UseErrorQueryHandlerProps) {
	const { notify } = useNotification();

	React.useEffect(() => {
		if (isSuccess && message) {
			notify(message, { type: "success", theme: "colored"});
		}
	}, [message, isSuccess, notify]);

	React.useEffect(() => {
		if (isError && error) {
			notify(error.message, { type: "error", theme:"colored"})
		}
	}, [message, isError, error, notify]);
	
	return {};
}

export default useErrorQueryHandler;
