import { HelmetProps } from "@/interfaces/layout.interface";
import { Helmet } from "react-helmet";

export default function ReactHelmet({ title, children }: HelmetProps) {
	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>{title}</title>
			</Helmet>
			{children}
		</>
	);
}