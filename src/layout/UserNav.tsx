import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSweetAlert } from "@/context/SweetAlertContext";
import useAuth from "@/hooks/useAuth";
import { IChildren } from "@/interfaces/general";
import { LogOut, User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
  
export function UserNav({ children }: IChildren) {
	const { loggedUser, logOut } = useAuth();
	const navigate = useNavigate()

	const {showConfirm } = useSweetAlert();

	const handleLogout = async () => {
		const result = await showConfirm("Confirm!!!", "You are about closing this session!!!");

		if(result.isConfirmed)
		{
			logOut(navigate)
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				{ children }
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{`${loggedUser.Firstname} ${loggedUser.Lastname}`}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{ loggedUser.Email }
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => navigate('/admin/settings/account')}>
						My Account
						<DropdownMenuShortcut>
							<User2 className="w-3 h-3"/>
						</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem className="text-red-600" onClick={() => handleLogout()}>
						Sign Out
						<DropdownMenuShortcut>
							<LogOut className="w-3 h-3" />
						</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserNav