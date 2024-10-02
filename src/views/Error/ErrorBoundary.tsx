import { Button } from "@/components/ui/button";
import { IChildren } from "@/interfaces/general";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
	return (
		<div role="alert" className=" shadow-lg px-3 py-4">
			<p className=" text-error-100">Something went wrong:</p>
			<pre>{error.message}</pre>
			<div className=" break-words">{JSON.stringify(error.stack)}</div>
			<Button variant="destructive" onClick={resetErrorBoundary}>
				Try again
			</Button>
		</div>
	);
}

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
	// eslint-disable-next-line no-console
	console.log({ error, info: info.componentStack });
};

const AppErrorBoundary = ({ children }: IChildren) => {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
			{children}
		</ErrorBoundary>
	);
};

export default AppErrorBoundary;