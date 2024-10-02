//import Users from "@/components/Tables/Users";
import ReactHelmet from "@/components/ReactHelmet";
import SeekerPackageSubscriptionsTable from "@/components/Tables/SeekerPackageSubscriptionsTable";
import { useBreadCrumbContext } from "@/context/BreadCrumbContext";
import { useNavTitleContext } from "@/context/NavTitleContext";
import { ILinkType } from "@/interfaces/context.interface";
import { useEffect, useMemo } from "react";

const SeekerPackageSubscriptions = () => {
    const { setBreadCrumb } = useBreadCrumbContext();
    const { setTitle } = useNavTitleContext();

    const DashboardLinks: ILinkType[] = useMemo(() => [
        {
          label: "Home",
          value: '/admin/dashboard',
        },
        {
          label: "Packages",
          value: '/admin/packages',
        }
    ], []);

    useEffect(() => {
        if (setBreadCrumb) {
            setBreadCrumb({
                current: 'Seeker Package Subscriptions',
                links: DashboardLinks,
                isBack: true,
                isVisible: true,
            });
        }

        if (setTitle) {
            setTitle((prev) => ({
              ...prev,
              title: "Seeker Package Subscriptions",
            }));
        }
    }, [ DashboardLinks, setBreadCrumb, setTitle ])

    return (
        <ReactHelmet title="Seeker Package Subscriptions">
            <SeekerPackageSubscriptionsTable/>
        </ReactHelmet>
    )
}

export default SeekerPackageSubscriptions;