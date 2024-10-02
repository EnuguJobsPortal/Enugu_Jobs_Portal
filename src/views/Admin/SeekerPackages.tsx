//import Users from "@/components/Tables/Users";
import SeekerPackageDetails from "@/components/Forms/Accordions/SeekerPackageDetails";
import NewSeekerPackage2 from "@/components/Forms/NewSeekerPackage2";
import ReactHelmet from "@/components/ReactHelmet";
import { useBreadCrumbContext } from "@/context/BreadCrumbContext";
import { useNavTitleContext } from "@/context/NavTitleContext";
import { ILinkType } from "@/interfaces/context.interface";
import { useEffect, useMemo } from "react";

const SeekerPackages = () => {
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
                current: 'Seeker Packages',
                links: DashboardLinks,
                isBack: true,
                isVisible: true,
            });
        }

        if (setTitle) {
            setTitle((prev) => ({
              ...prev,
              title: "Seeker Packages",
            }));
        }
    }, [ DashboardLinks, setBreadCrumb, setTitle ])

    return (
        <ReactHelmet title="Seeker Packages">
            <NewSeekerPackage2 />
            {/* <SeekerPackageTable2/> */}
            <SeekerPackageDetails/>
        </ReactHelmet>
    )
}

export default SeekerPackages;