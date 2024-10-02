import Icon from "@/components/shared/Icon";
import { useSidebarContext } from "@/context/SideBarContext";
import useAuth from "@/hooks/useAuth";
import { ILink } from "@/interfaces/layout.interface";
import { SidebarSubMenuItem } from "@/layout/SidebarSubMenuItem";
import classNames from "classnames";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const linkClass = `
    relative flex items-center justify-center py-4 px-3 my-1
    font-medium rounded-md cursor-pointer
    transition-colors group
`;

export function SidebarLink({ link }: { link: ILink}) {
    const { loggedUser } = useAuth();
	const { isExpanded, activeDropdownIndex, setActiveDropdownIndex } = useSidebarContext();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const toggleDropdown = useCallback((index: string) => {
        setActiveDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
    }, [setActiveDropdownIndex]);

    useEffect(() => {
        if(pathname.includes(link.path))
        {
            toggleDropdown(String(link.key))
        }
    }, [link.key, pathname, toggleDropdown, link.path])

	return (
        <>
            <li
                className={
                    classNames(pathname.includes(link.path) ? 
                    "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : 
                    "hover:bg-indigo-50 text-gray-600", linkClass)
                }
                onClick={() => link.isDropdown ? toggleDropdown(link.key!) : navigate(link.path)}
                title={link.label}
            >
                <Icon name={link.icon} />
                <span className={classNames(isExpanded ? "w-52 ml-3" : "w-0", `overflow-hidden transition-all`)}>
                    {link.label}
                </span>
                { link.isDropdown && (
                    <ChevronDown className={classNames(!isExpanded ? "w-0" : `absolute right-2 w-4 h-4 rounded`, activeDropdownIndex === link.key && 'rotate-180 transition-all')} />
                )}

                {!isExpanded && (
                    <div
                        className={`
                            absolute z-1000 left-full rounded-md px-2 py-1 ml-6
                            bg-indigo-100 text-indigo-800 text-sm
                            invisible opacity-20 -translate-x-3 transition-all
                            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                        `}
                    >
                        {link.label}
                    </div>
                )}
            </li>
            <ul 
                className={
                    classNames(activeDropdownIndex === link.key ? 'max-h-60' : 'max-h-0', isExpanded ? 'px-5' : 'px-0', 'overflow-hidden transition-all duration-500')
                }
            >
                {link.dropdownItems?.map((item, i ) => (
                    item.allowedRoles && item.allowedRoles?.includes(loggedUser.UserType) && <SidebarSubMenuItem key={i} item={item} />
                ))}
            </ul>
        </>
	)
}