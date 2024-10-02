import { Skeleton } from '@/components/ui/skeleton';
import { IDashboardCardProps } from '@/interfaces/general';
import classNames from 'classnames';
import { ArrowRight, ChevronRight, Dot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({
	totalCount,
	todayCount,
	yesterdayCount,
	label,
	path,
    isLoading
}: IDashboardCardProps) => {

	const navigate = useNavigate();
    const percentageChange: number = todayCount === 0 && yesterdayCount === 0 ? 0 : todayCount !== 0 && yesterdayCount === 0 ? 100 : (((todayCount - yesterdayCount) / yesterdayCount) * 100);

	return (
		<div onClick={() => { navigate(path) }} className='h-[160px] sm:col-span-1'>
			<div 
                className={classNames(percentageChange < 0 ? "hover:border-red-100" : "hover:border-green-100", "rounded-xl hover:shadow-lg transition duration-300 ease-in-out font-poppins h-full bg-white grow cursor-pointer border border-gray-300 w-full flex flex-col pl-4 pb-4 gap-4 group shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] overflow-hidden")}
            >
				<div className='flex flex-row justify-between items-center'>
                    { isLoading ? (
                        <>
                            <div className='flex justify-between items-center gap-2 mt-1'>
                                <Skeleton className='h-5 w-20 bg-slate-400' />
                                <Skeleton className='h-4 w-4 bg-slate-400'/>
                            </div>
                            <Skeleton className="w-16 h-8 bg-slate-400" />
                        </>
                    ) : (
                        <>
                            <div className='flex justify-between items-center gap-2 mt-1'>
                                <div className='font-semibold text-sm'>{label}</div>
                                <ArrowRight className='h-4 w-4'/>
                            </div>
                            <div className={classNames(percentageChange < 0 ? "bg-[#FB236A] bg-opacity-10 bg-gradient-to-bl from-[#FB236A] via-pink-100 to-white" : "bg-[#32FF2E] bg-opacity-10 bg-gradient-to-bl from-[#32FF2E] via-green-100 to-white", "w-16 h-8  flex items-center justify-center p-5 rounded-tr-lg rounded-tl-none")}>
                                <span className={classNames(percentageChange < 0 ? "text-pink-700" : "text-green-700", "text-xs font-[400]")}>
                                    {percentageChange >= 0 ? '+' : ''}{ percentageChange.toFixed(2) }%
                                </span>
                            </div>
                        </>
                    )}
				</div>
                { isLoading ? (
                    <Skeleton className='w-10 h-9 bg-slate-400' />
                ) : (
                    <div className='flex justify-start'>
                        <span className='text-4xl font-[400]'>{totalCount.toLocaleString()}</span>
                    </div>
                )}
				<div className="flex items-center justify-between font-poppins text-[0.70rem] mt-2">
					<div className='text-gray-500 font-normal flex items-center'>
                        { isLoading ? (
                            <>
                                <Skeleton className='w-16 h-3 bg-slate-400 mr-3' />
                                <Skeleton className='w-3 h-3 bg-slate-400 mr-3' />
                                <Skeleton className='w-3 h-3 bg-slate-400' />
                            </>
                        ) : (
                            <>
                                <span>{yesterdayCount.toLocaleString()} Yesterday</span>
                                <Dot className='w-3 h-3'/>
                                <span>{todayCount.toLocaleString()} Today</span>
                            </>
                        )}
                    </div>
                    <div onClick={() => navigate(path)} className='flex justify-between gap-2 mr-4 group-hover:opacity-100 opacity-0 transition-opacity'>
                        { isLoading ? (
                            <>
                                <Skeleton className='w-4 h-4 bg-slate-400' />
                                <Skeleton className='w-4 h-4 bg-slate-400' />
                            </>
                        ) : (
                            <>
                                <span className='uppercase text-[#1E83F0] font-normal'>More</span>
                                <ChevronRight className='w-4 h-4 outline-[#1E83F0]'/>
                            </>
                        )}
                    </div>
				</div>
			</div>
		</div>
	);
};
  
export default DashboardCard;


