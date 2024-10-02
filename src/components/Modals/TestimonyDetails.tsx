import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ITestimonyDetailsProps } from "@/interfaces/general";

const TestimonyDetails = ({ 
    testimony, 
    open, 
    setOpen
}: ITestimonyDetailsProps) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{testimony?.Testifier}</DialogTitle>
                </DialogHeader>
                <div className="flex items-center w-full">
                    { testimony?.Writeup}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TestimonyDetails;