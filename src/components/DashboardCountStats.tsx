import DashboardCard from "@/components/DashboardCard";
import useDashboard from "@/hooks/useDashboard";

const DashboardCountStats = () => {
    const { dashboardCount } = useDashboard();

    return (
        dashboardCount.map((count, i) => (
            <DashboardCard
                key={i}
                label={count.label}
                totalCount={count.totalCount}
                todayCount={count.todayCount}
                yesterdayCount={count.yesterdayCount}
                path={count.path}
                isLoading={count.isLoading}
            />
        ))
    );
}

export default DashboardCountStats;