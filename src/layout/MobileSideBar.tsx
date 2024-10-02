import Logo from "@/assets/images/enugu-jobs-logo-dark.png";
import Avatar from "@/components/shared/Avatar";
import Icon from "@/components/shared/Icon";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebarContext } from "@/context/MobileSidebarContext";
import useAuth from "@/hooks/useAuth";
import { ILink, ISidebarData } from "@/interfaces/layout.interface";
import { DASHBOARD_SIDEBAR_DATA } from "@/layout/SidebarData";
import UserNav from "@/layout/UserNav";
import "@/styles/Sidebar.css";
import classNames from "classnames";
import { ChevronDown, ChevronsLeft, MoreVertical } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const linkClass = `
    relative flex items-center justify-center py-4 px-8 my-1
    font-medium cursor-pointer transition-colors group
`;

const submenuLinkClass = `
    relative flex items-center py-2 px-3 my-1
    font-medium rounded-md cursor-pointer text-sm
    transition-colors group
`;

export function SidebarSubMenuItem({ item }: { item: ILink}) {
	const { open, setOpen } = useMobileSidebarContext();
    const { pathname } = useLocation();
    const navigate = useNavigate();
	
	return (
        <li
            className={
                classNames(pathname.includes(item.path) ? 
                "text-indigo-800 hover:bg-indigo-50" : 
                "hover:bg-indigo-50 text-gray-600", submenuLinkClass, 'justify-center')
            }
            onClick={() => { 
                setOpen(!open);
                navigate(item.path)
            }}
            title={item.label}
        >
            <Icon name={item.icon} size={20} />
            <span className="w-52 ml-3 overflow-hidden transition-all">
                {item.label}
            </span>
        </li>
	)
}

function SidebarLink({ link }: { link: ILink }) {
    const { open, setOpen, activeDropdownIndex, setActiveDropdownIndex } = useMobileSidebarContext();
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
                    "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 border-l-[6px] border-l-indigo-800" : 
                    "hover:bg-indigo-50 text-gray-600 hover:border-l-[6px] hover:border-l-indigo-800", linkClass)
                }
                onClick={() => {
                    if(link.isDropdown)
                    {
                        toggleDropdown(link.key!)
                    }
                    else
                    {
                        setOpen(!open); 
                        navigate(link.path)
                    }
                }}
                title={link.label}
            >
                <Icon name={link.icon} />
                <span className="w-52 ml-3 overflow-hidden transition-all">
                    {link.label}
                </span>
                { link.isDropdown && (
                    <ChevronDown className={classNames("absolute right-2 w-4 h-4 rounded", activeDropdownIndex === link.key && 'rotate-180 transition-all')} />
                )}
            </li>
            <ul 
                className={
                    classNames(activeDropdownIndex === link.key ? 'max-h-60' : 'max-h-0', 'px-5 overflow-hidden transition-all duration-500 relative border-l-4 border-l-indigo-800 ml-9')
                }
            >
                {link.dropdownItems?.map((item, i ) => (
                    <SidebarSubMenuItem key={i} item={item} />
                ))}
            </ul>
        </>
	)
}

function SidebarSection({ section }: { section: ISidebarData }) {
	return (
		<li className="mt-9">
            <span className="w-23 ml-0 text-[10px] uppercase overflow-hidden transition-all">
                <div className='flex items-center gap-2 ml-5'>
                    <span className="text-sky-300">{section.section}</span> 
                    <span className="text-sky-400 font-semibold">{section.links.length}</span>
                </div>
            </span>

            <ul>
                { section.links.map((link, i) => (
                    <SidebarLink link={link} key={i} />
                ))}
            </ul>
		</li>
	)
}

const MobileSideBar = ({ open, setOpen }: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { loggedUser } = useAuth();
    const { scrollbarVisible, setScrollbarVisible } = useMobileSidebarContext();
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="left" className="w-[300px] px-0 py-0 flex flex-col z-[1000]">
                
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src={Logo}
                        className="w-44 overflow-hidden"
                        alt="enugu-gov-logo"
                    />
                    
                    <button
                        onClick={() => setOpen((curr) => !curr)}
                        className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 ml-4'
                    >
                        <ChevronsLeft className="text-sky-800"/>
                    </button>
                </div>
                <ul 
					className={classNames(
						scrollbarVisible ? 'show-scrollbar' : '', 
						"flex-1 overflow-y-auto overflow-x-hidden px-0 scrollbar"
					)}
					onMouseEnter={() => setScrollbarVisible(true)}
					onMouseLeave={() => setScrollbarVisible(false)}
				>
					{ DASHBOARD_SIDEBAR_DATA.map(( section, i) => (
						<SidebarSection section={section} key={i} />
					))}
				</ul>

				<div className="border-t flex p-3 items-center justify-center">
                    <UserNav>
                        <Avatar name={`${loggedUser.Firstname} ${loggedUser.Lastname}`}/>
                    </UserNav>
					<div
						className="w-full ml-3 flex justify-between items-center overflow-hidden transition-all"
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
            </SheetContent>
        </Sheet>
    )
}

export default MobileSideBar