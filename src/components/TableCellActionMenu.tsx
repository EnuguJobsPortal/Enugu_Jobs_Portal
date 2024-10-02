import Icon from "@/components/shared/Icon";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ITableCellActionMenuProps } from "@/interfaces/general";
import { MoreVertical } from "lucide-react";

const TableCellActionMenu = ({ menuLabel, menuItems }: ITableCellActionMenuProps) => {
    return (
        <DropdownMenu>
			<DropdownMenuTrigger>
				<MoreVertical className="h-4 w-4 text-black"/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
                { menuLabel && (
                    <DropdownMenuLabel className="font-normal">
                        { menuLabel }
                    </DropdownMenuLabel>
                )}
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
                    { menuItems.map(( menuItem, i) => (
                        <DropdownMenuItem 
                            key={i}
                            onClick={menuItem.handleClick}
                        >
                            <span className="text-sm tracking-wider font-normal">{ menuItem.label }</span>
                            <DropdownMenuShortcut>
                                <Icon name={menuItem.icon} color={menuItem.iconColor} size={24}/>
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    ))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
    )
}

export default TableCellActionMenu;