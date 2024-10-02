import EmailUpdateBox from "@/components/Forms/EmailUpdateBox";
import PasswordUpdateBox from "@/components/Forms/PasswordUpdateBox";
import ReactHelmet from "@/components/ReactHelmet";
import Avatar2 from "@/components/shared/Avatar2";
import { Card, CardContent } from "@/components/ui/card";
import { useBreadCrumbContext } from "@/context/BreadCrumbContext";
import { useNavTitleContext } from "@/context/NavTitleContext";
import useAuth from "@/hooks/useAuth";
import { ILinkType } from "@/interfaces/context.interface";
import { useEffect, useMemo } from "react";

const Account = () => {
    const { setBreadCrumb } = useBreadCrumbContext();
    const { setTitle } = useNavTitleContext();
    const { user } = useAuth();

    const DashboardLinks: ILinkType[] = useMemo(() => [
        {
          label: "Home",
          value: '/admin/dashboard',
        },
        {
          label: "Settings",
          value: '/admin/settings',
        }
    ], []);

    useEffect(() => {
        if (setBreadCrumb) {
            setBreadCrumb({
                current: 'My Account',
                links: DashboardLinks,
                isBack: true,
                isVisible: true,
            });
        }

        if (setTitle) {
            setTitle((prev) => ({
              ...prev,
              title: "My Account",
            }));
        }
    }, [ DashboardLinks, setBreadCrumb, setTitle])

    return (
        <ReactHelmet title="My Account">
            <div className="flex flex-col item-center justify-center mb-10">
                <Card className="shadow-[0px_1px_3px_-2px_rgba(0,_0,_0,_0.6)] h-auto mb-5 rounded-2xl">
                    <CardContent className="flex flex-col w-full m-auto justify-center items-center gap-4">
                        <Avatar2 
                            name={`${user.Firstname} ${user.Lastname}`}
                            className="w-[150px] h-[150px] bg-[#029aec] mt-10 text-white flex justify-center items-center font-medium font-poppins text-2xl uppercase rounded-full m-1"
                            initialsClass="m-5 p-5 text-5xl"
                        />
                        <span className="text-gray-900 font-normal font-sans text-xl tracking-wide">
                            {`${user.Firstname} ${user.Lastname}`}
                        </span>
                        <span className="text-gray-500 font-normal font-sans text-lg tracking-wide">{ user.Email }</span>
                    </CardContent>
                </Card>
                <EmailUpdateBox/>
                <PasswordUpdateBox/>
            </div>
        </ReactHelmet>
    )
}

export default Account