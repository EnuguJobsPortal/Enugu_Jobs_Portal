//import Users from "@/components/Tables/Users";
import NewBlogPost from "@/components/Forms/NewBlogPost";
import ReactHelmet from "@/components/ReactHelmet";
import BlogPostTable from "@/components/Tables/BlogPostTable";
import { useBreadCrumbContext } from "@/context/BreadCrumbContext";
import { useNavTitleContext } from "@/context/NavTitleContext";
import { ILinkType } from "@/interfaces/context.interface";
import { useEffect, useMemo } from "react";

const BlogPosts = () => {
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
                current: 'Blog Posts',
                links: DashboardLinks,
                isBack: true,
                isVisible: true,
            });
        }

        if (setTitle) {
            setTitle((prev) => ({
              ...prev,
              title: "Blog Posts",
            }));
        }
    }, [ DashboardLinks, setBreadCrumb, setTitle ])

    return (
        <ReactHelmet title="Blog Posts">
            <NewBlogPost />
            <BlogPostTable/>
        </ReactHelmet>
    )
}

export default BlogPosts;