import ReactHelmet from "@/components/ReactHelmet";
import JobApplicationsTable from "@/components/Tables/JobApplicationsTable";
//import Users from "@/components/Tables/Users";
import { useBreadCrumbContext } from "@/context/BreadCrumbContext";
import { useNavTitleContext } from "@/context/NavTitleContext";
import { ILinkType } from "@/interfaces/context.interface";
import { useEffect, useMemo } from "react";

const JobApplications = () => {
    const { setBreadCrumb } = useBreadCrumbContext();
    const { setTitle } = useNavTitleContext();

    const DashboardLinks: ILinkType[] = useMemo(() => [
        {
          label: "Home",
          value: '/admin/dashboard',
        },
        {
          label: "Jobs",
          value: '/admin/jobs',
        }
    ], []);

    useEffect(() => {
        if (setBreadCrumb) {
            setBreadCrumb({
                current: 'Job Applications',
                links: DashboardLinks,
                isBack: true,
                isVisible: true,
            });
        }

        if (setTitle) {
            setTitle((prev) => ({
              ...prev,
              title: "Job Applications",
            }));
        }
    }, [ DashboardLinks, setBreadCrumb, setTitle ])

    return (
        <ReactHelmet title="Job Applications">
            <JobApplicationsTable/>
        </ReactHelmet>
    )
}

export default JobApplications;