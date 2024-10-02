import { SidebarContext } from "@/context/SideBarContext";
import useAuth from "@/hooks/useAuth";
import { ISidebarData } from "@/interfaces/layout.interface";
import { SidebarLink } from "@/layout/SidebarLink";
import classNames from "classnames";
import { useContext } from "react";

export function SidebarSection({ section }: { section: ISidebarData}) {
    const { loggedUser } = useAuth();
	const { isExpanded } = useContext(SidebarContext)!;
	
	return (
		<li className="mt-9">
            <span className={classNames(isExpanded ? "w-23 ml-0" : "w-0", `text-[10px] uppercase overflow-hidden transition-all`)}>
                <div className="flex items-center gap-2">
                    <span className="text-sky-300">{section.section}</span> 
                    <span className="text-sky-400 font-semibold">{section.links.length}</span>
                </div>
            </span>

            <ul>
                { section.links.map((link, i) => (
                    link.allowedRoles && link.allowedRoles?.includes(loggedUser.UserType) && <SidebarLink link={link} key={i} />
                ))}
            </ul>
		</li>
	)
}