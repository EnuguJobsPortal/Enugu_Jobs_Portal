import Icon from "@/components/shared/Icon";
import { useSidebarContext } from "@/context/SideBarContext";
import { ILink } from "@/interfaces/layout.interface";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";

const linkClass = `
    relative flex items-center py-2 px-3 my-1
    font-medium rounded-md cursor-pointer text-sm
    transition-colors group
`;

export function SidebarSubMenuItem({ item }: { item: ILink}) {
	const { isExpanded } = useSidebarContext();
    const { pathname } = useLocation();
    const navigate = useNavigate();
	
	return (
        <li
            className={
                classNames(pathname.includes(item.path) ? 
                "text-indigo-800 hover:bg-indigo-50" : 
                "hover:bg-indigo-50 text-gray-600", linkClass, !isExpanded ? 'justify-center' : '')
            }
            onClick={() => navigate(item.path)}
            title={item.label}
        >
            <Icon name={item.icon} size={20} />
            <span className={classNames(isExpanded ? "w-52 ml-3" : "w-0", `overflow-hidden transition-all`)}>
                {item.label}
            </span>

            {!isExpanded && (
                <div
                    className={`
                        absolute left-full rounded-md px-2 py-1 ml-6
                        bg-indigo-100 text-indigo-800 text-sm
                        invisible opacity-20 -translate-x-3 transition-all
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                    `}
                >
                    {item.label}
                </div>
            )}
        </li>
	)
}