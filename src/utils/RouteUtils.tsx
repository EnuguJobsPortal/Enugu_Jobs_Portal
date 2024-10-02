import BreadcrumbShared from "@/components/shared/BreadCrumbShared";
import { ActionButtonProvider } from "@/context/ActionButtonContext";
import { IBaseRoutes } from "@/interfaces/routes.interface";
import Loader from '@/layout/Loader';
import FragmentComponent from "@/routes/FragmentComponent";
import RequiredRoles from "@/routes/RequiredRoles";
import AppErrorBoundary from '@/views/Error/ErrorBoundary';
import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';

export const renderRoutes = ({ component: Component, layout, allowedRoles, ...route }: IBaseRoutes) => {
	const ProtectedComponent = route.isAuthenticated ? RequiredRoles : FragmentComponent;
	const Layout = layout ? layout : React.Fragment;

	return (
		<Route
			key={route.path}
			path={route.path}
			element={
				<Suspense fallback={<Loader />}>
					<ProtectedComponent allowedRoles={allowedRoles || []}>
						<ActionButtonProvider>
							<Layout>
								<BreadcrumbShared>
									<AppErrorBoundary>
										<Component />
									</AppErrorBoundary>
								</BreadcrumbShared>
							</Layout>
						</ActionButtonProvider>
					</ProtectedComponent>
				</Suspense>
			}
		/>
	);
};