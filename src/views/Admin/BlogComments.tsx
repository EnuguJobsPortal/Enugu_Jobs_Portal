//import Users from "@/components/Tables/Users";
import ReactHelmet from "@/components/ReactHelmet";
import BlogCommentsTable from "@/components/Tables/BlogCommentsTable";
import { useBreadCrumbContext } from "@/context/BreadCrumbContext";
import { useNavTitleContext } from "@/context/NavTitleContext";
import { ILinkType } from "@/interfaces/context.interface";
import { useEffect, useMemo } from "react";

const BlogPostComments = () => {
    const { setBreadCrumb } = useBreadCrumbContext();
    const { setTitle } = useNavTitleContext();

    const DashboardLinks: ILinkType[] = useMemo(() => [
        {
          label: "Home",
          value: '/admin/dashboard',
        },
        {
          label: "Blog",
          value: '/admin/blog',
        }
    ], []);

    useEffect(() => {
        if (setBreadCrumb) {
            setBreadCrumb({
                current: 'Blog Comments',
                links: DashboardLinks,
                isBack: true,
                isVisible: true,
            });
        }

        if (setTitle) {
            setTitle((prev) => ({
              ...prev,
              title: "Blog Comments",
            }));
        }
    }, [ DashboardLinks, setBreadCrumb, setTitle ])

    return (
        <ReactHelmet title="Blog Comments">
            <BlogCommentsTable/>
        </ReactHelmet>
    )
}

export default BlogPostComments;