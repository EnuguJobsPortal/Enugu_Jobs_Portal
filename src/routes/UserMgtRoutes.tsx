import ActivityLog from "@/views/Admin/ActivityLog";
import Testimonials from "@/views/Admin/Testimonials";
import UserManagement from "@/views/Admin/UserManagement";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

const Users = () => {
  return <Outlet />;
};

const UserMgtRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Users />}>
				<Route path="/" element={<Navigate to="/admin/users/user-management" replace />} />
				<Route path="user-management" element={<UserManagement />} />
				<Route path="activity-log" element={<ActivityLog />} />
				<Route path="testimonials" element={<Testimonials />} />
			</Route>
		</Routes>
	);
};

export default UserMgtRoutes;
