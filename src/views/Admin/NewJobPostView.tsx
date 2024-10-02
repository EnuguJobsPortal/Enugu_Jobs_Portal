import NewJobPost3 from "@/components/Forms/NewJobPost3";
import ReactHelmet from "@/components/ReactHelmet";
import { useBreadCrumbContext } from "@/context/BreadCrumbContext";
import { useNavTitleContext } from "@/context/NavTitleContext";
import { ILinkType } from "@/interfaces/context.interface";
import { useEffect, useMemo } from "react";

const NewJobPostView = () => {
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
                current: 'New Job Post',
                links: DashboardLinks,
                isBack: true,
                isVisible: true,
            });
        }

        if (setTitle) {
            setTitle((prev) => ({
              ...prev,
              title: "New Job Post",
            }));
        }
    }, [ DashboardLinks, setBreadCrumb, setTitle ])

    return (
        <ReactHelmet title="New Job Post">
            <NewJobPost3 />
        </ReactHelmet>
    )
}

export default NewJobPostView;