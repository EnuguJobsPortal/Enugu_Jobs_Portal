import Account from "@/views/Admin/Account";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

const Settings = () => {
  return <Outlet />;
};

const BlogRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Settings />}>
				<Route path="/" element={<Navigate to="/admin/settings/account" replace />} />
				<Route path="account" element={<Account />} />
			</Route>
		</Routes>
	);
};

export default BlogRoutes;