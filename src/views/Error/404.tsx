import NotFound from '@/assets/images/4041.gif';
import EnuguJobsLogo from '@/assets/images/enugu-jobs-logo-dark.png';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col gap-0 h-screen items-center justify-center">
            <div className="p-4 ">
                <img src={EnuguJobsLogo} width={200}/>
            </div>
            <div className="p-4">
                <img src={NotFound} width={400}/>
            </div>
            <Button className='w-32 bg-blue-700 uppercase' onClick={() => history.back()}>Back</Button>
        </div>
    )
}

export default NotFoundPage;