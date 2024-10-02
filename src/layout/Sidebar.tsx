import EnuguJobsLogo from "@/assets/images/enugu-jobs-logo-dark.png";
import EnuguJobsFavicon from "@/assets/images/enugu-jobs-logo-favicon.png";
import Avatar from "@/components/shared/Avatar";
import { useSidebarContext } from "@/context/SideBarContext";
import useAuth from "@/hooks/useAuth";
import { DASHBOARD_SIDEBAR_DATA } from "@/layout/SidebarData";
import { SidebarSection } from "@/layout/SidebarSection";
import UserNav from "@/layout/UserNav";
import "@/styles/sideBar.css";
import classNames from "classnames";
import { ChevronsLeft, ChevronsRight, MoreVertical } from "lucide-react";

export default function Sidebar() {
	const { loggedUser } = useAuth();
	const { isExpanded, setIsExpanded, scrollbarVisible, setScrollbarVisible } = useSidebarContext();

	return (
		<aside className={classNames(isExpanded ? 'w-[270px]' : 'w-28', 'transition-all flex flex-col relative top-0 bottom-0 left-0 hidden lg:block')}>
			<nav className="h-full flex flex-col bg-white border-r shadow-sm">
				<div className="p-4 pb-2 flex justify-between items-center">
					{ isExpanded ? (
						<img
							src={EnuguJobsLogo}
							className={classNames(isExpanded ? "w-32 rotate-[360deg]" : "w-0 rotate-[360deg]",`overflow-hidden transition-all`)}
							alt="enugu-jobs-logo"
						/>

					) : (
						<img
							src={EnuguJobsFavicon}
							className={classNames(isExpanded ? "w-32" : "w-8",`overflow-hidden transition-all`)}
							alt="enugu-jobs-logo"
						/>
					)}
					
					<button
						onClick={() => setIsExpanded((curr) => !curr)}
						className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
					>
						{isExpanded ? <ChevronsLeft className="text-sky-800"/> : <ChevronsRight className="text-sky-800"/>}
					</button>
				</div>

				<ul 
					className={classNames(
						scrollbarVisible ? 'show-scrollbar' : '', 
						"flex-1 overflow-y-auto overflow-x-hidden px-5 scrollbar"
					)}
					onMouseEnter={() => setScrollbarVisible(true)}
					onMouseLeave={() => setScrollbarVisible(false)}
				>
					{ DASHBOARD_SIDEBAR_DATA.map(( section, i) => (
						<SidebarSection section={section} key={i} />
					))}
				</ul>

				<div className="border-t flex p-3 items-center justify-center">
					{ !isExpanded ? (
						<UserNav>
							<Avatar name={`${loggedUser.Firstname} ${loggedUser.Lastname}`}/>
						</UserNav>
					) : (
						<Avatar name={`${loggedUser.Firstname} ${loggedUser.Lastname}`}/>
					)}
					<div
						className={classNames(isExpanded ? "w-full ml-3" : "w-0", `flex justify-between items-center overflow-hidden transition-all`)}
					>
						<div className="leading-4">
							<h4 className="font-semibold">{`${loggedUser.Firstname} ${loggedUser.Lastname}`}</h4>
							<span className="text-xs text-gray-600">{loggedUser.Email}</span>
						</div>
						<UserNav>
							<MoreVertical size={20} className=""/>
						</UserNav>
					</div>
				</div>
			</nav>
		</aside>
	)
}