import JobApplicationChart from "@/components/Charts/JobApplicationChart";
import JobPostChart from "@/components/Charts/JobPostChart";
import MonthlySalesChart from "@/components/Charts/MonthlySalesChart";
import DashboardStats from "@/components/DashboardCountStats";
import DateTimeDisplay from "@/components/DateTimeDisplay";
import ReactHelmet from "@/components/ReactHelmet";
import JobApplicationsTable from "@/components/Tables/JobApplicationsTable";
import JobPost from "@/components/Tables/JobPost";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { useBreadCrumbContext } from "@/context/BreadCrumbContext";
import { useNavTitleContext } from "@/context/NavTitleContext";
import { ILinkType } from "@/interfaces/context.interface";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { useEffect, useMemo } from "react";

const Dashboard = () => {
    const { setBreadCrumb } = useBreadCrumbContext();
    const { setTitle } = useNavTitleContext();

    const DashboardLinks: ILinkType[] = useMemo(
        () => [
            {
                label: 'Home',
                value: '/admin/dashboard',
            },
        ],
        []
    );

    useEffect(() => {
        if (setBreadCrumb) {
            setBreadCrumb({
                current: 'Dashboard',
                links: DashboardLinks,
                isBack: true,
                isVisible: true,
            });
        }

        if (setTitle) {
            setTitle((prev) => ({
              ...prev,
              title: "Dashboard",
            }));
        }
    }, [DashboardLinks, setBreadCrumb, setTitle ])

    return (
        <ReactHelmet title="User Activity Log">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2 w-full">
                <DashboardStats />
            </div>
            <div className="rounded-xl font-poppins bg-neutral-white w-full mb-6 mt-8 px-4 py-4 shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)]">
                <Tabs defaultValue="sales" className="w-full">
                    <TabsList className="grid grid-cols-3 w-[400px] rounded-3xl shadow-md mb-8">
                        <TabsTrigger value="sales" className="col-span-1"><span className="text-xs">SALES</span></TabsTrigger>
                        <TabsTrigger value="job-post" className="col-span-1"><span className="text-xs">JOB POSTS</span></TabsTrigger>
                        <TabsTrigger value="job-applications" className="col-span-1"><span className="text-xs">JOB APPLICATIONS</span></TabsTrigger>
                    </TabsList>
                    <DateTimeDisplay/>
                    <TabsContent value="sales">
                        <div className="w-full h-[500px]">
                            <MonthlySalesChart/>
                        </div>
                    </TabsContent>
                    <TabsContent value="job-post">
                        <div className="w-full h-[500px]">
                            <JobPostChart/>
                        </div>
                    </TabsContent>
                    <TabsContent value="job-applications">
                        <div className="w-full h-[500px]">
                            <JobApplicationChart/>
                        </div>
                    </TabsContent>
                </Tabs>
			</div>
			<div className="rounded-xl font-poppins bg-neutral-white w-full mb-6 mt-8 px-4 py-4 shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)]">
                <Tabs defaultValue="job-post" className="w-full">
                    <TabsList className="grid grid-cols-2 w-72 rounded-3xl shadow-md mb-8">
                        <TabsTrigger value="job-post" className="col-span-1"><span className="text-xs">JOB POSTS</span></TabsTrigger>
                        <TabsTrigger value="job-applications" className="col-span-1"><span className="text-xs">JOB APPLICATIONS</span></TabsTrigger>
                    </TabsList>
                    <TabsContent value="job-post">
                        <JobPost/>
                    </TabsContent>
                    <TabsContent value="job-applications">
                        <JobApplicationsTable/>
                    </TabsContent>
                </Tabs>
			</div>
        </ReactHelmet>
    )
}

export default Dashboard;