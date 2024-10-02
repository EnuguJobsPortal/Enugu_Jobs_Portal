import Loading from "@/components/Loading";
import TableCellActionMenu from "@/components/TableCellActionMenu";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import { useGetAllSeekerPackages2, useRemoveSeekerPackage2, useRemoveSeekerPackageDescription } from "@/hooks/queries/packages";
import { ITableCellMenuItem } from "@/interfaces/general";
import { ISeekerPackageDescriptionResponse, ISeekerPackageResponse2 } from "@/interfaces/response.interface";
import { formatCurrency } from "@/lib/currencyFormatter";
import { useEffect, useState } from "react";
import NewSeekerPackageDescription from "../NewSeekerPackageDescription";
import UpdateSeekerPackage2 from "../UpdateSeekerPackage2";
import UpdateSeekerPackageDescription from "../UpdateSeekerPackageDescription";

const SeekerPackageDetails = () => {
    const { showConfirm, showError, showSuccess } = useSweetAlert();
    const { showLoading, hideLoading } = useLoading();
    const [ selectedSeekerPackage, setSelectedSeekerPackage ] = useState<ISeekerPackageResponse2>();
    const [ selectedDescriptionData, setSelectedDescriptionData ] = useState<ISeekerPackageDescriptionResponse>();
    const [ showDescriptionUpdateModal, setShowDescriptionUpdateModal ] = useState<boolean>(false);
    const [ showSeekerPackageUpdateModal, setShowSeekerPackageUpdateModal ] = useState<boolean>(false);
    const [ showSeekerPackageDescriptionModal, setShowSeekerPackageDescriptionModal ] = useState<boolean>(false);
    const { loadingSeekerPackages, seekerPackages } = useGetAllSeekerPackages2({ params: {}});
    const { removeSeekerPackage, removingSeekerPackage } = useRemoveSeekerPackage2({ 
        onSuccess: (data) => {
            hideLoading();
            showSuccess("Success!!!", data.message);
        }, 
        onError: (message) => {
            hideLoading();
            showError("Attention!!!", message);
        }
    });
    const { removeSeekerPackageDescription, removingSeekerPackageDescription } = useRemoveSeekerPackageDescription({ 
        onSuccess: (data) => {
            hideLoading();
            showSuccess("Success!!!", data.message);
        }, 
        onError: (message) => {
            hideLoading();
            showError("Attention!!!", message);
        }
    })
    const handleDeleteDescription = async (packageDescriptionId:string) => {
        const result = await showConfirm("Confirm!!!", "Are you sure you want to delete this package description?");

        if(result.isConfirmed)
        {
            removeSeekerPackageDescription({ packageDescriptionId });
        }
    };
    const handleDeleteSeekerPackage = async (packageId:string) => {
        const result = await showConfirm("Confirm!!!", "Are you sure you want to delete this package?");

        if(result.isConfirmed)
        {
            removeSeekerPackage({ packageId });
        }
    };

    useEffect(() => {
        if(removingSeekerPackage || removingSeekerPackageDescription)
        {
            showLoading();
        }
    }, [ removingSeekerPackage, removingSeekerPackageDescription, showLoading ])
    
    return (
        <>
            <Card className="shadow-[0px_1px_5px_-2px_rgba(0,_0,_0,_0.6)] h-auto mb-10">
                <CardHeader className="flex flex-col lg:flex-row flex-wrap items-center justify-between gap-8 pt-0 pb-2 w-full border border-b p-4 mb-4">
                    <span className="text-[10px] tracking-widest font-bold uppercase">Seeker Package Details</span>
                </CardHeader>
                <CardContent className="">
                    { loadingSeekerPackages ? (
                        <div className='flex justify-center items-center my-auto mx-auto'>
                            <Loading size={60}/>
                        </div>
                    ) : seekerPackages ? (
                        <Accordion 
                            type="single" 
                            collapsible
                        >
                            { seekerPackages.data.map((seekerPackage, i) => {

                                const menuItems: ITableCellMenuItem[] = [
                                    { 
                                        label: 'Update', 
                                        icon: 'Pencil', 
                                        iconColor: '#6b7280', 
                                        handleClick: () => { 
                                            setSelectedSeekerPackage(seekerPackage)
                                            setShowSeekerPackageUpdateModal(true);
                                        }
                                    },
                                    { 
                                        label: 'Delete', 
                                        icon: 'Trash2', 
                                        iconColor: '#6b7280', 
                                        handleClick: () => { 
                                            handleDeleteSeekerPackage(seekerPackage.PackageId) 
                                        }
                                    },
                                    { 
                                        label: 'New Description', 
                                        icon: 'Plus', 
                                        iconColor: '#6b7280', 
                                        handleClick: () => { 
                                            setSelectedSeekerPackage(seekerPackage)
                                            setShowSeekerPackageDescriptionModal(true);
                                        }
                                    },
                                ];

                                return (
                                    <AccordionItem 
                                        key={i}
                                        value={seekerPackage.PackageId}
                                    >
                                        <AccordionTrigger className="">
                                            <div className="flex flex-col gap-1">
                                                <span className="uppercase text-base font-bold text-left">{ seekerPackage.PackageName }</span>
                                                <div className="flex gap-3 items-center">
                                                    <span className="flex justify-center items-center gap-3 p-2 text-xs text-[#808080] rounded-full bg-[#F0F0F0]">
                                                        { formatCurrency(seekerPackage.PackagePrice) }
                                                    </span>
                                                    <span className="flex justify-center items-center gap-3 p-2 text-xs text-[#808080] rounded-full bg-[#F0F0F0]">
                                                        { seekerPackage.PackageDays } { parseInt(seekerPackage.PackageDays) !== 1 ? "Days" : "Day"}
                                                    </span>
                                                    <span className="flex justify-center items-center gap-3 p-2 text-xs text-[#808080] rounded-full bg-[#F0F0F0]">
                                                        { seekerPackage.PackageAvailability }
                                                    </span>
                                                    <TableCellActionMenu menuItems={menuItems}/>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        { seekerPackage.SeekerPackageDescriptions.map((description, i) => {

                                            const menuItems: ITableCellMenuItem[] = [
                                                { 
                                                    label: 'Update', 
                                                    icon: 'Pencil', 
                                                    iconColor: '#6b7280', 
                                                    handleClick: () => { 
                                                        setSelectedDescriptionData(description)
                                                        setShowDescriptionUpdateModal(true);
                                                    }
                                                },
                                                { 
                                                    label: 'Delete', 
                                                    icon: 'Trash2', 
                                                    iconColor: '#6b7280', 
                                                    handleClick: () => { 
                                                        handleDeleteDescription(description.PackageDescriptionId) 
                                                    }
                                                },
                                            ];

                                            return (
                                                <AccordionContent 
                                                    key={i}
                                                    className="flex justify-between items-center gap-10"
                                                >
                                                    <span className="font-normal text-sm leading-[21px] tracking-[1.25%] text-[#808080]">{description.Description}</span>
                                                    <TableCellActionMenu menuItems={menuItems}/>
                                                </AccordionContent>
                                            )
                                        })}
                                    </AccordionItem>
                                );
                            })}
                        </Accordion>
                    ) : null}
                </CardContent>
            </Card>
            <UpdateSeekerPackage2
                pkgData={selectedSeekerPackage}
                setPkgData={setSelectedSeekerPackage}
                open={showSeekerPackageUpdateModal}
                setOpen={setShowSeekerPackageUpdateModal}
            />
            <NewSeekerPackageDescription
                pkgData={selectedSeekerPackage}
                setPkgData={setSelectedSeekerPackage}
                open={showSeekerPackageDescriptionModal}
                setOpen={setShowSeekerPackageDescriptionModal}
            />
            <UpdateSeekerPackageDescription
                descriptionData={selectedDescriptionData}
                setDescriptionData={setSelectedDescriptionData}
                open={showDescriptionUpdateModal}
                setOpen={setShowDescriptionUpdateModal}
            />
        </>
    );
};

export default SeekerPackageDetails;