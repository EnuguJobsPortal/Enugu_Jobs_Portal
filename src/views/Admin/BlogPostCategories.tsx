//import Users from "@/components/Tables/Users";
import NewBlogPostCategory from "@/components/Forms/NewBlogPostCategory";
import ReactHelmet from "@/components/ReactHelmet";
import BlogPostCategoryTable from "@/components/Tables/BlogPostCategoryTable";
import { useBreadCrumbContext } from "@/context/BreadCrumbContext";
import { useNavTitleContext } from "@/context/NavTitleContext";
import { ILinkType } from "@/interfaces/context.interface";
import { useEffect, useMemo } from "react";

const BlogPostCategories = () => {
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
                current: 'Blog Categories',
                links: DashboardLinks,
                isBack: true,
                isVisible: true,
            });
        }

        if (setTitle) {
            setTitle((prev) => ({
              ...prev,
              title: "Blog Categories",
            }));
        }
    }, [ DashboardLinks, setBreadCrumb, setTitle ])

    return (
        <ReactHelmet title="Blog Categories">
            <NewBlogPostCategory />
            <BlogPostCategoryTable/>
        </ReactHelmet>
    )
}

export default BlogPostCategories;