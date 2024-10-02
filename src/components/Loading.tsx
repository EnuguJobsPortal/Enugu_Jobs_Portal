import { ILoadingProps } from '@/interfaces/general';
import { Loader2 } from 'lucide-react';

const Loading = ({ color, size }: ILoadingProps) => (
    <Loader2 color={color ? `${color}` : '#0f172a'} size={size}  className='animate-spin' />
);

export default Loading;