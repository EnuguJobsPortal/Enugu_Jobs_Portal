import { roleObject } from "@/constants/roles";
import Approvals from "@/views/Admin/Approvals";
import JobApplications from "@/views/Admin/JobApplications";
import JobPosts from "@/views/Admin/JobPosts";
import NewJobPostView from "@/views/Admin/NewJobPostView";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import ProtectedComponent from "./ProtectedComponent";

const Jobs = () => {
  return <Outlet />;
};

const JobMgtRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Jobs />}>
				{/* <Route path="/" element={<Navigate to="/admin/jobs/job-management" replace />} />
				<Route path="job-management" element={<JobManagement />} /> */}
				<Route path="/" element={<Navigate to="/admin/jobs/job-posts" replace />} />
				<Route path="job-posts" element={<JobPosts />} />
				<Route path="approvals" element={<ProtectedComponent element={<Approvals />} allowedRoles={[ roleObject.SUPERADMIN ]}/>} />
				{/* <Route path="approvals" element={<Approvals />} /> */}
				<Route path="new-job-post" element={<NewJobPostView />} />
				<Route path="applications" element={<JobApplications />} />
			</Route>
		</Routes>
	);
};

export default JobMgtRoutes;