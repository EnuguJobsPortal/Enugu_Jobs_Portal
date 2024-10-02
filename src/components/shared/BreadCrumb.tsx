import { IBreadCrumbProps } from "@/interfaces/general";
import { ChevronLeft, Tally1, } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Breadcrumb = ({ links, current, isBack }: IBreadCrumbProps, width: string) => {
	const navigate = useNavigate();
	
	return (
		<div
			className={`flex justify-start gap-2 hide-scrollbar overflow-x-auto items-center w-${width} base-theme-container px-0 mb-8`}
		>
			{isBack && (
				<>
					<div
						className="flex items-center gap-2 cursor-pointer"
						onClick={() => {
							navigate(-1);
						}}
					>
						<div className="">
							<ChevronLeft className="w-4 h-4" />
						</div>
						<span className=" text-[#1587C6] text-[10px] font-medium uppercase">Back</span>
					</div>
					
					<div className="">
						<Tally1 className="w-2 h-2" />
					</div>
				</>
			)}
			{links && links?.map((link, index) => {
				return (
					<div key={`links=${index}`} className="flex justify-start gap-2 items-center">
						<div className=" whitespace-nowrap flex">
							<Link to={link.value} style={{ textDecoration: "none", color: "#6B6C7E" }} className="text-[10px] uppercase">
								{link.label}
							</Link>
						</div>
						<Tally1 className="w-2 h-2" />
					</div>
				);
			})}
			<p className="whitespace-nowrap text-[10px] uppercase">{current}</p>
		</div>
	);
};

export default Breadcrumb;
