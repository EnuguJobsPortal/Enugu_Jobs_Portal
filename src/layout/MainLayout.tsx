import Header from "@/layout/Header";
import Sidebar from "@/layout/Sidebar";
import React from "react";

type ILayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: ILayoutProps) {
	return (
		<div className="bg-[#fafafa] flex h-screen overflow-hidden">
			<Sidebar />
			<div className="flex flex-col flex-1 w-0 overflow-y-auto">
				<Header />
				<main className="flex-1 px-4 pt-5 h-[calc(100vh-70px)] overflow-y-auto relative">
					{children}
				</main>
			</div>
		</div>
	);
}

export default MainLayout;