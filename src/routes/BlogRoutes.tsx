import BlogPostComments from "@/views/Admin/BlogComments";
import BlogPostCategories from "@/views/Admin/BlogPostCategories";
import BlogPosts from "@/views/Admin/BlogPosts";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

const Blogs = () => {
  return <Outlet />;
};

const BlogRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Blogs />}>
				<Route path="/" element={<Navigate to="/admin/blog/posts" replace />} />
				<Route path="posts" element={<BlogPosts />} />
				<Route path="categories" element={<BlogPostCategories />} />
				<Route path="comments" element={<BlogPostComments />} />
			</Route>
		</Routes>
	);
};

export default BlogRoutes;