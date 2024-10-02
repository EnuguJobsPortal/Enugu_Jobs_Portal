import { BreadCrumbProvider } from "@/context/BreadCrumbContext"
import { LoadingProvider } from "@/context/LoadingContext"
import { MobileSidebarProvider } from "@/context/MobileSidebarContext"
import { NavTitleProvider } from "@/context/NavTitleContext"
import { NotificationProvider } from "@/context/NotificationContext"
import { SidebarProvider } from "@/context/SideBarContext"
import { SweetAlertProvider } from "@/context/SweetAlertContext"
import AppRoutes from "@/routes"

function App() {

	return (
		<NotificationProvider>
			<LoadingProvider>
				<SweetAlertProvider>
					<SidebarProvider>
						<MobileSidebarProvider>
							<NavTitleProvider>
								<BreadCrumbProvider>
									<AppRoutes/>
								</BreadCrumbProvider>
							</NavTitleProvider>
						</MobileSidebarProvider>
					</SidebarProvider>
				</SweetAlertProvider>
			</LoadingProvider>
		</NotificationProvider>
	)
}

export default App
