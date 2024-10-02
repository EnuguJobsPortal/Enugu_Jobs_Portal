//import Users from "@/components/Tables/Users";
import NewEmployerPackage from "@/components/Forms/NewEmployerPackage";
import ReactHelmet from "@/components/ReactHelmet";
import EmployerPackageTable from "@/components/Tables/EmployerPackageTable";
import { useBreadCrumbContext } from "@/context/BreadCrumbContext";
import { useNavTitleContext } from "@/context/NavTitleContext";
import { ILinkType } from "@/interfaces/context.interface";
import { useEffect, useMemo } from "react";

const EmployerPackages = () => {
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
                current: 'Employer Packages',
                links: DashboardLinks,
                isBack: true,
                isVisible: true,
            });
        }

        if (setTitle) {
            setTitle((prev) => ({
              ...prev,
              title: "Employer Packages",
            }));
        }
    }, [ DashboardLinks, setBreadCrumb, setTitle ])

    return (
        <ReactHelmet title="Employer Packages">
            <NewEmployerPackage />
            <EmployerPackageTable/>
        </ReactHelmet>
    )
}

export default EmployerPackages;