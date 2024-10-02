import EmployerPackages from "@/views/Admin/EmployerPackages";
import SeekerPackageSubscriptions from "@/views/Admin/SeekerPackageSubscriptions";
import SeekerPackages from "@/views/Admin/SeekerPackages";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

const Packages = () => {
  return <Outlet />;
};

const PackageRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Packages />}>
				<Route path="/" element={<Navigate to="/admin/packages/employer-packages" replace />} />
				<Route path="employer-packages" element={<EmployerPackages />} />
				<Route path="seeker-packages" element={<SeekerPackages />} />
				<Route path="seeker-package-subscriptions" element={<SeekerPackageSubscriptions />} />
			</Route>
		</Routes>
	);
};

export default PackageRoutes;