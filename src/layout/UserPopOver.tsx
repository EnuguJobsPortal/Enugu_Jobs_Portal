import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSweetAlert } from "@/context/SweetAlertContext";
import useAuth from "@/hooks/useAuth";
import { IChildren } from "@/interfaces/general";
import { LogOut, User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserPopOver = ({ children }: IChildren) => {

    const { logOut } = useAuth();
	const navigate = useNavigate();
	const {showConfirm } = useSweetAlert();

	const handleLogout = async () => {
		const result = await showConfirm("Confirm!!!", "You are about closing this session!!!");

		if(result.isConfirmed)
		{
			logOut(navigate)
		}
	}

    return (
        <Popover>
            <PopoverTrigger className="">
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-35">
                <div className="flex flex-col text-xs justify-center items-center">
                    <div 
                        className="flex justify-center items-center gap-2 hover:bg-slate-100 p-2 cursor-pointer"
                        onClick={() => navigate('/admin/settings/account')}
                    >
                        <User2 className="w-3 h-3"/>
                        <span>My Account</span>
                    </div>
                    <div 
                        className="flex justify-center items-center gap-2 hover:bg-slate-100 p-2 cursor-pointer text-red-600" 
                        onClick={() => handleLogout()}
                    >
                        <LogOut className="w-3 h-3"/>
                        <span>Sign Out</span>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default UserPopOver;