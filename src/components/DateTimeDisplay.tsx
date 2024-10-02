import { Dot } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const DateTimeDisplay: React.FC = () => {
	const [formattedDateTime, setFormattedDateTime] = useState<{
		date: string;
		time: string;
	}>({
		date: '',
		time: ''
	});

	useEffect(() => {
		const formatDateTime = () => {
			const now = moment();
			const formattedDate = now.format('MMM DD, YYYY');
			const formattedTime = now.format('hh:mm A');
			setFormattedDateTime({ date: formattedDate, time: formattedTime });
		};

		formatDateTime();

		// Update every minute
		const interval = setInterval(formatDateTime, 60000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className='flex justify-center items-center gap-4 mb-10 text-[11px] tracking-wide text-slate-500 uppercase font-semibold'>
			<span>{ formattedDateTime.date }</span>
			<Dot color='#029aec' className='w-6 h-6' />
			<span>{ formattedDateTime.time }</span>
			<Dot color='#029aec' className='w-6 h-6' />
			<span>Monthly</span>
			<Dot color='#029aec' className='w-6 h-6' />
			<span>{ moment().format('YYYY')}</span>
		</div>
	);
};

export default DateTimeDisplay;
