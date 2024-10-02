import Avatar from "@/components/shared/Avatar";
import { Button } from "@/components/ui/button";
import { useMobileSidebarContext } from "@/context/MobileSidebarContext";
import { useNavTitleContext } from "@/context/NavTitleContext";
//import { useNavTitleContext } from "@/context/NavTitleContext";
import useAuth from "@/hooks/useAuth";
import MobileSideBar from "@/layout/MobileSideBar";
import Notifications from "@/layout/Notifications";
import UserNav from "@/layout/UserNav";
import { Menu, Search } from "lucide-react";

function Header() {
  
	const { title } = useNavTitleContext();
	const { loggedUser } = useAuth();
	const { open, setOpen } = useMobileSidebarContext();

	return (
		<>
			<header className="sticky z-10 top-0 bg-white h-16 base-theme-container flex items-center border-b border-gray-200 justify-between md:px-3 px-5 flex-shrink-0">
				{/* left side */}
				{/* <div className="relative flex items-center"> */}
					{/* <span className="font-[500] text-[18px] sm:hidden">{title?.title || "Enugu Jobs"}</span> */}
					<span className="lg:hidden">
						<Button variant="outline" size="icon" className="rounded-full" onClick={() => { setOpen(true)}}>
							<Menu className="h-4 w-4" />
						</Button>
					</span>
					<span className="font-[500] text-lg uppercase">{title?.title || "ENUGU JOBS"}</span>
					<div className="relative hidden lg:block">
						<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
							<Search className="h-5 w-5"/>
						</span>
						<input
							type="text"
							placeholder="Search for users, jobs & employers"
							className="w-96 pl-10 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring focus:border-blue-500 text-xs"
						/>
					</div>
				{/* </div> */}
				{/* right side */}
				<div className="flex justify-end items-center gap-8">
					<Notifications/>
					<div className="flex gap-2 items-center justify-self-start">
						<UserNav>
							<Avatar name={`${loggedUser.Firstname} ${loggedUser.Lastname}`}/>
						</UserNav>
						<div className=" hidden lg:block flex flex-col">
							<p className="text-black text-[14px] font-bold uppercase flex justify-self-start">
								{`${loggedUser.Firstname} ${loggedUser.Lastname}`}
							</p>
							<p className="text-[10px] text-gray-600 uppercase flex justify-self-center sm:justify-self-start">
								{loggedUser.UserType}
							</p>
						</div>
					</div>	
				</div>
			</header>

			<MobileSideBar
				open={open}
				setOpen={setOpen}
			/>
		</>
	);
}

export default Header;
