import { Skeleton } from '@/components/ui/skeleton';
import useDashboard from '@/hooks/useDashboard';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const JobPostChart = () => {
    const { jobPostChart, loadingJobPostChartData } = useDashboard();

    const formatYAxis = (value: number) => {
        return value >= 1000 ? `${value / 1000}K` : value.toString();
    };
    
    return (
        loadingJobPostChartData ? (
            <Skeleton className='w-[100%] h-[100%] bg-slate-200'/>
        ) : (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={jobPostChart}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid vertical={false}/>
                    <XAxis dataKey="month" fontSize={12}/>
                    <YAxis axisLine={false} tickLine={false} tickFormatter={formatYAxis} fontSize={12}/>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="job_posts" name='Job Posts' stroke="#3980ce" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        )
    )
}

export default JobPostChart