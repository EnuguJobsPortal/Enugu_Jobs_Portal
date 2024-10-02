import { useGetAllDashboardCounts, useGetJobApplicationsChart, useGetJobPostChart, useGetMonthlySalesStatisticsChart, useSalesStatistics } from "@/hooks/queries/dashboard";
import { IDashboardCardProps } from "@/interfaces/general";
import { IJobApplicationChart, IJobPostChart, IMonthlySalesChart } from "@/interfaces/mock.interface";

const useDashboard = () => {
    const { loadingDashboardCounts, dashboardCounts } = useGetAllDashboardCounts();
    const { loadingJobPostChartData, jobPostChartData } = useGetJobPostChart({ params: { year: new Date().getFullYear().toString()}});
    const { loadingJobApplicationsChartData, jobApplicationsChartData } = useGetJobApplicationsChart({ params: { year: new Date().getFullYear().toString()}});
    const { salesStatistics, loadingSalesStatistics } = useSalesStatistics();
    const { monthlySalesChartData, loadingMonthlySalesChartData } = useGetMonthlySalesStatisticsChart({ params: { year: new Date().getFullYear().toString()}});

    const dashboardCount: IDashboardCardProps[] = [
        {
            label: "Total Users",
            totalCount: dashboardCounts?.data.TotalUserRegistration || 0,
            yesterdayCount: dashboardCounts?.data.UsersYesterday || 0,
            todayCount: dashboardCounts?.data.UserRegistrationToday || 0,
            path: '/admin/users',
            isLoading:loadingDashboardCounts
        },
        {
            label: "No. Of Applications",
            totalCount: dashboardCounts?.data.TotalApplications || 0,
            yesterdayCount: dashboardCounts?.data.ApplicationYesterday || 0,
            todayCount: dashboardCounts?.data.ApplicationToday || 0,
            path: '/admin/jobs/applications',
            isLoading:loadingDashboardCounts
        },
        {
            label: "No. Of Jobs Posted",
            totalCount: dashboardCounts?.data.TotalJobPost || 0,
            yesterdayCount: dashboardCounts?.data.JobPostYesterday || 0,
            todayCount: dashboardCounts?.data.JobPostToday || 0,
            path: '/admin/jobs/applications',
            isLoading:loadingDashboardCounts
        },
        {
            label: "Sales",
            totalCount: salesStatistics?.data.totalSales || 0,
            yesterdayCount: salesStatistics?.data.yesterday_sales || 0,
            todayCount: salesStatistics?.data.today_sales || 0,
            path: '/admin/jobs/job-posts',
            isLoading:loadingSalesStatistics
        }
    ];

    const jobPostChart: IJobPostChart[] = [
        { month: 'Jan', job_posts: jobPostChartData?.data.January || 0 },
        { month: 'Feb', job_posts: jobPostChartData?.data.February || 0 },
        { month: 'Mar', job_posts: jobPostChartData?.data.March || 0 },
        { month: 'Apr', job_posts: jobPostChartData?.data.April || 0 },
        { month: 'May', job_posts: jobPostChartData?.data.May || 0 },
        { month: 'Jun', job_posts: jobPostChartData?.data.June || 0 },
        { month: 'Jul', job_posts: jobPostChartData?.data.July || 0 },
        { month: 'Aug', job_posts: jobPostChartData?.data.August || 0 },
        { month: 'Sep', job_posts: jobPostChartData?.data.September || 0 },
        { month: 'Oct', job_posts: jobPostChartData?.data.October || 0 },
        { month: 'Nov', job_posts: jobPostChartData?.data.November || 0 },
        { month: 'Dec', job_posts: jobPostChartData?.data.December || 0 },
    ];

    const jobApplicationsChart: IJobApplicationChart[] = [
        { month: 'Jan', job_applications: jobApplicationsChartData?.data.January || 0 },
        { month: 'Feb', job_applications: jobApplicationsChartData?.data.February || 0 },
        { month: 'Mar', job_applications: jobApplicationsChartData?.data.March || 0 },
        { month: 'Apr', job_applications: jobApplicationsChartData?.data.April || 0 },
        { month: 'May', job_applications: jobApplicationsChartData?.data.May || 0 },
        { month: 'Jun', job_applications: jobApplicationsChartData?.data.June || 0 },
        { month: 'Jul', job_applications: jobApplicationsChartData?.data.July || 0 },
        { month: 'Aug', job_applications: jobApplicationsChartData?.data.August || 0 },
        { month: 'Sep', job_applications: jobApplicationsChartData?.data.September || 0 },
        { month: 'Oct', job_applications: jobApplicationsChartData?.data.October || 0 },
        { month: 'Nov', job_applications: jobApplicationsChartData?.data.November || 0 },
        { month: 'Dec', job_applications: jobApplicationsChartData?.data.December || 0 },
    ];

    const monthlySalesChart: IMonthlySalesChart[] = [
        { month: 'Jan', sales: monthlySalesChartData?.data.January || 0 },
        { month: 'Feb', sales: monthlySalesChartData?.data.February || 0 },
        { month: 'Mar', sales: monthlySalesChartData?.data.March || 0 },
        { month: 'Apr', sales: monthlySalesChartData?.data.April || 0 },
        { month: 'May', sales: monthlySalesChartData?.data.May || 0 },
        { month: 'Jun', sales: monthlySalesChartData?.data.June || 0 },
        { month: 'Jul', sales: monthlySalesChartData?.data.July || 0 },
        { month: 'Aug', sales: monthlySalesChartData?.data.August || 0 },
        { month: 'Sep', sales: monthlySalesChartData?.data.September || 0 },
        { month: 'Oct', sales: monthlySalesChartData?.data.October || 0 },
        { month: 'Nov', sales: monthlySalesChartData?.data.November || 0 },
        { month: 'Dec', sales: monthlySalesChartData?.data.December || 0 },
    ];

    return {
        dashboardCount,
        jobPostChart,
        jobApplicationsChart,
        monthlySalesChart,
        salesStatistics,
        loadingDashboardCounts,
        loadingJobPostChartData,
        loadingJobApplicationsChartData,
        loadingSalesStatistics,
        loadingMonthlySalesChartData
    };
}

export default useDashboard;