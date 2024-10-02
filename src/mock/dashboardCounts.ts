import { IDashboardCardProps } from "@/interfaces/general";

export const dashboardCounts: IDashboardCardProps[] = [
    {
        label: "Total Users",
        totalCount: 3023,
        yesterdayCount: 2900,
        todayCount: 123,
        path: '/admin/users'
    },
    {
        label: "Active Users",
        totalCount: 1243,
        yesterdayCount: 1843,
        todayCount: 123,
        path: '/admin/users'
    },
    {
        label: "No. Of Applications",
        totalCount: 2054,
        yesterdayCount: 1932,
        todayCount: 343,
        path: '/admin/jobs/applications'
    },
    {
        label: "No. Of Jobs Posted",
        totalCount: 200,
        yesterdayCount: 183,
        todayCount: 343,
        path: '/admin/jobs/applications'
    }
]