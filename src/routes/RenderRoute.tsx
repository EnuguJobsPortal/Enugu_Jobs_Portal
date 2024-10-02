import { IBaseRoutes } from "@/interfaces/routes.interface";
import Loader from "@/layout/Loader";
import FragmentComponent from "@/routes/FragmentComponent";
import RequiredRoles from "@/routes/RequiredRoles";
import AppErrorBoundary from "@/views/Error/ErrorBoundary";
import React, { Suspense } from "react";
import { Route } from "react-router-dom";

const RenderRoutes = ({ route } : { route: IBaseRoutes}) => {

	const Component = route.component;
	const ProtectedComponent = route.isAuthenticated ? RequiredRoles : FragmentComponent;
	const Layout = route.layout ? route.layout : React.Fragment;
	
	return (
		<Route
			key={route.path}
			path={route.path}
			element={
				<Suspense fallback={<Loader />}>
					<ProtectedComponent allowedRoles={route.allowedRoles || []}>
						<Layout>
							<AppErrorBoundary>
								<Component />
							</AppErrorBoundary>
						</Layout>
					</ProtectedComponent>
				</Suspense>
			}
		/>
	);
}

export default RenderRoutes;