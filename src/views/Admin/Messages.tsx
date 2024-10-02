import ReactHelmet from "@/components/ReactHelmet";
import MessagesTableView from "@/components/Tables/MessagesTableView";
import { useBreadCrumbContext } from "@/context/BreadCrumbContext";
import { useNavTitleContext } from "@/context/NavTitleContext";
import { ILinkType } from "@/interfaces/context.interface";
import { useEffect, useMemo } from "react";

const Messages = () => {
    const { setBreadCrumb } = useBreadCrumbContext();
    const { setTitle } = useNavTitleContext();

    const DashboardLinks: ILinkType[] = useMemo(() => [
        {
          label: "Home",
          value: '/admin/dashboard',
        }
    ], []);

    useEffect(() => {
        if (setBreadCrumb) {
            setBreadCrumb({
                current: 'Messages',
                links: DashboardLinks,
                isBack: true,
                isVisible: true,
            });
        }

        if (setTitle) {
            setTitle((prev) => ({
              ...prev,
              title: "Messages",
            }));
        }
    }, [ DashboardLinks, setBreadCrumb, setTitle ])

    return (
        <ReactHelmet title="Messages">
            <MessagesTableView/>
        </ReactHelmet>
    )
}

export default Messages;