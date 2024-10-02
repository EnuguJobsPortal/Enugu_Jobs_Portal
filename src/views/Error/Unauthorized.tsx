import Error from '@/assets/images/error.png';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/admin/dashboard')
	}

    return (
        <div className="flex flex-col gap-4 h-screen items-center justify-center">
            <div className="mb-6">
                <img src={Error} width={200}/>
            </div>
            <div className="mb-6">
                <span className="text-3xl font-semibold text-center flex items-center justify-center tracking-wider leading-snug">
					Sorry!!! You do not have rights enough to access this resource.<br/> Please click the button below to go back to your dashboard or contact your administrator
				</span>
            </div>
            <Button className='w-40 bg-blue-700 uppercase rounded-xl  px-6 py-4 ' onClick={handleClick}>Back To Dashboard</Button>
        </div>
    )
}

export default Unauthorized;