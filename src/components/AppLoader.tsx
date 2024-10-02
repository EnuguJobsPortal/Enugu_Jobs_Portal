import Loading from "@/components/Loading";
import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog";

const AppLoader = ( { open } : { open: boolean }) => {

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]">
                    <div className="flex justify-center items-center">
                        <Loading size={32} />
                    </div>
                    <div className="flex justify-center items-center text-xs text-slate-600">
                        Please Wait...
                    </div>
            </DialogContent>
        </Dialog>
    )
}

export default AppLoader;